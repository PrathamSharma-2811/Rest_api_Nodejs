// decison making only controllers are used (functions)

const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

 // contains request from user, response from backend , next that is what to do when middle ware is executed
//  async function signUp(req,res){

//     res.send('Mereko cal kiya');
//  }

// async function login(req,res){
//     res.send('Mereke call aaya');
// }


// using arrow functions

const signUp = async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile,
            isAdmin: req.body.isAdmin || true
        });
 
        const newUser = await user.save();
        res.status(201).json({message: 'User Registration Successful!', data: newUser});
 
    }catch(err) {
        res.status(400).json({message: err.message});
    }
}
 
const login = async (req, res) => {
    try {
        const loginEmail = req.body.email;
        const loginPassword = req.body.password;
 
        // Check if user exists
        const user = await User.findOne({ email: loginEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up." });
        }
 
        // Check if password matches
        const isMatch = await bcrypt.compare(loginPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password." });
        }
 
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, isAdmin:user.isAdmin},
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        // const uid = user.id
        // If user exists and password matches
        res.status(200).json({ message: "Login successful", token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
 
 
const details = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Remove the password from the user object
        const { password, ...others } = user._doc;
        res.status(200).json({ message: 'User details fetched successfully', data: others });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 
const updateDetails = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {new: true});
        res.status(200).json({message: 'User Details Updated', data: user});
    }catch(err) {
        res.status(400).json({message: err.message});
    }
}
 
const deleteUser = async(req, res) => {
    const usid = req.params.id;
    try{
        const user = await User.findById(usid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            await User.findByIdAndDelete(usid);

        res.status(200).json({message: 'User Deleted', data: user});
    }
}
catch(err) {
        res.status(400).json({message: err.message});
    }
}
 
 
module.exports = {
    signUp,
    login,
    details,
    updateDetails,
    deleteUser
}