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

  
let movies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Sup');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/:Title', (req, res) => {
    
    res.send('Successful GET movies by title');
  });
  
  app.get('/movies/genres/:Name', (req, res) => {
    
    res.send('Successful GET movies by name');
  });

  app.get('/movies/directors/:Name', (req, res) => {
    
    res.send('Successful GET directors by name');
  });

  app.post('/users', (req, res) => {
    
    res.send('posted users');
  });

  app.get('/users', (req, res) => {
    res.send('get users');
  });

  app.get('/users/:Username', (req, res) => {
    res.send('get username');
  });

  app.put('/users/:Username', (req, res) => {
    res.send('put username');
  });

  app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    res.send('post favourited movies');
  });

  app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    res.send('delete favourite movies');
  });

  app.delete('/users/:Username', (req, res) => {
    res.json(movies);
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