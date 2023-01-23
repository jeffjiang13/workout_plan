const express = require('express');
const mongoose = require('mongoose');
const Exercise = require('./models/exercise');
const path = require('path');
const WorkoutPlan = require('./models/workoutplan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1/fitness-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the fitness app!');

});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

app.use(express.static(path.join(__dirname, 'client/workout_plan/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/workout_plan/build/index.html'));
});


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const session = require('express-session');

app.use(session({
  secret: 'yoursecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken')



process.env.JWT_SECRET = 'your_secret_key';

app.use(expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/login', '/signup'] }))


app.get('/exercises', (req, res) => {
  const { muscleGroup } = req.query;
  let filter = {};
  if (muscleGroup) {
    filter = { muscles: { $in: [muscleGroup] } };
  }
  Exercise.find(filter)
    .then(exercises => res.json(exercises))
    .catch(err => res.json(err));
});

app.post('/exercises', (req, res) => {
  const exercise = new Exercise(req.body);
  exercise.save()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.put('/exercises/:id', (req, res) => {
  Exercise.findByIdAndUpdate(req.params.id, {
    $push: {
      exercises: req.
        body
    }
  }, { new: true })
    .then(exercise => res.json(exercise))
    .catch(err => res.json(err));
  res.json(req.body);
});

app.delete('/exercises/:id', (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.json(err));
});

app.get('/exercises/range', (req, res) => {
  Exercise.find({})
    .then(exercises => res.json(exercises))
    .catch(err => res.json(err));
});

app.post('/workoutplans', (req, res) => {
  const workoutplan = new WorkoutPlan(req.body);
  workoutplan.save()
    .then(data => {
      User.findByIdAndUpdate(req.user._id, { $push: { workoutplans: data._id } }, { new: true })
        .then(user => res.json(user));
    })
    .catch(err => res.json(err));
});
app.put('/workoutplans/:id', (req, res) => {
  WorkoutPlan.findByIdAndUpdate(req.params.id, {
    $push: {
      exercises:
        req.body
    }
  }, { new: true })
    .then(workoutplan => res.json(workoutplan))
    .catch(err => res.json(err));
  res.json(req.body);
});

app.delete('/workoutplans/:id', (req, res) => {
  WorkoutPlan.findByIdAndDelete(req.params.id)
    .then(workoutplan => res.json(workoutplan))
    .catch(err => res.json(err));
  res.json(req.body);
});

app.get('/workoutplans', (req, res) => {
  WorkoutPlan.find()
    .then(workoutplans => res.json(workoutplans))
    .catch(err => res.json(err));
});
app.get('/workoutplans/range', (req, res) => {
  WorkoutPlan.find({})
    .then(workoutplans => res.json(workoutplans))
    .catch(err => res.json(err));
  res.json(workoutplans);
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Validate the input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email is already in use
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking email in use' });
    }
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // Create the new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });

      newUser.save((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving new user' });
        }

        // Authenticate the user
        req.login(newUser, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error logging in new user' });
          }
          return res.json({ message: 'Registration successful' });
        });
      });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verify that the request contains a valid email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Look up the user in the database using the provided email
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }

    // If the user doesn't exist, return a 401 Unauthorized error
    if (!user) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }
    // Use bcrypt's compare method to check if the provided password matches the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json(err);
      }
      // If the passwords don't match, return a 401 Unauthorized error
      if (!isMatch) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }

      // If the passwords match, create a JWT token and return it in the response
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    });
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
  res.status(200).send('Logged out');
});

app.put('/workoutplans/:id/share', (req, res) => {
  WorkoutPlan.findByIdAndUpdate(req.params.id, { $push: { shared: req.body.userId } }, { new: true })
    .then(workoutplan => res.json(workoutplan))
    .catch(err => res.json(err));
});
