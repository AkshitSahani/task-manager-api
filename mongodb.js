// CRUD create read update delete

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (e, client) => {
    
    if(e){
        return console.log('unable to connect to database');
    }
    
    console.log('database connected');
    
    const db = client.db(databaseName);
    
    //CREATE ENTRIES
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Josh',
    //     age: 21
    // }, (error, result) => {
    //     if(error) return console.log('unable to insert user');
    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Shivika', age: 28,
    //     },
    //     {
    //         name: 'Stephanie', age: 200
    //     }
    // ], (error, result) => {
    //     if(error) return console.log('unable to insert documents')
    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'one', completed: true
    //     },
    //     {
    //         description: 'two', completed: true
    //     },
    //     {
    //         description: 'three', completed: false
    //     },
    // ], (error, result) => {
    //     if(error) return console.log('unable to add entries to tasks collection');
    //     console.log(result.ops);
    // })

    //READ ENTRIES

    // db.collection('users').findOne({_id: new ObjectID("5fca9448d784e76438a301fe")}, (error, user) => {
    //     if(error) console.log('unable to fetch user');

    //     console.log(user);
    // })

    // db.collection('users').find({age: 27}).toArray((error, users)=>{
    //     console.log(users);
    // });

    // db.collection('tasks').findOne({_id: new ObjectID("5fc8669dad88f47b3bdddda6")}, (e, res) => {
    //     console.log(res);
    // });

    // db.collection('tasks').find({completed: false}).toArray((e, res) => {
    //     console.log(res);
    // });

    //UPDATE ENTRIES

    // db.collection('users').updateOne({
    //     name: 'Shivika'
    // }, {
    //     $set: {
    //         age: 27
    //     }
    //     // $inc: {
    //     //     age: 10
    //     // }
    // })
    //     .then((res) => console.log(res))
    //     .catch((e) => console.log(e))

    // db.collection('tasks').updateMany({
    //     completed: false,
    // }, { 
    //     $set: {
    //         completed: true
    //     }

    // })
    //     .then(res => console.log(res))
    //     .catch(e => console.log(e)) 

    //DELETE ENTRIES

    // db.collection('users').deleteMany({
    //     age: 27
    // })
    //     .then((res) => console.log(res))
    //     .catch((e) => console.log(e))

    // db.collection('tasks').deleteOne({
    //     description: 'two'
    // })
    //     .then((res) => console.log(res))
    //     .catch((e) => console.log(e))
});