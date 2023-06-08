require('dotenv').config();no
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const ejs = require('ejs');

// mysql pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'nuraykutlu',
    password: process.env.PASSWORD,
    database: 'to_do'
});
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// handle root route
app.get('/', (req, res) => {
    pool.query('SELECT * FROM todo', (err,results) =>{
        if(err) throw err;
        res.render('index', {todos: results});
    })
//the fact that i can just say __dirname is a blessing lol
});

// start da server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

//endpoint to add a new item to the to-do list:
app.post('/todo', (req, res) => {
    const { item } = req.body; // sending a JSON object with an "item" property
    pool.query('INSERT INTO todo (item) VALUES (?)', [item], (err, results) => {
      if (err) throw err;
      res.json({ success: true });
    });
  });

//endpoint to delete:
app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM todo WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      res.json({ success: true });
    });
});

//the buttons and the event listeners had to be added to 
//a seperate js file since it had "document" in there which only works 
//on the browser and the port will not start listening due to
//an error it gives when it sees the word document *-*