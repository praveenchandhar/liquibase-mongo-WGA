# MongoDB to Liquibase XML Converter - Developer Reference

## 📋 MongoDB Operations Support Matrix

| Command/Operation     | Reference Query                                                           | Supported |
|-----------------------|---------------------------------------------------------------------------|-----------|
| insertOne             | db.users.insertOne({name: "John", email: "john@example.com"})            | ✅ YES    |
| insertMany            | db.users.insertMany([{name: "John"}, {name: "Jane"}])                    | ✅ YES    |
| updateOne             | db.users.updateOne({_id: ObjectId("123")}, {$set: {age: 31}})            | ✅ YES    |
| updateMany            | db.users.updateMany({status: "pending"}, {$set: {status: "active"}})     | ✅ YES    |
| replaceOne            | db.users.replaceOne({_id: ObjectId("123")}, {name: "John Updated"})      | ✅ YES    |
| deleteOne             | db.users.deleteOne({email: "user@example.com"})                          | ✅ YES    |
| deleteMany            | db.users.deleteMany({status: "inactive"})                                | ✅ YES    |
| find                  | db.users.find({status: "active"})                                        | ✅ YES    |
| findOne               | db.users.findOne({email: "john@example.com"})                            | ✅ YES    |
| createIndex           | db.users.createIndex({email: 1}, {unique: true})                         | ✅ YES    |
| dropIndex (by name)   | db.users.dropIndex("email_index")                                        | ✅ YES    |
| dropIndex (by keys)   | db.users.dropIndex({email: 1})                                           | ✅ YES    |
| createCollection      | db.createCollection("users", {capped: true})                             | ✅ YES    |
| dropCollection        | db.users.drop()                                                           | ✅ YES    |
| getCollection         | db.getCollection("user-profiles").insertOne({name: "John"})              | ✅ YES    |

---

## ❌ Unsupported Operations

| Command/Operation        | Reference Query                                                        | Supported |
|--------------------------|------------------------------------------------------------------------|-----------|
| findOneAndUpdate         | db.users.findOneAndUpdate({email: "john@example.com"}, {$set: {age: 31}}) | ❌ NO     |
| findOneAndDelete         | db.users.findOneAndDelete({email: "john@example.com"})                | ❌ NO     |
| findOneAndReplace        | db.users.findOneAndReplace({_id: ObjectId("123")}, {name: "New"})     | ❌ NO     |
| aggregate                | db.users.aggregate([{$match: {status: "active"}}])                    | ❌ NO     |
| distinct                 | db.users.distinct("department")                                        | ❌ NO     |
| count                    | db.users.count({status: "active"})                                    | ❌ NO     |
| countDocuments           | db.users.countDocuments({status: "active"})                           | ❌ NO     |
| estimatedDocumentCount   | db.users.estimatedDocumentCount()                                     | ❌ NO     |
| bulkWrite                | db.users.bulkWrite([{insertOne: {document: {name: "John"}}}])          | ❌ NO     |
| watch                    | db.users.watch()                                                       | ❌ NO     |
| mapReduce                | db.users.mapReduce(mapFunc, reduceFunc)                               | ❌ NO     |

---

## ⚠️ Deprecated Operations

| Command/Operation | Reference Query                                              | Supported |
|-------------------|--------------------------------------------------------------|-----------|
| save              | db.users.save({_id: ObjectId("123"), name: "John"})         | ❌ NO     |
| insert            | db.users.insert({name: "John", email: "john@example.com"})  | ❌ NO     |
| remove            | db.users.remove({status: "inactive"})                       | ❌ NO     |
| update            | db.users.update({status: "pending"}, {$set: {status: "active"}}, {multi: true}) | ❌ NO |
| ensureIndex       | db.users.ensureIndex({email: 1})                            | ❌ NO     |

---

## 🚫 Unsupported JavaScript Features

| Feature              | Reference Query                                           | Supported |
|----------------------|-----------------------------------------------------------|-----------|
| Variables            | const user = {name: "John"}; db.users.insertOne(user)    | ❌ NO     |
| Functions            | function createUser() {...}; db.users.insertOne(createUser()) | ❌ NO     |
| Loops                | for(let i=0; i<5; i++) {db.users.insertOne({name: `User${i}`})} | ❌ NO     |
| Conditionals         | if(condition) {db.users.insertOne({name: "John"})}       | ❌ NO     |
| Dynamic Collections  | const col = "users"; db[col].insertOne({name: "John"})    | ❌ NO     |
| Imports/Requires     | const moment = require('moment')                          | ❌ NO     |

---

## 📝 Context Declaration

| Context Format    | Reference Query                                | Supported |
|-------------------|------------------------------------------------|-----------|
| Line Comment      | // context: dev                                | ✅ YES    |
| Block Comment     | /* context: production */                      | ✅ YES    |
| Database Comment  | // DATABASE: staging                           | ✅ YES    |

---

## 📖 Sample Queries for Copy-Paste

### Read Operations
```javascript
// context: dev

// Find multiple documents
db.users.find({
  status: "active",
  age: {$gte: 18}
});

// Find with projection
db.users.find(
  {status: "active"},
  {name: 1, email: 1, _id: 0}
);

// Find single document
db.users.findOne({email: "john@example.com"});

// Find with sorting and limit
db.users.find({status: "active"}).sort({createdAt: -1}).limit(10);
```

### Insert Operations
```javascript
// Insert single document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  status: "active"
});

// Insert multiple documents
db.users.insertMany([
  {name: "John", email: "john@example.com"},
  {name: "Jane", email: "jane@example.com"}
]);
```

### Update Operations
```javascript
// Update single document
db.users.updateOne(
  {email: "john@example.com"},
  {$set: {age: 31, lastLogin: new Date()}}
);

// Update multiple documents
db.users.updateMany(
  {status: "pending"},
  {$set: {status: "active"}}
);

// Replace entire document
db.users.replaceOne(
  {email: "john@example.com"},
  {name: "John Updated", email: "john@example.com", age: 32}
);
```

### Delete Operations
```javascript
// Delete single document
db.users.deleteOne({email: "user@example.com"});

// Delete multiple documents
db.users.deleteMany({status: "inactive"});
```

### Index Operations
```javascript
// Create index
db.users.createIndex(
  {email: 1, status: 1},
  {unique: true, name: "email_status_idx"}
);

// Drop index by name
db.users.dropIndex("email_status_idx");

// Drop index by specification
db.users.dropIndex({email: 1, status: 1});
```

### Collection Operations
```javascript
// Create collection
db.createCollection("audit_logs", {
  capped: true,
  size: 1048576
});

// Drop collection
db.old_users.drop();

// Alternative drop syntax
db.dropCollection("old_users");

// Access collection with special characters
db.getCollection("user-profiles").insertOne({
  userId: "12345",
  name: "John Doe"
});
```

---

**📊 Summary Statistics:**
- ✅ **15 Supported Operations** - CRUD, read operations, and collection management
- ❌ **16 Unsupported Operations** - Complex operations and deprecated methods  
- ❌ **6 Unsupported JavaScript Features** - Dynamic code execution

**🔑 Key Rule:** Static MongoDB operations are supported including read operations. No variables, functions, or dynamic code execution.
