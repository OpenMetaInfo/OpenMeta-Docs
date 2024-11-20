# Multi-Tenancy
OpenMeta supports multi-tenancy at the ORM level.

Once multi-tenancy is enabled, data is automatically isolated by tenant, eliminating the need for developers to write code for handling this.

## Enabling Multi-Tenancy
Enable multi-tenancy by setting `enable.multiTenant` in the configuration file. For example:
```yaml
enable:
  multiTenant: true
```

## Multi-Tenancy in Models
After enabling multi-tenancy, tenant-based data isolation can be configured at the model level. The conditions for enabling multi-tenancy isolation for a model are as follows:

* Set `multiTenant = true` in the model metadata. The `multiTenant` property controls which data models are subject to multi-tenancy isolation. Models with `multiTenant = false` can be shared across tenants.

* Add a `tenantId` field to the model. This field is globally treated as read-only and is automatically populated with the `tenantId` of the current user’s tenant upon creation. Modification of this field is not allowed.

## Tenant-Based Data Isolation Strategies
When multi-tenancy is enabled, the ORM enforces strict isolation and validation, while the context (referred to as `user.tenantId` below) maintains the `tenantId` of the current user.

#### Simple Queries
The ORM layer enforces tenant isolation by automatically appending a tenant filter condition in the `WHERE` clause:
```sql
tenant_id = user.tenantId
```

#### JOIN Queries
Both the primary and related tables automatically include tenant filter conditions:
```sql
t0.tenant_id = user.tenantId  AND t1.tenant_id = user.tenantId
```

#### Data Creation
When creating data, the ORM layer automatically populates the `tenantId` field:
```java
tenantId = user.tenantId
```

If the client attempts to specify a `tenantId` value that differs from the current user’s `tenantId`, the program will throw an exception. Such attempts should be monitored as potential overreach incidents.

#### Data Updates
Since the `tenantId` field in the data model is read-only, any attempts to modify the `tenantId` are automatically ignored by the ORM layer.

#### Data Deletion
Before deletion, the ORM layer checks the scope of the data to ensure that only data belonging to the current user's tenant can be deleted.