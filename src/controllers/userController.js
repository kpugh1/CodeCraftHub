const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// async function checkUserExist  ( username ) {
//     return await User.findOne({ username });
// };

//User registration
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        //Check if the username already exists
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(409).json({ message: 'Username already exists'});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create a new user
        const newUser = new User({ username, password: hashedPassword});
        await newUser.save();
     
        return res.status(201).json({ message: 'User registered successfully'});
    }catch(error) {
        return res.status(500).json({ message: `Internal server error: ${error}`});
    };
}

//User login
exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username exists
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JSON Web Token (JWT)
      const token = jwt.sign({ username: existingUser.username }, '2c1d1010d8e7d8915db7619e076146475527b8a0cec314b045c18d7ea93f7b04', { expiresIn: '1h' });
  
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


//User profile management
exports.updateUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername } = req.body;

        //Update the user's username
        await User.updateOne({ username }, { username: newUsername });
        return res.status(200).json({ message: 'User profile updated successfully' });
    }catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};