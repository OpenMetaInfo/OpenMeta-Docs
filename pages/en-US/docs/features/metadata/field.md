# Field Metadata

## 1. Introduction to Field Metadata

Field metadata is a collection of descriptive information about model fields. It defines various fields used in business scenarios, including the type, length, default value, required status, read-only status, relationships, and more. Through this metadata, the system can control data responses, processing, and interactions in a unified manner, abstracting common requirements to ensure data consistency, accuracy, and completeness.

## 2. Field Metadata Attributes

| No. | Field Information | Data Type | Description | Remarks |
| --- | --- | --- | --- | --- |
| 1 | labelName | String | Field label |  |
| 2 | modelName | String | Model name |  |
| 3 | fieldName | String | Field name |  |
| 4 | fieldType | Option | Field type |  |
| 5 | optionCode | String | Option set code |  |
| 6 | defaultValue | String | Field default value |  |
| 7 | length | Integer | Field length |  |
| 8 | scale | Integer | Decimal places |  |
| 9 | required | Boolean | Required field, default `false` |  |
| 10 | readonly | Boolean | Read-only field, default `false` |  |
| 11 | hidden | Boolean | Hidden, default `false` |  |
| 12 | copyable | Boolean | Copyable field, default `true` |  |
| 13 | searchable | Boolean | Searchable field, default `true` |  |
| 14 | stored | Boolean | Stored field, default `true` |  |
| 15 | translatable | Boolean | Translatable field, default `false` |  |
| 16 | encrypted | Boolean | Encrypted field, default `false` |  |
| 17 | desensitized | Boolean | Desensitized field, default `false` |  |
| 18 | desensitizedType | Option | Desensitization type |  |
| 19 | computable | Boolean | Computable field, default `false` |  |
| 20 | expression | String | Computation expression |  |
| 21 | cascadedField | String | Cascaded field | Relationship attribute |
| 22 | relatedModel | String | Related model | Relationship attribute |
| 23 | relatedField | String | Related field | Relationship attribute |
| 24 | inverseLinkField | String | Inverse link field | Relationship attribute |
| 25 | autoBindMany | Boolean | Auto-bind Many side, default `false` | Relationship attribute |
| 26 | autoExpandMany | Boolean | Auto-expand Many side, default `false` | Relationship attribute |
| 27 | displayName | MultipleString | Display name for relational fields | Relationship attribute |
| 28 | filters | String | Filtering conditions for relational fields | Relationship attribute |
| 29 | columnName | String | Data table column name | Read-only |
| 30 | description | String | Field description |  |

### 2.1 `labelName` Field Label

The label name of the field, i.e., the semantic name of the field, usually displayed as the field name in the list page header or form page. For example, `Contact Number`.

### 2.2 `modelName` Model Name

The name of the model to which the field belongs. The model name here refers to the technical name of the model, such as `ProductCategory`.

### 2.3 `fieldName` Field Name

The technical name of the field, corresponding to the property name definition of the entity class, such as `unitPrice`. Before querying, the field name is converted to `underscore naming` based on the storage type, such as `unit_price`.

### 2.4 `fieldType` Field Type

Predefined field types in the system include string text, various numeric types, date types, option set types, JSON types, and various relationship types. For details, refer to the `FieldType` summary.

### 2.5 `optionCode` Option Set Code

Option sets are generally used in scenarios where options are relatively fixed, the number of options is limited, but expansion support is needed. In OpenMeta, all option information is stored in the `Option Set Model` and `Option Set Entry Model`.

When the field type is `Single Select` or `Multi Select`, the `optionCode` option set code property needs to be configured.

### 2.6 `defaultValue` Default Field Value

Configuration of the field's default value. When creating a new record, if the current field is not assigned a value, the default value will be used.

Logic for assigning default values in the Create scenario:
(1) Check if the field has a value (not `NULL`). If there is a value, use the current value, and the default value will not be used. An empty string `` for text fields and 0 for numeric fields are considered values.

