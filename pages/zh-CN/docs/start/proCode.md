# 构建专业代码应用

## EntityService 通用方法

#### 创建一条数据，返回 ID
```java
/**
 * Create a single data object and return the id.
 *
 * @param object data object to be created
 * @return id
 */
K createOne(T object);
```
#### 创建一条数据，返回最新数据
```java
/**
  * Create a single data object, return the object with id and other latest field values
  *
  * @param object data object to be created
  * @return object with id and other latest field values.
  */
T createOneAndReturn(T object);
```
#### 批量创建数据，返回 ID 列表
```java
/**
  * Create multiple data objects and return the id list.
  *
  * @param objects data object list to be created
  * @return id list
  */
List<K> createList(List<T> objects);
```
#### 批量创建数据，返回最新数据列表
```java
/**
  * Create multiple data objects, return the object list with id and other latest field values.
  *
  * @param objects data object list to be created
  * @return object list, each object with id and other latest field values.
  */
List<T> createListAndReturn(List<T> objects);
```
#### 根据 ID 读取一条对象数据
```java
/**
  * Read one data object by id.
  * The ManyToOne/OneToOne/Option/MultiOption fields are original values.
  *
  * @param id data id
  * @return data object
  */
T readOne(K id);
```
#### 根据 ID 读取对象指定字段数据
```java
/**
  * Read one data object by id.
  * If the fields is not specified, all accessible fields as the default.
  * The ManyToOne/OneToOne/Option/MultiOption fields are original values.
  *
  * @param id data id
  * @param fields field list to read
  * @return data object
  */
T readOne(K id, Collection<String> fields);
```
#### 根据 ID 列表读取对象列表
```java
/**
  * Read multiple data objects by ids.
  * The ManyToOne/OneToOne/Option/MultiOption fields are original values.
  *
  * @param ids data ids list
  * @return data object list
  */
List<T> readList(List<K> ids);
```
#### 根据 ID 列表和指定字段读取对象列表
```java
/**
  * Read multiple data objects by ids.
  * If the fields is not specified, all accessible fields as the default.
  * The ManyToOne/OneToOne/Option/MultiOption fields are original values.
  *
  * @param ids data ids list
  * @param fields field list to read
  * @return data object list
  */
List<T> readList(List<K> ids, Collection<String> fields);
```
#### 更新一条数据
```java
/**
  * Update one data object by its ID. Null values are not ignored.
  *
  * @param object the data object to update
  * @return true / Exception
  */
boolean updateOne(T object);
```
#### 更新一条数据，指定是否忽略 null 值
```java
/**
  * Update one data object by its ID.
  *
  * @param object the data object to update
  * @param ignoreNull whether to ignore null values during the update
  * @return true / Exception
  */
boolean updateOne(T object, boolean ignoreNull);
```
#### 更新一条数据，返回最新对象
```java
/**
  * Update one data object by its ID. Null values are not ignored.
  * Return the updated object fetched from the database with the latest field values.
  *
  * @param object the data object to update
  * @return the updated object fetched from the database with the latest field values.
  */
T updateOneAndReturn(T object);
```
#### 更新一条数据，返回最新对象，指定是否忽略 null 值
```java
/**
  * Update one data object by its ID.
  * Return the updated object fetched from the database with the latest field values.
  *
  * @param object the data object to update
  * @param ignoreNull whether to ignore null values during the update
  * @return the updated object fetched from the database, with the latest field values.
  */
T updateOneAndReturn(T object, boolean ignoreNull);
```
#### 更新对象列表
```java
/**
  * Update multiple data objects by their IDs. Null values are not ignored.
  *
  * @param objects the list of data objects to update
  * @return true / Exception
  */
boolean updateList(List<T> objects);
```
#### 更新对象列表，指定是否忽略 null 值
```java
/**
  * Update multiple data objects by their IDs.
  *
  * @param objects the list of data objects to update
  * @param ignoreNull whether to ignore null values during the update
  * @return true / Exception
  */
boolean updateList(List<T> objects, boolean ignoreNull);
```
#### 更新对象列表，返回最新对象列表
```java
/**
  * Update multiple data objects by their IDs. Null values are not ignored.
  * Return the updated object fetched from the database with the latest field values.
  *
  * @param objects the list of data objects to update
  * @return the updated objects fetched from the database with the latest field values.
  */
List<T> updateListAndReturn(List<T> objects);
```
#### 更新对象列表，返回最新对象列表，指定是否忽略 null 值
```java
/**
  * Update multiple data objects by their IDs.
  * Return the updated object fetched from the database with the latest field values.
  *
  * @param objects the list of data objects to update
  * @param ignoreNull whether to ignore null values during the update
  * @return the updated objects fetched from the database with the latest field values.
  */
List<T> updateListAndReturn(List<T> objects, boolean ignoreNull);
```
#### 根据 ID 删除一条数据
```java
/**
  * Delete one data object by ID.
  *
  * @param id data id
  * @return true / Exception
  */
boolean deleteOne(K id);
```
#### 根据 ID 列表删除数据列表
```java
/**
  * Delete multiple data objects by IDs.
  *
  * @param ids data ids
  * @return true / Exception
  */
boolean deleteList(List<K> ids);
```
#### 根据筛选条件删除多条数据
```java
/**
  * Delete data objects by specified filters.
  *
  * @param filters filter conditions
  * @return true / Exception
  */
boolean deleteByFilters(Filters filters);
```
#### 根据筛选条件获取 ID 列表
```java
/**
  * Get the ids based on the filters.
  *
  * @param filters filters
  * @return ids list
  */
List<K> getIds(Filters filters);
```
#### 获取关系型字段的 ID 列表
```java
/**
  * Get the ids for ManyToOne/OneToOne relational field.
  *
  * @param filters filters
  * @param fieldName relational field name
  * @return distinct ids for relational field
  */
List<K> getRelatedIds(Filters filters, String fieldName);
```
#### 筛选一条数据
```java
/**
  * Query a single object based on filters. Only for code use.
  * Throw an exception when there are multiple objects.
  *
  * @param filters filters object
  * @return single object
  */
T searchOne(Filters filters);
```
#### 筛选一条数据
```java
/**
  * Query a single object based on filters. Only for code use.
  * Throw an exception when there are multiple objects.
  *
  * @param flexQuery FlexQuery object, can set fields, filters, orders, etc.
  * @return single object
  */
T searchOne(FlexQuery flexQuery);
```
#### 查询数据列表，无筛选条件
```java
/**
  * Query objects without pagination, only for code use.
  * If the result exceeds the MAX_BATCH_SIZE, an error log is recorded, but no exception is thrown.
  *
  * @return object list
  */
List<T> searchList();
```
#### 根据条件查询数据列表
```java
/**
  * Query objects based on Filters without pagination, only for code use.
  * If the result exceeds the MAX_BATCH_SIZE, an error log is recorded, but no exception is thrown.
  *
  * @param filters filters
  * @return object list
  */
List<T> searchList(Filters filters);
```
#### 根据条件查询数据列表
```java
/**
  * Query objects based on FlexQuery without pagination, only for code use.
  * If the result exceeds the MAX_BATCH_SIZE, an error log is recorded, but no exception is thrown.
  *
  * @param flexQuery FlexQuery object, can set fields, filters, orders, etc.
  * @return object list
  */
List<T> searchList(FlexQuery flexQuery);
```
#### 分页查询数据
```java
/**
  * Query objects based on FlexQuery with pagination.
  * The page size cannot exceed the MAX_BATCH_SIZE.
  *
  * @param flexQuery FlexQuery object, can set fields, filters, orders, etc.
  * @param page page object
  * @return objects in the page
  */
Page<T> searchPage(FlexQuery flexQuery, Page<T> page);
```