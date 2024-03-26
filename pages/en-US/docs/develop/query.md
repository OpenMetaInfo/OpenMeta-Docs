# Query Condition

## 1. Infix Expressions

Infix expressions, where the operator is positioned between two operands, are the most common way to write expressions. This format is ubiquitous in everyday mathematical and logical expressions, exemplified by the simple expression `1 < 2`. In the realm of computing, nearly all high-level programming languages utilize infix expressions as the basis for arithmetic and logical operations, such as `amount > 100`.

Infix expressions are intuitive and align with human cognitive habits, making it possible to construct complex logical expressions. Therefore, OpenMeta adopts infix expressions for constructing data query conditions.

These expressions are highly versatile, capable of expressing straightforward binary relations, such as `a > b`, and facilitating the construction of complex query conditions with nested structures, like `(a > b AND c < d) OR (e = f AND g != h)`. A key rule when using infix expressions is the necessity of parentheses to clarify the precedence among different condition combinations.

Other operational expressions include:

- **Polish Notation (Prefix Expression):** This places the operator before its operands, with computation proceeding from right to left. Although easily parsed and executed by computers, it offers poorer readability for combined conditions.

- **Reverse Polish Notation (Postfix Expression):** In contrast to Polish notation, the operator follows its operands, with computation from left to right. This format is also computer-friendly for execution but suffers from poor readability for complex conditions.

## 2. Comparison Operators

| Number | Operator | Code Enum | Meaning | Remarks |
|--------|----------|-----------|---------|---------|
| 1 | = | EQUAL | Equal to | |
| 2 | != | NOT_EQUAL | Not equal to | |
| 3 | > | GREATER_THAN | Greater than | |
| 4 | >= | GREATER_THAN_OR_EQUAL | Greater than or equal to | |
| 5 | < | LESS_THAN | Less than | |
| 6 | <= | LESS_THAN_OR_EQUAL | Less than or equal to | |
| 7 | HAS | HAS | Contains | Text search, does not support indexing |
| 8 | NOT HAS | NOT_HAS | Does not contain | Text search, does not support indexing |
| 9 | START WITH | START_WITH | Starts with | Text search, supports indexing |
| 10 | NOT START WITH | NOT_START_WITH | Does not start with | Text search, supports indexing |
| 11 | IN | IN | In | |
| 12 | NOT IN | NOT_IN | Not in | |
| 13 | BETWEEN | BETWEEN | Between | Closed interval |
| 14 | NOT BETWEEN | NOT_BETWEEN | Not between | Open interval |
| 15 | IS SET | IS_SET | Has been set | |
| 16 | IS NOT SET | IS_NOT_SET | Has not been set | |
| 17 | PARENT OF | PARENT_OF | Queries all ancestors | Allows multiple values, supports indexing |
| 18 | CHILD OF | CHILD_OF | Queries all descendants | Allows multiple values, supports indexing |

### 2.1 `HAS` and `NOT HAS`

Text search, `HAS` and `NOT HAS`, correspond to SQL queries' `LIKE` and `NOT LIKE` **fuzzy matching**. Neither operator supports indexing.

### 2.2 `START WITH` and `NOT START WITH`

`START WITH` and `NOT START WITH` are solely for string search matches, respectively corresponding to SQL queries' `LIKE` and `NOT LIKE` **prefix matching**. These operators are meant for direct searches in large datasets and can support database indexing when not considering storing data in a specialized search engine.

### 2.3 `IN` and `NOT IN`

Supports multiple value matching, where Value is in a collection format, such as `a IN [1, 2, 3]`.

### 2.4 `BETWEEN` and `NOT BETWEEN`

`BETWEEN` signifies a closed interval, with Value being a data list containing two elements, including the range itself at both ends, like `a ≤ field ≤ b`.

`NOT BETWEEN` signifies an open interval, excluding the range itself at both ends, like `field < a OR field > b`.

### 2.5 `IS SET` and `IS NOT SET`

`IS SET` indicates that a field has been set, equivalent to the SQL condition `IS NOT NULL`.

`IS NOT SET` indicates that a field has not been set, equivalent to the SQL condition `IS NULL`.

### 2.6 `PARENT OF` and `CHILD OF`

In tree-structured data, it is often necessary to recursively query all parent nodes or all child nodes of a specified node, such as hierarchical organizational relationships. Depending on the business scenario, the specified node may be a single node or multiple nodes.