(2) If the current field has not been assigned a value, the default value will be used.

(3) If the field is not configured with a default value, the default value corresponding to the field type will be used. Refer to the `FieldType` section for specific default values for different field types.

### 2.7 `length` Field Length

The length of the field, corresponding to the character length for string types and the number of digits for integer types and high-precision numeric types.

### 2.8 `scale` Decimal Places

Decimal places for float and high-precision numeric types, with a default of 2 decimal places.

### 2.9 `required` Required Field

Control for the field's required property. OpenMeta's data processing layer immediately performs validation, independent of the database. When creating or updating data, the field's required property is checked. Unlike the database's `not null` property, a `required=true` field must be assigned a value during creation, and the value cannot be empty (including not allowing empty strings). Updating this field cannot set it to null.

### 2.10 `readonly` Read-Only Field

Whether client updates are allowed. For fields with `readonly=true`, client/API assignments and updates are not allowed; only server-side updates are supported, such as for calculated or auto-fill fields. Client-side creation and updating data check this property, and an error will occur when assigning a value to a read-only field.

Audit fields createdId, createdTime, updatedId, and updatedTime are automatically maintained by the underlying system, defaulting to `readonly=true`.

### 2.11 `hidden` Hidden Field

Whether to hide this field by default on the client, defaulting to `false`.

### 2.12 `copyable` Copyable Field

Whether the data of the current field is copied when duplicating data on the client, defaulting to `true`. All fields are copyable, except for the primary key `id` field.

### 2.13 `searchable` Searchable Field

Whether this field can be used as a query condition in a general search scenario. Defaults to `true`, meaning all fields are searchable.

### 2.14 `stored` Stored Field

Whether this field is a stored field, defaulting to `true`. All field values are stored in the database.

Scenarios where it can be `false`: dynamic calculation fields, dynamic cascading fields. Values of non-stored fields generally represent the calculated result value of the latest data. When using dynamic calculation fields, consider the impact on client performance and avoid using dynamic calculation fields in scenarios involving large amounts of data.

### 2.15 `translatable` Translatable Field

In multilingual data scenarios, indicates whether the value of this field can be translated. `translatable=true` indicates that this field is a multilingual field. Defaults to `false`.

### 2.16 `encrypted` Encrypted Field

Whether this field is an encrypted field, defaulting to AES256 encryption.

### 2.17 `desensitized` Desensitized Field

Indicates whether this field needs data desensitization. `desensitized=true` means that the client will automatically desensitize this field's data when fetching through the API. Desensitization can be configured to replace all or part of the field's data with the `****` string.

Desensitized fields do not affect cascading fields, calculated fields, and other fields calculated on the server. In other words, calculated fields can depend on desensitized fields, and desensitized fields can be calculated fields at the same time.

The client can use the getSensitiveField interface to obtain sensitive data for a specific field, and the server will record access logs for sensitive data during this process.

### 2.18 `desensitizedType` Desensitization Type

Configuration of desensitization rules, which can be desensitized according to rules for phone numbers, names, ID numbers, and bank card numbers. When the `desensitized` attribute of a field is `true` but no desensitization type is configured, it defaults to full desensitization.

- `All`: Full desensitization, replaced entirely with `****`.
- `Name`: Name desensitization, keeping the first and last characters, or the last character when the name is only 2 characters long.
- `Email`: Email desensitization, keeping the first 4 characters.
- `PhoneNumber`: Phone number desensitization, desensitizing the last 4 characters.
- `IdNumber`: ID number desensitization, keeping the first and last 4 characters.
- `CardNumber`: Card number desensitization, keeping the last 4 characters.

### 2.19 `computable` Computable Field

Indicates whether this field is a computable field. Computable fields can be configured with computation expressions and depend on other fields of the current model in the computation expression.

Currently, due to performance considerations, cross-model field references are not supported in a single computation expression. If necessary, you can read field data across models in Flow orchestration and participate in computations.

