const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});



// const me = new User({name: ' Akshit  ', email: ' MYEMAIL@X.COM', password: 'abcdefgh'});

// me.save()
//     .then((res) => console.log(res))
//     .catch(e => console.log(e))

// const taskOne = new Task({description: ''});

// taskOne.save()
//     .then(res => console.log(res))
//     .catch(e => console.log(e))