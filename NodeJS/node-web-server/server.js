const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
//takes the directory you want to use for all your handlebar files
app.set('view engine', 'hbs')


app.use((req, res, next) => {
    var now = new Date().toString();//toString is a formatting thing to make it human readable
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});
//app.use is how u register middleware

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//down below sets up handler to get a http get request
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!<h1>');
    // res.send({
    //     name: 'Andfrew',
    //     likes: [
    //         'asdf0',
    //         'asdfghjk'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to this website',

    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Page'
    });
});



app.listen(3000, () => {
    console.log('server is up on port 3000');
    
});
