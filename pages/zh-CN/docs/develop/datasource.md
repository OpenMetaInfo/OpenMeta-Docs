# 多数据源支持

## 应用场景
* 读写分离：降低单个数据库的负载，提高系统的可用性。单租户模式、共享Schema的多租户模式皆可使用。
* 同一个项目内，操作多个数据库：不同数据源可以连接不同数据库。一般用于对负载要求不高的场景。在分布式系统中，该操作会增加系统间耦合性，不建议使用。
* 共享应用、独立数据库的多租户模式：每个租户使用独立的数据库，在用户登录信息中，指定数据源。

注意：为降低应用复杂度，鼓励根据负载情况选择合适的架构，以上场景，只能启用其中之一，不能同时启用。

## 多数据源配置
启用多数据源的配置开关：`spring.datasource.dynamic.enable = true`。

否则，无论是否配置了多个数据源，仍然以原先的 `spring.datasource.*` 作为单数据源配置。

多数据源配置列表的第一个数据源，将作为默认数据源。未通过 `@DataSource` 注解指定数据源时，都访问默认数据源。可以在 `application.yml` 文件中自定义数据源的 key，该 key 也即数据源的名称。
```yml
spring:
  datasource:
    dynamic:
      enable: true
      datasource:
        default:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/demo
          username: user0
          password: pass0
        db1:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/db1
          username: user1
          password: pass1
        db2:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/db2
          username: user2
          password: pass2
```

### 在 Java 代码中指定数据源
通过 `@DataSource("db1")` 注解指定数据源的名称，也即配置文件中对应的 key。
```java
@DataSource("db1")
public void method1() {
    // ...
}
```
通过 `@DataSource()` 注解的数据源传播机制:
* 方法没有 `@DataSource()` 注解时，获取类上的该注解。
* 如果链路中已经指定了数据源，且与当前数据源相同，则不切换。
* 如果链路中已经指定了数据源，且与当前数据源不相同，抛出异常，也即不允许跨数据源操作。
* 如果链路中没有指定数据源，则使用当前指定的数据源。
* 当首次指定访问某数据源时，方法执行结束后，会删除该设定。

## 读写分离
通过设置 `spring.datasource.dynamic.read-write-separation=true`，即启用读写分离。

以多数据源配置中，第一个数据源作为主库，其它数据源作为只读库。路由规则：
* 事务操作：访问主库。
* 非事务的写操作：访问主库。
* 非事务的读操作：默认访问从库，指定 DataSource 时，访问指定数据源。
```yml
spring:
  datasource:
    dynamic:
      enable: true
      read-write-separation: true
      datasource:
        primary:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/demo
          username: user0
          password: pass0
        read1:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/db1
          username: user1
          password: pass1
        read2:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/db2
          username: user2
          password: pass2
```

### 处理写后读的一致性问题
在读写分离的场景下，且非事务上下文中，会发生写后读的问题。也即写数据到主库，立即非事务性读取数据时，会路由到从库进行读取，但由于数据同步存在延迟，导致读到从库中的脏数据。

解决方案是在该读方法上，添加 `@DataSource` 注解，指定访问主库。
```java
// When 'primary' is the write datasource.
@DataSource("primary")
public void readMethod1() {
    // ...
}
```

## 共享应用、独立数据库的多租户模式
当用户登录时，在 ContextInterceptor 拦截器的实现类中，同时指定 tenantId 和 datasourceKey 即可。
```yml
system:
  multi-tenancy:
    enable: true
    isolated-database: true
spring:
  datasource:
    dynamic:
      enable: true
      datasource:
        tenant1:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/demo
          username: user0
          password: pass0
        tenant2:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/db1
          username: user1
          password: pass1
        tenant3:
          driver-class-name: com.mysql.cj.jdbc.Driver
          url: jdbc:mysql://localhost:3306/db2
          username: user2
          password: pass2
```
多租户的其它介绍内容，请参考 [多租户](./tenant)