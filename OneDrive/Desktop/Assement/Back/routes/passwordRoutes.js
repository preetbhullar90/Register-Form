const router = require('express').Router();
const {User} = require("../models/user");
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try {
      const { error } = validateChangePassword(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });
  
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).send({ message: 'Invalid Email' });
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(401).send({ message: 'Invalid Password' });
  
      const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
      user.password = newPasswordHash;
      await user.save();
  
      res.status(200).send({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

  const validateChangePassword = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Old Password'),
      newPassword: Joi.string().required().label('New Password'),
    });
    return schema.validate(data);
  };
  
  module.exports = router;