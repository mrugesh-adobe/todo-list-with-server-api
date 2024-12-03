const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo');
const todoSSARoutes = require('./routes/todo-ssapi');
const sapRoutes = require('./routes/sap');
const deleteRoutes = require('./routes/delete');
const cors = require('cors');

const app = express();
app.use(cors());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming requests with JSON payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Routes
app.use('/todo', todoRoutes);

app.use('/todo-ssa', todoSSARoutes)
app.use('/sap', sapRoutes);
app.use('/delete', deleteRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/todo');
});

// SAP route
app.get('/sap', (req, res) => {
  res.render('sap');
});

// SAP route
app.get('/delete', (req, res) => {
  res.render('delete');
});

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
