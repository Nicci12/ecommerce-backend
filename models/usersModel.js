const User = require("../schemas/userSchema"); 


async function getUserByEmailModel(email) {
  try {
      const user = await User.findOne({ email: email });
      return user;
  } catch (err) {
      console.log(err);
  }
}


async function signUpModel(newUser) {
  try {
    const user = new User(newUser);
     user.save();
    const id = user._id;
    return id;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {signUpModel, getUserByEmailModel };
