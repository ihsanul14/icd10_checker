### Service For Authorization

-------

##### Config.js Documentation

Include environment configuration into coding

```javascript
require('dotenv').config();
```

Set configuration json for development, test and production connection database. 

| property           | Description                                 |
| ------------------ | ------------------------------------------- |
| username           | username from database server configuration |
| password           | password from database configuration        |
| database           | database name                               |
| host               | server host where the hosted database       |
| port               | port of database, have default port is 5432 |
| dialect            | connector database                          |
| dialectOptions     | database connection options                 |
| pool               | pool configuration                          |
| rejectUnauthorized | reject to connection if not authorized      |
| timezone           | timezone configuration                      |

For the configuration reference can check in google and search with keywords 

- best practice for connection database in node js
- detail of configuration database in node js
- other