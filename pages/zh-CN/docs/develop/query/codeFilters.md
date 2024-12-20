# 通用查询条件

## 1. FlexQuery 动态查询

## 2. Filters 对象构建
以在线招聘系统中的 Job 业务模型为例，定义如下几个简单属性。接下来以这个模型为例，介绍如何在代码中构建简单查询条件和复合查询条件。
```java
public class Job {
    private String title;     // 职位名称
    private Integer grade;    // 职位等级: 1-20
    private String status;    // 职位状态: Open, Closed, Cancelled
    private Integer salary;   // 最低薪资，单位为 K
}
```

### 2.1 简单的 `AND` 条件查询
所有的查询操作方法，都支持 `Lambda` 表达式声明字段，如 `Job::getTitle`、`Job::getGrade` 等，也支持字符串写法，如 `"title"`、`"grade"` 等。
在专业代码中，建议使用 `Lambda` 表达式，以避免拼写错误和字段重构带来的影响。特殊情况下，可以使用字符串写法。

1. 分别构建 `filters1` 和 `filters2` 两个查询条件：
```java
// WHERE title = 'PM'
Filters filters1 = new Filters().eq(Job::getTitle, "PM");
// WHERE grade > 6
Filters filters2 = new Filters().gt(Job::getGrade, 6);
```
使用字符串声明字段名的写法：
```java
Filters filters1 = new Filters().eq("title", "PM");
Filters filters2 = new Filters().gt("grade", 6);
```

> 以下所有声明字段的操作方法，全部支持 `Lambda` 表达式写法和字符串写法，对应关系如下：
> * Job::getTitle -> "title"
> * Job::getGrade -> "grade"
> * Job::getStatus -> "status"
> * Job::getSalary -> "salary"

2. 将 `filters1` 和 `filters2` 用 `AND` 逻辑合并，以下写法是等效的：
```java
// .and(filters) 该 and 方法是一个非静态方法，仅接收一个 filters 参数
Filters filters3 = filters1.and(filters2);
// .and(filters1, filters2, Filters...) 该 and 方法是一个静态方法，至少两个 filters 参数
Filters filters3 = Filters.and(filters1, filters2);
// Filter 默认是 `AND` 逻辑
Filters filters3 = new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6);
Filters filters3 = Filters.and().eq(Job::getTitle, "PM").gt(Job::getGrade, 6);
```

3. `filters3` 等价于以下 `SQL` 语句：
```sql
 WHERE title = 'PM' AND grade > 6
```

### 2.2 简单的 `OR` 条件查询
1. 分别构建 `filters4` 和 `filters5` 两个查询条件：
```java
// WHERE status = 'Open'
Filters filters4 = new Filters().eq(Job::getStatus, "Open");
// WHERE salary < 30
Filters filters5 = new Filters().lt(Job::getSalary, 30);
```

2. 将 `filters4` 和 `filters5` 用 `OR` 逻辑合并，以下写法是等效的：
```java
// .or(filters) 该 or 方法是一个非静态方法，仅接收一个 filters 参数
Filters filters6 = filters4.or(filters5);
// .or(filters4, filters5, Filters...) 该 or 方法是一个静态方法，至少两个 filters 参数
Filters filters6 = Filters.or(filters4, filters5);
Filters filters6 = Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30);
```

3. `filters6` 等价于以下 `SQL` 语句：
```sql
 WHERE status = 'Open' OR salary < 30
```

### 2.3 复合查询条件：`AND` 逻辑合并
1. 将 `filters1`, `filters2`, `filters6` 等多个查询对象，合并成一个 `AND` 查询条件，以下写法是等效的：
```java
// filters1 = new Filters().eq(Job::getTitle, "PM");
// filters2 = new Filters().gt(Job::getGrade, 6);
// filters6 = Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30);
// filters6 内部是一个 `OR` 逻辑
Filters filters7 = filters1.and(filters2).and(filters6);
Filters filters7 = filters6.and(filters1).and(filters2);
Filters filters7 = Filters.and(filters1, filters2, filters6);
```

2. `filters7` 等价于以下 `SQL` 语句：
```sql
 WHERE title = 'PM' AND grade > 6 AND (status = 'Open' OR salary < 30)
```

