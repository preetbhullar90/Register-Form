const router = require('express').Router();
const {User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const transporter = require('../emailConfig');



router.post('/', async(req,res)=>{


    try{




        const { email } = req.body;

        // Generate a unique confirmation token
        const confirmationToken = uuid.v4();

    

     
    
      
    

        const {error}= validate(req.body);
        if (error)
        return res.status(400).send({message:error.details[0].message})

        const user = await User.findOne({email:req.body.email});


        if(user)
        return res.status(409).send({message: 'User with given email already exist'})
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password,salt)

        await new User({...req.body,
            email,
            password:hashPassword,
            confirmationToken,
            isConfirmed:true,
            }).save();

        // Send a confirmation email
        const confirmationLink = `${process.env.CLIENT_URL}/confirm/${confirmationToken}`;
        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Confirm Your Email Address',
            html: `Click the following link to confirm your email address: <a href="${confirmationLink}">${confirmationLink}</a>`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Registration successful. Please check your email for confirmation.' });

        

    }catch(error){
        res.status(500).send({ message: 'Internal Server Error', error });
    }
})
module.exports = router;