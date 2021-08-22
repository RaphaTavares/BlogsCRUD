const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes');
const app = express()

//connection string MongoDB
const dbURI = '{CONNECTION_STRING}'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(3000)
        console.log('SERVER LISTENING ON PORT 3000')
        console.log('SERVER CONNECTED TO DB')
    })
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.use('/blogs', blogRoutes)

app.get('/about-us', (req, res) =>{
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).render('404', {title: 'not found'})
})