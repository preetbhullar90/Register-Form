const router = require('express').Router();


router.get('/confirm/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the user by the confirmation token
        const user = await User.findOne({ confirmationToken: token });

        if (!user) {
            return res.status(404).json({ message: 'Confirmation token not found.' });
        }

        // Mark the email as confirmed
        user.isConfirmed = true;
        user.confirmationToken = undefined;
        await user.save();

        return res.status(200).json({ message: 'Email confirmed successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});