# Multi-Datasource Support

## Use Cases
* **Read-Write Separation:** Reduces the load on a single database and improves system availability. Applicable to both single-tenant and multi-tenant modes.
* **Operating Multiple Databases in a Single Project:** Useful when load requirements are not high. However, it cannot be used simultaneously with read-write separation. In distributed systems, this approach increases inter-system coupling and is generally discouraged.
* **Multi-Tenant Mode with Shared Applications and Independent Databases:** Each tenant uses a separate database, and the datasource is specified in the user's login information.

### Multi-Datasource Configuration
Enable the multi-datasource configuration switch with: `spring.datasource.dynamic.enable = true`.

If this is not enabled, even if multiple datasources are configured, the system will fall back to the original single-datasource configuration defined under `spring.datasource.*`.

The first datasource in the configuration list serves as the default datasource. If a datasource is not explicitly specified using the `@DataSource` annotation, the default datasource is used. Datasource keys, which correspond to datasource names, can be customized in the `application.yml` file:

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

### Specifying a Datasource in Java Code
Use the `@DataSource("db1")` annotation to specify the name of the datasource, which corresponds to a key in the configuration file:

```java
@DataSource("db1")
public void method1() {
    // ...
}
```

#### Datasource Propagation Rules for `@DataSource`:
* If a method lacks a `@DataSource` annotation, the class-level annotation is applied.
* If a datasource is already specified in the execution chain and matches the current datasource, no switching occurs.
* If a datasource is already specified in the execution chain but differs from the current datasource, an exception is thrown—cross-datasource operations are not allowed.
* If no datasource is specified in the execution chain, the current datasource is applied.
* When a datasource is accessed for the first time, the setting is removed after the method execution ends.

### Handling Consistency Issues in Read-After-Write
In read-write separation scenarios outside transactional contexts, issues may arise where data is written to the primary database but read from the replica due to synchronization delays, leading to stale data.

**Solution:** Add a `@DataSource` annotation to the read method and specify the primary database:
```java
// When 'primary' is the write datasource.
@DataSource("primary")
public void readMethod1() {
    // ...
}
```

### Multi-Tenant Mode with Shared Applications and Independent Databases
During user login, specify both `tenantId` and `datasourceKey` in the `ContextInterceptor` implementation class.

For detailed configuration, refer to [Multi-Tenancy](./tenant).