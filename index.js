const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');

morgan = require('morgan');

const app = express();

app.use(morgan('common'));

// Logger
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
  };
  
  app.use(myLogger);

  

// GET requests
app.get('/', (req, res) => {
  res.send('Sup');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
      res.status(201).json(movies);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
});

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
      res.status(201).json(movie);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
      });
});
  
app.get('/movies/genres/:Name',  (req, res) => {
  Movies.findOne({Name: req.params.Name})
  .then((movies) => {
    res.status(201).json(movies);
})
.catch((err) => {
  console.error(err);
  res.status(500).send("Error: " + err);
});
});


app.get('/movies/directors/:Name',  (req, res) => {
  Movies.findOne({Name: req.params.Name})
  .then((movies) => {
    res.status(201).json(movies);
})
.catch((err) => {
  console.error(err);
  res.status(500).send("Error: " + err);
});
});


  


app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
      res.status(201).json(users);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
});



app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
      res.json(user);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
});

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
  { $set:
      {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birth: req.body.Birth
      }
  },
  { new: true }, // This line makes sure the udpated document is returned
  (err, updatedUser) => {
      if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
      } else {
          res.json(updatedUser);
      }
  });
});

app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
  { $push: { FavoriteMovies: req.params.MovieID }},
  { new: true },
  (err, updatedUser) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
      } else {
          res.json(updatedUser);
      }
  });
});

app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
  { $pull: { FavoriteMovies: req.params.MovieID }},
  { new: true },
  (err, updatedUser) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
      } else {
          res.json(updatedUser);
      }
  });
});

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
      if (!user) {
          res.status(400).send(req.params.Username + ' was not found.');
      } else {
          res.status(200).send(req.params.Username + ' was deleted.');
      }
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
});

app.use(express.static('public'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});