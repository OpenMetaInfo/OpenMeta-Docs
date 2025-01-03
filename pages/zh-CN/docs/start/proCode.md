# 构建专业代码应用

## EntityService 通用方法

### 创建一条数据，返回 ID
```java
/**
 * 创建一个数据对象并返回ID。
 *
 * @param object 要创建的数据对象
 * @return ID
 */
K createOne(T object);
```
### 创建一条数据，返回最新数据
```java
/**
 * 创建一个数据对象，返回带有ID和其他最新字段值的对象。
 *
 * @param object 要创建的数据对象
 * @return 带有ID和其他最新字段值的对象
 */
T createOneAndReturn(T object);
```
### 批量创建数据，返回 ID 列表
```java
/**
 * 创建多个数据对象并返回ID列表。
 *
 * @param objects 要创建的数据对象列表
 * @return ID列表
 */
List<K> createList(List<T> objects);
```
### 批量创建数据，返回最新数据列表
```java
/**
 * 创建多个数据对象，返回带有ID和其他最新字段值的对象列表。
 *
 * @param objects 要创建的数据对象列表
 * @return 带有ID和其他最新字段值的对象列表
 */
List<T> createListAndReturn(List<T> objects);
```
### 根据 ID 读取一条对象数据
```java
/**
 * 根据ID读取一个数据对象。
 * ManyToOne/OneToOne/Option/MultiOption字段为原始值。
 *
 * @param id 数据ID
 * @return 数据对象
 */
T readOne(K id);
```
### 根据 ID 读取对象指定字段数据
```java
/**
 * 根据ID读取一个数据对象。
 * 如果未指定字段，则默认读取所有可访问字段。
 * ManyToOne/OneToOne/Option/MultiOption字段为原始值。
 *
 * @param id 数据ID
 * @param fields 要读取的字段列表
 * @return 数据对象
 */
T readOne(K id, Collection<String> fields);
```
### 根据 ID 列表读取对象列表
```java
/**
 * 根据ID列表读取多个数据对象。
 * ManyToOne/OneToOne/Option/MultiOption字段为原始值。
 *
 * @param ids 数据ID列表
 * @return 数据对象列表
 */
List<T> readList(List<K> ids);
```
### 根据 ID 列表和指定字段读取对象列表
```java
/**
 * 根据ID列表读取多个数据对象。
 * 如果未指定字段，则默认读取所有可访问字段。
 * ManyToOne/OneToOne/Option/MultiOption字段为原始值。
 *
 * @param ids 数据ID列表
 * @param fields 要读取的字段列表
 * @return 数据对象列表
 */
List<T> readList(List<K> ids, Collection<String> fields);
```
### 更新一条数据
```java
/**
 * 根据ID更新一个数据对象。空值不会被忽略。
 *
 * @param object 要更新的数据对象
 * @return true / 异常
 */
boolean updateOne(T object);
```
### 更新一条数据，指定是否忽略 null 值
```java
/**
 * 根据ID更新一个数据对象。
 *
 * @param object 要更新的数据对象
 * @param ignoreNull 是否在更新时忽略空值
 * @return true / 异常
 */
boolean updateOne(T object, boolean ignoreNull);
```
### 更新一条数据，返回最新对象
```java
/**
 * 根据ID更新一个数据对象。
 *
 * @param object 要更新的数据对象
 * @param ignoreNull 是否在更新时忽略空值
 * @return true / 异常
 */
T updateOneAndReturn(T object);
```
### 更新一条数据，返回最新对象，指定是否忽略 null 值
```java
/**
 * 根据ID更新一个数据对象。
 * 返回从数据库中获取的带有最新字段值的更新对象。
 *
 * @param object 要更新的数据对象
 * @param ignoreNull 是否在更新时忽略空值
 * @return 从数据库中获取的带有最新字段值的更新对象
 */
T updateOneAndReturn(T object, boolean ignoreNull);
```
### 更新对象列表
```java
/**
 * 根据ID列表更新多个数据对象。空值不会被忽略。
 *
 * @param objects 要更新的数据对象列表
 * @return true / 异常
 */
boolean updateList(List<T> objects);
```
### 更新对象列表，指定是否忽略 null 值
```java
/**
 * 根据ID列表更新多个数据对象。
 *
 * @param objects 要更新的数据对象列表
 * @param ignoreNull 是否在更新时忽略空值
 * @return true / 异常
 */
boolean updateList(List<T> objects, boolean ignoreNull);
```
### 更新对象列表，返回最新对象列表
```java
/**
 * 根据ID列表更新多个数据对象。空值不会被忽略。
 * 返回从数据库中获取的带有最新字段值的更新对象列表。
 *
 * @param objects 要更新的数据对象列表
 * @return 从数据库中获取的带有最新字段值的更新对象列表
 */
List<T> updateListAndReturn(List<T> objects);
```
### 更新对象列表，返回最新对象列表，指定是否忽略 null 值
```java
/**
 * 根据ID列表更新多个数据对象。
 * 返回从数据库中获取的带有最新字段值的更新对象列表。
 *
 * @param objects 要更新的数据对象列表
 * @param ignoreNull 是否在更新时忽略空值
 * @return 从数据库中获取的带有最新字段值的更新对象列表
 */
List<T> updateListAndReturn(List<T> objects, boolean ignoreNull);
```
### 根据 ID 删除一条数据
```java
/**
 * 根据ID删除一个数据对象。
 *
 * @param id 数据ID
 * @return true / 异常
 */
boolean deleteOne(K id);
```
### 根据 ID 列表删除数据列表
```java
/**
 * 根据ID列表删除多个数据对象。
 *
 * @param ids 数据ID列表
 * @return true / 异常
 */
boolean deleteList(List<K> ids);
```
### 根据筛选条件删除多条数据
```java
/**
 * 根据指定的过滤条件删除数据对象。
 *
 * @param filters 过滤条件
 * @return true / 异常
 */
boolean deleteByFilters(Filters filters);
```
### 根据筛选条件获取 ID 列表
```java
/**
 * 根据过滤条件获取ID列表。
 *
 * @param filters 过滤条件
 * @return ID列表
 */
List<K> getIds(Filters filters);
```
### 获取关系型字段的 ID 列表
```java
/**
 * 获取ManyToOne/OneToOne关系字段的ID。
 *
 * @param filters 过滤条件
 * @param fieldName 关系字段名称
 * @return 关系字段的唯一ID列表
 */
List<K> getRelatedIds(Filters filters, String fieldName);
```
### 筛选一条数据
```java
/**
 * 根据过滤条件查询单个对象。仅供代码使用。
 * 当有多个对象时抛出异常。
 *
 * @param filters 过滤条件对象
 * @return 单个对象
 */
T searchOne(Filters filters);
```
### 筛选一条数据
```java
/**
 * 根据过滤条件查询单个对象。仅供代码使用。
 * 当有多个对象时抛出异常。
 *
 * @param flexQuery FlexQuery对象，可以设置字段、过滤条��、排序等
 * @return 单个对象
 */
T searchOne(FlexQuery flexQuery);
```
### 查询数据列表，无筛选条件
```java
/**
 * 根据过滤条件查询单个对象。仅供代码使用。
 * 当有多个对象时抛出异常。
 *
 * @param flexQuery FlexQuery对象，可以设置字段、过滤条��、排序等
 * @return 单个对象
 */
List<T> searchList();
```
### 根据条件查询数据列表
```java
/**
 * 根据过滤条件查询对象，不分页，仅供代码使用。
 * 如果结果超过MAX_BATCH_SIZE，则记录错误日志，但不抛出异常。
 *
 * @param filters 过滤条件
 * @return 对象列表
 */
List<T> searchList(Filters filters);
```
### 根据条件查询数据列表
```java
/**
 * 根据FlexQuery查询对象，不分页，仅供代码使用。
 * 如果结果超过MAX_BATCH_SIZE，则记录错误日志，但不抛出异常。
 *
 * @param flexQuery FlexQuery对象，可以设置字段、过滤条件、排序等
 * @return 对象列表
 */
List<T> searchList(FlexQuery flexQuery);
```
#### 查询并转换为 DTO 对象列表
```java
/**
 * 根据提供的FlexQuery查询对象并将其映射到指定的DTO类。
 * 如果结果超过MAX_BATCH_SIZE，则记录错误日志，��不抛出异常。
 *
 * @param <R> DTO类的类型
 * @param flexQuery FlexQuery对象，可以设置字段、过滤条件、排序等
 * @param dtoClass 要返回的对象的类
 * @return 指定DTO类的对象列表
 */
<R> List<R> searchList(FlexQuery flexQuery, Class<R> dtoClass);
```
### 分页查询数据
```java
/**
 * 根据FlexQuery查询对象并分页。
 * 页面大小不能超过MAX_BATCH_SIZE。
 *
 * @param flexQuery FlexQuery对象，可以设置字段、过滤条件、排序等
 * @param page 包含分页信息的Page对象
 * @return 包含对象的Page对象
 */
Page<T> searchPage(FlexQuery flexQuery, Page<T> page);
```
#### 分页查询并转换为 DTO 对象分页
```java
/**
 * 根据FlexQuery查询对象并分页，并将其映射到指定的DTO类。
 * 页面大小不能超过MAX_BATCH_SIZE。
 *
 * @param <R> DTO类的类型
 * @param flexQuery FlexQuery对象，可以设置字段、过滤���件、排序等
 * @param page 包含分页信息的Page对象
 * @param dtoClass 要返回的对象的类
 * @return 包含DTO对象的Page对象
 */
<R> Page<R> searchPage(FlexQuery flexQuery, Page<R> page, Class<R> dtoClass);
```
### 查询对象数据并将结果按照 ID 分组
```java
/**
 * 根据提供的过滤条件按ID分组对象。
 * 如果结果超过MAX_BATCH_SIZE，则记录错误日志，但不抛出异常。
 *
 * @param filters 搜索对象时应用的过滤条件
 * @return 对象映射（ID -> 对象）
 */
Map<Long, T> groupById(Filters filters);
```