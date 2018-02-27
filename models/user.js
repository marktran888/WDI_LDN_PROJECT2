const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});
// add user to admin group on database
// db.users.update({ username: 'admin' }, { $set: { admin: 'True' } })

// set up the passwordConfirmation virtual
schema
  .virtual('passwordConfirmation') //not in model that needs to be saved in DB but still need access - so use virtual
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // store the password on the user model temporarily so we can access it in our pre-validate hook
    // `this` refers to the user object
    this._passwordConfirmation = passwordConfirmation; // _ reminds us its temporary
  });

// set up a pre-validate hook
schema.pre('validate', function checkPassword(next) {
  // check if the password has been modified and if so whether the password and the passwordConfirmation match
  // if not invalidate the passwordConfirmation, so that the validations fail
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue to the next step (validation)
  next();
});

schema.pre('save', function hashPassword(next) {
  // if the password has been modified, it needs to be hashed
  if(this.isModified('password')) {
    // hash the password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // continue to the next step (save)
  next();
});

schema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
