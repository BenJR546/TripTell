const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });

    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
  
        // Redirect to the blog page after successful login
        res.redirect('/api/blog');
      });
  
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // userroute.js or a similar route file
  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.status(204).end(); // 204 No Content
    });
  });
  


  
module.exports = router;