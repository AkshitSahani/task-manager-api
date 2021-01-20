require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5fd02252b96e4809fc9b783d')
//   .then((message) => {
//     console.log(message);
//     return Task.countDocuments({completed: false})
//   })
//   .then((count) => console.log(`${count} tasks incomplete!`))
//   .catch(e => console.log(e))


const deleteAndCount = async(id, countCondition) => {
  try {
    const user = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments(countCondition);
    console.log('count', count);

  } catch (e) {
    console.log('errorrrrrr', e);
  }
}

deleteAndCount('5fcab576e673746a0e962881', {completed: false});