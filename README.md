
# E-commerce Database Schema Flowchart

## Tables

### Users

- **id**: INTEGER (Primary Key)
- **username**: TEXT (Unique, Not Null)
- **password**: TEXT (Not Null)

### Products

- **id**: INTEGER (Primary Key)
- **image**: TEXT (Not Null)
- **title**: TEXT (Not Null)
- **description**: TEXT
- **price**: REAL (Not Null)
- **category**: TEXT
- **date_of_posting**: TEXT (Default: Current Timestamp)

### Cart

- **id**: INTEGER (Primary Key)
- **user_id**: INTEGER (Foreign Key referencing Users.id, Not Null)
- **product_id**: INTEGER (Foreign Key referencing Products.id, Not Null)
- **quantity**: INTEGER (Not Null)

### Reviews

- **id**: INTEGER (Primary Key)
- **user_id**: INTEGER (Foreign Key referencing Users.id, Not Null)
- **product_id**: INTEGER (Foreign Key referencing Products.id, Not Null)
- **rating**: INTEGER (Not Null)
- **comment**: TEXT
- **date_of_review**: TEXT (Default: Current Timestamp)

## Relationships

- **Users**:
  - One-to-Many with **Cart**
  - One-to-Many with **Reviews**
  
- **Products**:
  - One-to-Many with **Cart**
  - One-to-Many with **Reviews**

- **Cart**:
  - Many-to-One with **Users**
  - Many-to-One with **Products**

- **Reviews**:
  - Many-to-One with **Users**
  - Many-to-One with **Products**