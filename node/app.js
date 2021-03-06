const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', { text: 'Homepage'})
})

app.get('/profile', (req, res) => {
    res.render('profile', { text: 'Profile'})
})

app.get('/forums', (req, res) => {
    res.render('forums', { text: 'forums'})
})

app.get('/message', (req, res) => {
    res.render('message', { text: 'Message'})
})


app.listen(port, () => console.info(`Listening on port ${port}`))
