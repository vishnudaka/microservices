
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const compression = require('compression');

const port = process.env.PORT || 3000;
const mode = process.env.MODE || 'development';
const chalk = require('chalk');

const userRoute = require('./routes/user.route');



app.use(compression());

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/microServices')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use('/api', userRoute);


app.listen(port, () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), port, mode);
    console.log('  Press CTRL-C to stop\n');
});