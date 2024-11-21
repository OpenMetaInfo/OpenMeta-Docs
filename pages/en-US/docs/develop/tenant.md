# Multi-Tenancy

OpenMeta natively supports multi-tenancy with shared table structures. When multi-tenancy is enabled, data is automatically isolated based on tenants.
![Multi tenancy](/image/multi-tenancy-en.png)

## Enabling Multi-Tenancy
### Shared Application and Shared Database Mode
Enable multi-tenancy in the configuration file by setting `system.multi-tenancy.enable`. For example:
```yaml
system:
  multi-tenancy:
    enable: true
```

### Shared Application and Independent Database Mode
Since OpenMeta supports [dynamic multi-datasource](./datasource) and the `UserInfo` object contains two fields: `tenantId` and `datasourceKey`, these can be configured for tenant isolation.

During user login, assign values to these two fields in the `ContextInterceptor` implementation class.

Enable multi-tenancy and database isolation in the configuration file:
```yaml
system:
  multi-tenancy:
    enable: true
    isolated-database: true
```

## Multi-Tenant Data Model
When multi-tenancy is enabled, you can configure tenant data isolation at the model level.
Conditions for enabling tenant isolation on a model:
* Set `multiTenant = true` in the model metadata. The `multiTenant` attribute controls which data models are isolated by tenants. Models with `multiTenant = false` can be shared across tenants.
* Add a `tenantId` field to the model. This field is globally read-only and is automatically populated with the current user's tenant ID during creation. Modifications to this field are not allowed.

## Tenant Data Isolation Mechanism
When multi-tenancy is enabled, the ORM enforces isolation and validation, recording the current user's `tenantId` in the context (denoted as `user.tenantId` below).

### Simple Queries
The ORM layer automatically appends tenant filtering conditions to the `WHERE` clause:
```sql
tenant_id = user.tenantId
```

### JOIN Queries
Both the primary and related tables are automatically appended with tenant filtering conditions, requiring no developer intervention:
```sql
t0.tenant_id = user.tenantId  AND t1.tenant_id = user.tenantId
```

### Data Creation
During data creation, the ORM layer automatically populates the `tenantId` field:
```java
tenantId = user.tenantId
```
If the client-supplied data specifies a `tenantId` that does not match the current user's `tenantId`, the program throws an exception to prevent unauthorized access attempts.

### Data Updates
Since the `tenantId` in the data model is read-only, the ORM layer automatically ignores any attempted modifications to it.

### Data Deletion
Before deletion, the ORM layer validates the data scope, allowing only the deletion of data belonging to the current user's tenant.

## Cross-Tenant Data Access Mechanism
In scenarios requiring cross-tenant data access, such as operations platforms or data analytics systems, a separate system should be deployed. This system must disable multi-tenancy in its configuration (`system.multi-tenancy.enable = false`).

Even if the data model includes a `tenantId` field, it will not be subject to the ORM’s multi-tenancy restrictions. In this case, the `tenantId` field can serve as a condition for cross-tenant authorization in data access.