3. `filters7` 更多等效的写法，可以根据上下文变量情况选择性使用：
```java
Filters filters7 = filters1.and(filters2.and(filters6));
Filters filters7 = filters1.and(Filters.and(filters2, filters6));
// 条件之间进行 `AND` 合并，子条件可以是 `OR` 查询条件
// filters6 = Filters.or(filters4, filters5);
Filters filters7 = filters1.and(filters2)
                           .and(filters4.or(filters5));
Filters filters7 = filters1.and(filters2)
                           .and(Filters.or(filters4, filters5));
Filters filters7 = filters1.and(filters2)
                           .and(Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30));
Filters filters7 = new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6)
                                .and(Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30));
// 先创建 `OR` 逻辑，再与其他条件进行 `AND` 合并
Filters filters7 = filters4.or(filters5)
                           .and(filters1)
                           .and(filters2);
Filters filters7 = Filters.or(filters4, filters5)
                          .and(filters1)
                          .and(filters2);
Filters filters7 = Filters.or().or(filters4).or(filters5)
                          .and(filters1)
                          .and(filters2);
Filters filters7 = Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30)
                          .and(filters1)
                          .and(filters2);
Filters filters7 = Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30)
                          .and(new Filters().eq(Job::getTitle, "PM"))
                          .and(new Filters().gt(Job::getGrade, 6));
```

### 2.3 复合查询条件：`OR` 逻辑合并
1. 将 `filters3`, `filters4`, `filters5` 等多个查询对象，合并成一个 `OR` 查询条件，以下写法是等效的：
```java
// filters3 = new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6);
// filters4 = new Filters().eq(Job::getStatus, "Open");
// filters5 = new Filters().lt(Job::getSalary, 30);
Filters filters8 = filters3.or(filters4).or(filters5);
Filters filters8 = Filters.or(filters3, filters4, filters5);
Filters filters8 = filters3.or(filters4).or(filters5);
```

2. `filters8` 等价于以下 `SQL` 语句：
```sql
 WHERE (title = 'PM' AND grade > 6) OR status = 'Open' OR salary < 30
```

3. `filters8` 更多等效的写法，可以根据上下文变量情况选择性使用：
```java
Filters filters8 = filters3.or(Filters.or(filters4, filters5));
// 条件之间进行 `OR` 合并，子条件可以是 `AND` 查询条件
// filters3 = Filters.and(filters1, filters2);
Filters filters8 = Filters.and(filters1, filters2)
                          .or(filters4)
                          .or(filters5);
Filters filters8 = Filters.and(filters1, filters2)
                          .or(filters4.or(filters5));
Filters filters8 = filters4.or(filters5)
                           .or(Filters.and(filters1, filters2));
Filters filters8 = filters4.or(filters5)
                           .or(filters1.and(filters2)));
// 先创建 `AND` 逻辑，再与其他条件进行 `OR` 合并
Filters filters8 = new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6)
                                .or().eq(Job::getStatus, "Open")
                                .or().lt(Job::getSalary, 30);
Filters filters8 = new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6)
                                .or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30);
Filters filters8 = new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6)
                                .or(Filters.or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30));
```

4. Filters 查询条件构造顺序
Filters构造时遵循从左到右原则，如 `new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6).or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30)`，解析逻辑如下：
> * (1) `new Filters().eq(Job::getTitle, "PM")`，等价于 `title = 'PM'`；
> * (2) `new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6)`，等价于 `title = 'PM' AND grade > 6`，
    此时 `filters` 对象为 `AND` 逻辑；
> * (3) `new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6).or().eq(Job::getStatus, "Open")`，
    等价于 `(title = 'PM' AND grade > 6) OR status = 'Open'`，
    此时，`filters` 对象转变为 `OR` 逻辑；
> * (4). `new Filters().eq(Job::getTitle, "PM").gt(Job::getGrade, 6).or().eq(Job::getStatus, "Open").lt(Job::getSalary, 30)`，
    为继续增加一个 `OR` 逻辑条件 `.lt(Job::getSalary, 30)`，
    等价于 `(title = 'PM' AND grade > 6) OR status = 'Open' OR salary < 30`

### 2.4 其它用法
1. 多个 filters 对象合并
```java
// 假设存在List<Filters> filtersList = Lists.newArrayList(filters1, filters2, filters3);
Filters filters = Filters.and(filtersList);
```

## 3. Orders 对象构建

## 4. SubQueries 对象构建