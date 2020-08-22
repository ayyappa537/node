const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require("joi");
const logger = require("./middleware/logger");
const authenticate = require('./middleware/authentication');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

console.log(`NODE_ENV:${process.env.NODE_ENV}`);// export NODE_ENV = production/development/testing
console.log(`app:${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan Enabled......');
}

//Configuration
console.log("Application Name : "+ config.get('name'));
console.log("Mail Server : "+ config.get('mail.host'));
console.log("Mail Password : "+ config.get('mail.password'));

app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to Dynamic port ${port}...`));