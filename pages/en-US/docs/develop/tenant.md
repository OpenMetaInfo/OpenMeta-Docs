# Multi-Tenancy Support

## Introduction to Multi-Tenancy

OpenMeta natively supports multi-tenancy with shared table structures. Once multi-tenancy is enabled, data is automatically isolated based on tenants.
![Multi tenancy](/image/multi-tenancy.png)

## Enabling Multi-Tenancy

### Shared Application and Shared Database Mode
Enable multi-tenancy in the configuration file by setting `system.multi-tenancy.enable`. Example:
```yaml
system:
  multi-tenancy:
    enable: true
```

### Shared Application and Independent Database Mode
Since OpenMeta supports [Dynamic Multi-Data Sources](./datasource), the `UserInfo` object includes `tenantId` and `datasourceKey` fields.

When a user logs in, these two fields can be assigned values in the implementation class of the `ContextInterceptor` interceptor.

Enable multi-tenancy and database isolation in the configuration file:
```yaml
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

## Multi-Tenant Data Model
When multi-tenancy is enabled, you can configure data isolation at the model level.
Conditions for enabling tenant data isolation in a model:
* The model metadata must set `multiTenant = true`. The `multiTenant` attribute determines which data models are isolated by tenants. Models with `multiTenant = false` can be shared across tenants.
* Add a `tenantId` field to the model. This field is globally read-only. During data creation, it is populated with the current user's tenant and cannot be modified.

## Tenant Data Isolation Mechanism
Once multi-tenancy is enabled, the ORM layer enforces isolation and validation. The current user's tenant ID (denoted as `user.tenantId`) is recorded in the context.

### Simple Queries
The ORM layer automatically appends tenant filtering conditions to the `WHERE` clause:
```sql
tenant_id = user.tenantId
```

### JOIN Queries
Both the main table and associated tables are automatically appended with tenant filtering conditions. No additional developer intervention is required:
```sql
t0.tenant_id = user.tenantId AND t1.tenant_id = user.tenantId
```

### Data Creation
When creating data, the ORM layer automatically populates the `tenantId` field:
```java
tenantId = user.tenantId
```
If the client-provided data specifies a `tenantId` that differs from the current user's `tenantId`, an exception is thrown, highlighting a potential unauthorized access attempt.

### Data Updates
As the `tenantId` of the data model is a read-only field, the ORM layer ignores any attempts to modify it.

### Data Deletion
Before deletion, the ORM layer verifies the data's scope, ensuring only data belonging to the current user's tenant can be deleted.

## Cross-Tenant Data Access
For scenarios requiring cross-tenant data access, such as operational platforms or data analytics systems, a separate system should be deployed. This system’s configuration must not enable multi-tenancy (`system.multi-tenancy.enable = false`).

Even if the data model includes a `tenantId` field, it will not be subject to ORM-level multi-tenancy restrictions. In such cases, the `tenantId` field can be used as a filter condition for cross-tenant data authorization.