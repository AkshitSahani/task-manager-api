require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findById('5fcab813ad95856a6be5dcc7')
//   .then((user) => {
//     return User.find({age: user.age}).countDocuments();
//   })
//   .then(count => console.log('count---', count))
//   .catch(e => console.log(e))

// User.findByIdAndUpdate('5fcab813ad95856a6be5dcc7', {age: 1})
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1});
//   })
//   .then(count => console.log('count---', count))
//   .catch(e => console.log(e))

const updateAgeAndCount = async(id, age) => {
  try {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    console.log('count', count);
    return count;
    
  } catch (error) {
    console.log('error in the building', error);
  }
}

updateAgeAndCount('5fcab813ad95856a6be5dcc7', 1);