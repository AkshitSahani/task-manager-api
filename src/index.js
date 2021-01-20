const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port  = process.env.PORT;

//write your own middleware
// app.use((req, res, next) => {
//   // console.log(req.method, req.path);
//   res.status(503).send('Server Maintenance')
// })

app.use(express.json());
app.use([userRouter, taskRouter]);

app.listen(port, () => {
  console.log("server is up on port" + port);
})

// const bcrypt = require('bcryptjs');

// const myFunction = async() => {
//   const password = 'Red12345!';
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log(isMatch);
// }

// myFunction();

// const jwt = require('jsonwebtoken');

// const myFunction = async() => {
//   const token = jwt.sign({_id: '123abc'}, 'signingkey', {expiresIn: '7 days'});

//   const data = jwt.verify(token, 'signingkey');
//   console.log(data);
// }

// myFunction();

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async() => {
//   // const task = await Task.findById('5ffe7ed72ec59a4d5640d393');
//   // await task.populate('owner').execPopulate();
//   // console.log(task.owner);

//   // const user = await User.findById('5ffe7e10f68cec4d2679d011');
//   // await user.populate('tasks').execPopulate();
//   // console.log(user.tasks);
// }

// main();