For `stored=true` computable fields, when the dependent fields change, recalculation is triggered automatically.

For `stored=false` computable fields, the computation result is not stored in the database. When reading this calculated field, the computation is executed automatically. Therefore, the limitations of non-stored fields need to be considered, which are not suitable for obtaining large amounts of data at once.

### 2.20 `expression` Computation Expression

In the `expression` expression, you can reference other fields of the current model for computation. In the expression, common utility functions such as arithmetic operations, string functions, and date functions can be used.

For numeric types, high-precision computations are used to avoid precision loss, with 16 decimal places retained during the computation process, using the `banker's rounding` method at the end. Since the decimal places parameter configuration for numeric fields is generally less than or equal to 16, the precision of this computation process does not affect the precision control of the field itself.

OpenMeta uses **[AviatorScript](https://github.com/killme2008/aviatorscript)** as the expression engine and sets it to safe sandbox mode.

### 2.21 `cascadedField` Cascaded Field

Refers to the values of fields in associated models through OneToOne/ManyToOne field references. The configuration format is dot-separated cascaded fields, with the left side being the OneToOne/ManyToOne field name of the current model, and the right side being the field name of the associated model, such as `productId.productName`.

For `stored=true` cascaded fields, recalculation is triggered automatically when the dependent OneToOne/ManyToOne field changes.

For `stored=false` cascaded fields, it means that the cascaded value is not stored in the database. When reading this cascaded field, the latest field values are automatically cascaded.

This cascade is a logical cascade, not a database cascade.

### 2.22 `relatedModel` Related Model

The associated model for relational fields, i.e., the model name for OneToOne, ManyToOne, OneToMany, and ManyToMany field types. For ManyToMany field types, this associated model is the model name of the intermediate table.

### 2.23 `relatedField` Related Field

When the field type is OneToMany or ManyToMany, the field in the related model that references the current model. For OneToOne and ManyToOne, the default value of this property is the `id` of the related model.

### 2.24 `inverseLinkField` Inverse Link Field

When the field type is ManyToMany, the field name in the target table that is linked to the middle table.

### 2.25 `autoBindMany` Auto-bind Many Side

For fields of types OneToMany/ManyToMany, when clients query data without specifying fields to retrieve, whether to automatically bind the retrieval of the current OneToMany/ManyToMany type field. Default is `false`. The prerequisite for automatic binding is that the system configuration enables "Automatically load model fields when fields are not specified."

### 2.26 `autoExpandMany` Auto-expand Many Side

For fields of type ManyToMany, whether to automatically load the default fields of the related model in the returned value. Default is `false`, returning `[ [id, displayName] ... ]` data list.

### 2.27 `displayName` Display Name for Relational Fields

Set the field-level `displayName` property for OneToOne, ManyToOne, ManyToMany, OneToMany relational fields to configure the display name of the related model data. If not configured at the field level, it uses the `displayName` configuration of the related model.

### 2.28 `filters` Filtering Conditions for Relational Fields

Basic filtering conditions for OneToOne, ManyToOne relational fields, used to filter optional data based on business scenarios. When executing queries, clients can carry fixed filtering conditions along with user search conditions; the relationship is an `AND` relationship.

### 2.29 `columnName` Data Table Column Name

Read-only field, the data table column name corresponding to the field, automatically converted from the field name, such as `unit_price`.

When the field name changes, the data table column name is synchronized by default. The automatic modification of the data table can be turned off through the global DDL switch to meet the scenario of submitting DDL in other ways.

### 2.30 `description` Field Description

The business description of the field.

# 3 Field Types FieldType

| No. | Type | Type Name | Default Value |
| --- | --- | --- | --- |
| 1 | String | String | "" |
| 2 | Integer | Integer | 0 |
| 3 | Long | Long | 0L |
| 4 | Double | Double | 0.00 |
| 5 | BigDecimal | BigDecimal | "0" |
| 6 | Boolean | Boolean | false |
| 7 | Date | Date |  |
| 8 | DateTime | DateTime |  |
| 9 | Option | Single select |  |
| 10 | MultipleOption | Multiple select | [] |
| 11 | MultipleString | String list | [] |
| 12 | JSON | JSON |  |
| 13 | Filter | Filter |  |
| 14 | OneToOne | OneToOne |  |
| 15 | ManyToOne | ManyToOne |  |
| 16 | OneToMany | OneToMany |  |
| 17 | ManyToMany | ManyToMany |  |

> Note: The foreign keys of OneToOne and ManyToOne are logical foreign keys, not physical database foreign keys.

### 3.1 `String`

A field of string type, using `length` to configure the length of the string.

### 3.2 `Integer`

An integer type field, using `length` to configure the number of integer digits.

### 3.3 `Long`

Long integer type.

### 3.4 `Double`

Ordinary decimal type, used in scenarios that accept precision loss in calculations.

### 3.5 `BigDecimal`

Precise decimal type, used in high-precision calculation scenarios such as money, currency, and exchange rates.

### 3.6 `Boolean`

Boolean type field.

### 3.7 `Date`

Date type, `LocalDate` object, displayed in the format `yyyy-MM-dd`, such as `2024-02-29`.

### 3.8 `DateTime`

Date and time type accurate to seconds, `LocalDateTime` object, stored as a timestamp in the database, displayed in the format `yyyy-MM-dd HH:mm:ss`, such as `2024-02-29 19:15:20`.

### 3.9 `Option` Single Select

Single select field, must configure the `OptionCode` property, i.e., the option set code.

When saving the value of a single select field, the actual transmission and storage are the codes of the option entries.

When fetching the value of a single select field through the API, it defaults to returning the format `[itemCode, itemName]`, i.e., returning both the code and name of the entry.

For configuration and usage of option sets, refer to the [Option Set](option) section.

### 3.10 `MultipleOption` Multi Select

The difference between multi-select fields and single select fields is that multi-select fields allow multiple selections from the same option set. When saving, a list of code strings for the selected options is passed, and in the database, the codes of multiple option entries are stored, separated by `,`.

When reading the value of a multi-select field through the API, it defaults to returning the format `[[itemCode, itemName], ...]`, i.e., the codes and names of multiple options.

### 3.11 `MultipleString` String List

Used to store multiple string values through a single field. In the program, it processes a string list object, and in the database, it is stored with `,` as the separator.

### 3.12 `JSON` JSON Field

JSON format field, generally used for storing JSON data and object conversion. When indexing and querying conditions for JSON data are required, manual processing is needed.

### 3.13 `Filter` Filter Condition Field

Used only for storing and converting filter condition objects, stored in the database as a string.

### 3.14 `OneToOne` One-to-One

Relational field, requires configuration of `relatedModel` and `relatedField` properties. The selected data is unique.

### 3.15 `ManyToOne` Many-to-One

Relational field, requires configuration of `relatedModel` and `relatedField` properties.

### 3.16 `OneToMany` One-to-Many

Data for the OneToMany field is generally added, edited, and deleted on the client side for a single piece of data by calling the model interface of the Many side.

For scenarios where multiple OneToMany field values are edited in batches:

(1) If the field value is `[]`, an empty list indicates the deletion of all historical records.

(2) When the field value is not empty, such as `[{...}, {...}]`, a list structure of Many side data, it automatically recognizes added, edited, and deleted records on the Many side and processes them accordingly.

### 3.17 `ManyToMany` Many-to-Many

(1) Updating `ManyToMany` Fields

In Create/Update scenarios, the values of ManyToMany fields are passed with a list of associated model IDs. For example, in an Update request:

```json
{
	"id": 12,
	"attendeeIds": [1, 2, 3]
}

(2) Cascading Search for ManyToMany Fields

Use case: Filter data in the current table through the filter conditions of the associated table field. Refer to the [Query Conditions](../../develop/query) section for details.
