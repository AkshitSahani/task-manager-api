const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {sendWelcomeEmail, sendGoodbyeEmail} = require('../emails/account');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user);
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
    
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  };
});

router.post('/users/login', async(req, res) => {
  try{
    const {body: {email, password}} = req;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  }
  catch(e){
    res.status(400).send(e);
  }
})

router.post('/users/logout', auth, async(req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutall', auth, async(req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/users/me', auth, async(req, res) => {
  res.send(req.user);
});



// router.get('/users/:id', async(req, res) => {
//   const {id} = req.params;
//   try {
//     const user = await User.findById(id);
//     if(!user){
//       return res.status(404).send();
//     }      
//     res.send(user)
//   } catch (e) {
//     res.status(500).send()
//   }
// });

router.patch('/users/me', auth, async(req, res) => {
  const {user, body} = req;
  const updates = Object.keys(body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({error: 'invalid updates'})
  }

  try {
    //some mongoose functions bypass the mongoDB queries and hence will not be intercepted by middleware.
    //in those cases, you have to use default mongoDB queries:
      //Mongoose query (bypasses mongodb):
      // const user = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true,});

    //using only raw mongoDB queries: 
    updates.forEach((update) => user[update] = body[update]);

    await req.user.save(); 
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
});

router.delete('/users/me', auth, async(req, res) => {
  try {
    // old way before adding the /me to urls via authentication
    // const user = await User.findByIdAndDelete(req.params.id);
    // if(!user){
    //   return res.send(404).send();
    // }
    // res.send(user);
    await req.user.remove();
    sendGoodbyeEmail(req.user);
    // ^^ remove() is a built-in function within MongoDB.
     res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// avatars (file uploads)

const upload = multer({
  // to save files locally
  // however, that is not the best practice as you would lose the files during deployment
  // so we will store the file binary in the user model 
  // when you don't have a dest key, multer passes in the uploaded file to the next function
  // the file is then accessible in the next function via req.file
  // access the binary in the file via req.file.buffer
  
  // dest: 'avatars',
  //limit things
  limits: {
    //limit file size - in bytes
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('Please upload a .jpg, .png or .jpeg file'));
    }
    cb(undefined, true);
  }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
  try {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save()
    res.send();
  } catch (e) {
    res.status(500).send({error: e.message});
  }
  // you can add a 4th argument as a function to handle errors
  // function needs to have all 4 arguments to let express know its for error handling
}, (error, req, res, next) => {
  res.status(400).send({error: error.message});
})

router.delete('/users/me/avatar', auth, async(req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send()
  }
});

router.get('/users/me/avatar', auth, async(req, res) => {
  try {
    const {avatar} = req.user;
    if(!avatar){
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(avatar);
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router;