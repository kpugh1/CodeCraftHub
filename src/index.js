const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser'); 
const app = express();
const handlebarsEngine = expressHandlebars.engine();
//Connect to MongoDB
connectDB();

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
//Routes
app.use('/users', userRoutes);

//Add static files
app.use(express.static('public'));
//Views
app.engine('handlebars', handlebarsEngine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

//Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});