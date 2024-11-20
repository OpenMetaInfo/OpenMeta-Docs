# 多数据源支持

## 应用场景
* 读写分离
* 同一个项目内，操作多个数据库

### 多数据源配置
启用多数据源的配置开关：`spring.datasource.dynamic.enable = true`。

否则，无论是否配置了多个数据源，仍然以原先的 `spring.datasource.*` 作为单数据源配置。

多数据源配置列表的第一个数据源，将作为默认数据源。未通过 `@DataSource` 注解指定数据源时，都访问默认数据源。可以在 `application.yml` 文件中自定义数据源的 key，该 key 也即数据源的名称。
```yml
spring:
  datasource:
    dynamic:
      enable: true
      datasource:
        primary:
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

### 处理写后读的一致性问题
在读写分离的场景下，且非事务上下文中，会发生写后读的问题。也即写到主库，立即到从库读取数据时，因为数据同步延迟，导致读到脏数据。

解决方案是在读方法上，添加 `@DataSource` 注解，指定访问主库。
```java
// When 'primary' is the write datasource.
@DataSource("primary")
public void readMethod1() {
    // ...
}
```