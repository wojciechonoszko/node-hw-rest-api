const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const { SchemaTypes, model } = mongoose;


const Schema = mongoose.Schema;

const userSchema = new Schema({
      password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      },
      avatarURL: {
        type: String,
        required: [true, "Avatar is required"],
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
});

userSchema.methods.setPassword = async function (password) {
    this.password = await bCrypt.hash(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validatePassword = function (password) {
    return bCrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema, "users");

module.exports = User;

