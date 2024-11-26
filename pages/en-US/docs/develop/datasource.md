# Multi-DataSource Support

## Application Scenarios
* **Read-Write Separation**: Reduces the load on a single database and improves system availability. This can be applied in both single-tenant and shared-schema multi-tenant modes.
* **Operating Multiple Databases in the Same Project**: Different datasources can link to different databases. Typically applied in scenarios with low load requirements. In distributed systems, this approach increases system coupling and is generally not recommended.
* **Shared Application with Independent Databases for Multi-Tenant Mode**: Each tenant uses an independent database, and the datasource is specified in the user's login information.

**Note**: To reduce application complexity, it is recommended to choose an appropriate architecture based on load requirements. Only one of the above scenarios can be enabled at a time.

## Multi-DataSource Configuration
Enable the multi-datasource configuration switch: `spring.datasource.dynamic.enable = true`.

If not enabled, regardless of multiple datasource configurations, the system will still use the original `spring.datasource.*` as a single datasource configuration.

The first datasource in the configuration list will act as the default datasource. If no datasource is specified via the `@DataSource` annotation, the default datasource will be used. You can customize the keys for datasources in the `application.yml` file, where the keys represent the names of the datasources.
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

### Specifying a DataSource in Java Code
Use the `@DataSource("db1")` annotation to specify the name of the datasource, corresponding to the key in the configuration file.
```java
@DataSource("db1")
public void method1() {
    // ...
}
```

Datasource propagation mechanism with the `@DataSource()` annotation:
* If a method lacks the `@DataSource()` annotation, the class-level annotation is applied.
* If a datasource is already specified in the chain and matches the current datasource, no switching occurs.
* If a datasource is already specified in the chain and differs from the current datasource, an exception is thrown, as cross-data-source operations are not allowed.
* If no datasource is specified in the chain, the current specified datasource is used.
* When accessing a datasource for the first time, the specification is cleared after the method execution completes.

## Read-Write Separation
Enable read-write separation by setting `spring.datasource.dynamic.read-write-separation=true`.

In a multi-datasource configuration, the first datasource is treated as the primary (write) database, and others as read-only databases. The routing rules are as follows:
* **Transactional Operations**: Access the primary database.
* **Non-transactional Write Operations**: Access the primary database.
* **Non-transactional Read Operations**: Access a read-only database by default. If a datasource is specified, access the specified datasource.
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

### Handling Write-Read Consistency Issues
In scenarios with read-write separation and non-transactional contexts, issues may arise when reading after writing. Specifically, data written to the primary database may not yet be synchronized with the read-only database, resulting in stale data being read.

The solution is to add the `@DataSource` annotation to the read method, specifying access to the primary database.
```java
// When 'primary' is the write datasource.
@DataSource("primary")
public void readMethod1() {
    // ...
}
```

## Shared Application with Independent Databases for Multi-Tenant Mode
When a user logs in, both `tenantId` and `datasourceKey` can be specified in the implementation class of the `ContextInterceptor` interceptor.
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

For more information on multi-tenancy, refer to [Multi-Tenancy](./tenant).