To enhance query performance in such scenarios, OpenMeta employs an `ID path query` mechanism, enabling the retrieval of all parent or child nodes with a single SQL query.

1. Business models requiring hierarchical queries, like departments, add an `idPath` field.
2. Convert to `id IN split(idPath, '/')`.
3. Equivalent to `START_WITH`, convert to left match `(id_path LIKE 'idPath%')`.

## 3. Filters Universal Filtering Conditions

In enterprise-level business systems, complex filtering conditions frequently arise, such as professional users customizing search criteria on the client-side or the server-side controlling data access scope based on business attributes. These scenarios require the system to support dynamically combined filtering conditions.

OpenMeta encapsulates common data transformation and comparison functions within a Filters object, facilitating the transmission and manipulation of filtering conditions in the code. It supports structured and semantic query parameters through JSON parsing and ANTLR syntax parsing.

### 3.1 Structured Query Filters

Structured Filters are categorized into Unit, Tree, and Empty types, corresponding to the smallest query unit, query structure tree, and empty condition, respectively. All query conditions are expressed using infix expressions. Clients can pass parameters as either a single string or a list of strings; if in string format, server-side programs deserialize the string into a Filters object, and if a list of strings, directly invoke Filters parsing function.

- **Smallest Query Unit:** The smallest query unit, `FilterUnit`, is structured as `[field, operator, value]`, such as querying users named `Tom`: `["name", "=", "Tom"]`. The `operator` in `FilterUnit` is case-insensitive. For a list of supported operators, see the Comparison Operators section.

- **Query Structure Tree:** A query structure tree combines multiple query units nested together. For example, `[["name", "=", "Tom"], "OR", ["code", "=", "A100"]], "AND", ["priority", ">", 1]]` supports infinitely nested combined conditions. Logical operators between query conditions accept only `AND` and `OR`, are case-insensitive, and default to `AND` if not provided.

- **Field Comparison:** OpenMeta supports field comparisons within filtering conditions, such as `fieldA > fieldB`, by replacing the `value` attribute in `FilterUnit: [field, operator, value]` with a placeholder for the reserved field name `@{fieldName}`, like `["fieldA", ">", "@{FieldB}"]`.

### 3.2 Filters Semantic Queries

In client query scenarios, professional users can query data by defining `DSL` queries, such as `name = "Tom" OR total > 200`. At this time, it is necessary to provide a simplified yet equally flexible method for defining Filters. OpenMeta supports structured query methods as well as querying using semantic strings.

For structured queries like `[["name", "=", "Tom"], "OR", ["code", "=", "A100"]]`, the semantic query simplifies to: `name = "Tom" OR code = "A100"`.

Structured query `[["name", "=", "Tom"], "OR", ["code", "=", "A100"]], "AND", ["priority", ">", 1]]`, the semantic query expression is `(name = "Tom" OR code = "A100") AND priority > 1`.

In semantic queries, if the value is a string type, double quotes must still be retained. If the value type involves multiple values, `[]` brackets are used.

### 3.3 Implementation of Semantic Queries

For semantic query scenarios, ANTLR syntax parsing is used to convert the user's semantic expressions into Filters objects. The syntax parsing rules are defined as follows:

```js
grammar FilterExpr;

expr:   expr AND expr               # AndExpr
    |   expr OR expr                # OrExpr
    |   '(' expr ')'                # ParenExpr
    |   unit                        # UnitExpr
    ;

AND:    'AND';
OR:     'OR';

unit:   FIELD OPERATOR value        # FilterUnitExpr
    ;

value: singleValue                  # SingleValueExpr
     | listValue                    # ListValueExpr
     ;

singleValue: NUMBER
           | BOOLEAN
           | QUOTED_STRING
           ;

listValue: '[' singleValue (',' singleValue)* ']'
          ;

FIELD:  [a-z][a-zA-Z0-9]*;
OPERATOR: '='
        | '!='
        | '>'
        | '>='
        | '<'
        | '<='
        | 'HAS'
        | 'NOT HAS'
        | 'START WITH'
        | 'NOT START WITH'
        | 'IN'
        | 'NOT IN'
        | 'BETWEEN'
        | 'NOT BETWEEN'
        | 'IS SET'
        | 'IS NOT SET'
        | 'PARENT OF'
        | 'CHILD OF';

NUMBER: [0-9]+ ('.' [0-9]+)?;
BOOLEAN: 'true' | 'false';
QUOTED_STRING: '"' (~["\\] | '\\' .)* '"';  // Double-quoted string, supports escape characters

WS: [ \t\r\n]+ -> skip;                     // Ignore whitespace
```

