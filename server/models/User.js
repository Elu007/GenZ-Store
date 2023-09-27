const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// User Module
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// We are hashing the password
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      // Validate input (e.g., minimum password length)
      if (this.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      // Generate a unique salt
      const salt = await bcrypt.genSalt(12);

      // Hash the password with the generated salt
      this.password = await bcrypt.hash(this.password, salt);
      this.cpassword = await bcrypt.hash(this.cpassword, salt);
    }
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware or handler
  }
});

// We are generating token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
