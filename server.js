require('dotenv').config();

const express = require('express') 
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))



const mongoDB = process.env.DATABASE_URL;


//Import the mongoose module
let mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
let db = mongoose.connection;

//Show success message upon connecting to database
db.once('open', _ => {
  console.log('Database connected:', mongoDB)
});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
}); 
*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); 
*/



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)