The visitor definition for semantic search expressions is as follows:

```java
public class FilterExprVisitorImpl extends FilterExprBaseVisitor<Filters> {
    @Override
    public Filters visitParenExpr(FilterExprParser.ParenExprContext ctx) {
        return visit(ctx.expr());
    }

    @Override
    public Filters visitAndExpr(FilterExprParser.AndExprContext ctx) {
        Filters left = visit(ctx.expr(0));
        Filters right = visit(ctx.expr(1));
        return Filters.merge(LogicOperator.AND, left, right);
    }

    @Override
    public Filters visitOrExpr(FilterExprParser.OrExprContext ctx) {
        Filters left = visit(ctx.expr(0));
        Filters right = visit(ctx.expr(1));
        return Filters.merge(LogicOperator.OR, left, right);
    }

    @Override
    public Filters visitUnitExpr(FilterExprParser.UnitExprContext ctx) {
        if (ctx.unit() instanceof FilterExprParser.FilterUnitExprContext unitContext) {
            String field = unitContext.FIELD().getText();
            Operator operator = Operator.of(unitContext.OPERATOR().getText());
            Object value = parseValue(unitContext.value());
            return Filters.of(field, operator, value);
        }
        throw new IllegalArgumentException("Unsupported unit expression: " + ctx.unit().getClass().getName());
    }

    private Object parseValue(FilterExprParser.ValueContext ctx) {
        if (ctx instanceof FilterExprParser.SingleValueExprContext singleValueCtx) {
            FilterExprParser.SingleValueContext singleValue = singleValueCtx.singleValue();
            return parseSingleValue(singleValue);
        } else if (ctx instanceof FilterExprParser.ListValueExprContext listValueCtx) {
            List<Object> list = new ArrayList<>();
            if (listValueCtx.listValue() instanceof FilterExprParser.ListValueContext valueListContext) {
                for (FilterExprParser.SingleValueContext valueCtx : valueListContext.singleValue()) {
                    list.add(parseSingleValue(valueCtx)); // Recursively parse each value in the list
                }
            }
            return list;
        }
        throw new IllegalArgumentException("Unsupported value context");
    }
}
```

### 3.4 Performance Comparison of Both Methods

Using JMH for benchmarking, executed 10000 times within 1 second, the following query conditions are parsed respectively:

(1) Structured scenario
`[[[["name", "=", "Te st"], "AND", ["code", "IN", ["A01"]]], "OR", ["version", "NOT IN", [1]]], "AND", ["priority","!=",21]]`
(2) Semantic query
`((name = "Te st" AND code IN ["A01"]) OR version NOT IN [1]) AND priority != 21`
The test results are as follows:

![Performance](/image/query_performance.png)

The test results show that structured query parsing is more efficient. Therefore, OpenMeta's server defaults to using structured query and storage, supporting semantic queries on the client side.

### 3.5 Filters Cascading Queries

In enterprise business systems, cascading query scenarios are often encountered. OpenMeta supports querying data of the primary model based on conditions of the associated model by connecting relational fields with chain operators (.).

The definition format for cascading queries is `[field1.field2.field3.field4Name, operator, value]`, except for the last level field, the field chain type can only be OneToOne, ManyToOne, OneToMany, ManyToMany. The maximum cascade level can be limited in global configuration parameters. For example, `customerId.countryId.name = "China"` means querying order data where the customer's country is China.

OpenMeta's cascading queries support multiple cascading conditions and multi-level cascading in Filters, i.e., each query unit FilterUnit can be a cascading query.

Cascading query is an advanced querying technique, serving as a supplemental means for the system to support complex business requirements, allowing users to perform multi-level data association queries. In OneToOne, ManyToOne cascading field query scenarios, the server queries data through multi-table joins. For high-frequency, multi-level cascading query scenarios, optimization should be considered at the model structure level, such as adding redundant fields to business tables to reduce the level of cascading queries and improve query performance.

### 3.6 XToMany Query Conditions

In the context of OpenMeta, XToMany represents the OneToMany and ManyToMany field types, which share certain similarities in many scenarios.

When encountering OneToMany, ManyToMany fields in query conditions, OpenMeta first queries data based on the filtering conditions of the Many side model, aggregates the results into the primary model's query conditions, and then executes the final
