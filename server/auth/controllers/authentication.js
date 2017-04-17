const jwt = require('jwt-simple');
const User = require('../handleUser');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, type: user.type }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has been authenticated, send back token
  console.log('is signin reached?')
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.firstName + ' ' + req.body.lastName;
  const type = req.body.type
  console.log(email, password, name, type);

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  const doesUserExist = User.doesUserAlreadyExist(email, password);

  // if true, send an error
  if (doesUserExist) {
    return res.state(422).send({ error: 'Email is in use'});
  }

  user = User.createUser(email, password, name);
  console.log('user is being sent:', user)
  // Respond to request indicating the user was created
  res.json({ token: tokenForUser(user) });

}

exports.mentor_profile_activation = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.firstName + ' ' + req.body.lastName;

  // need to have support for role, location, image for a mentor
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with email exists
  const doesUserExist = User.checkUsernameInDb(email, password);

  if (doesUserExist) {
    return res.state(422).send({ error: 'Email is in use'});
  }

  // create mentor with role, location, image for a mentor

}