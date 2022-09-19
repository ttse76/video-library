const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
}, { collection: 'users' });

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async (password) => {
  try{
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }catch(err){
    return false;
  }
};

userSchema.query.byUsername = function (username) {
  return this.findOne({ username: username });
};

module.exports = mongoose.model('user', userSchema);