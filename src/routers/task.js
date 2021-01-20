const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async(req, res) => {
  const task = new Task({
    ...req.body, 
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
});

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async(req, res) => {

  const match = {};
  const {completed, skip, limit, sortBy} = req.query;

  if(completed){
    match.completed = completed === 'true';
  }

  const sort = {};

  console.log(sortBy);

  if(sortBy){
    const parts = sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  console.log(sort);
  
  // const options = {};
    // if(limit) options.limit = parseInt(limit);
    // if(skip) options.skip = parseInt(skip);

  try {
    // const tasks = await Task.find({owner: req.user._id});
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        sort
      }
    }).execPopulate();
    // res.send(tasks);
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async(req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
    if(!task){
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e)
  }
});

router.patch('/tasks/:id', auth, async(req, res) => {
  const {params: {id}, body} = req;
  const updates = Object.keys(body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({error: 'invalid updates'});
  }

  try{
    // mongoose methods
    // const task = await Task.findByIdAndUpdate(id, body, {new: true, runValidators: true});

    //raw mongodb methods
    // const task = await Task.findById(id);
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

    updates.forEach((update) => task[update] = body[update]);

    await task.save();

    if(!task){
      res.status(404).send();
    }
    res.send(task);
  } catch(e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async(req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
    if(!task){
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send()
  }
});

module.exports = router;