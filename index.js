const express = require('express')
const mysql = require('mysql2')
const bookRoute = require('./routes/book')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const dbConfig = require('./config/database')
const pool = mysql.createPool(dbConfig)
const authenticateJWT = require('./middleware/auth')
const cors = require('cors')

pool.on('error', (err) => {
    console.log(err);
})


const app = express()
const PORT = 1002

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// membuat parameter harus diawali dengan ( : )
app.get('/contohparameter/:username/:jurusan/:kelas', (req, res) => {
    res.json(req.params)
})

app.get('/contohparam', (req, res) => {
    res.json(req.query)
})

app.get('/', (req, res) => {
    res.write('hello world')
    res.end()

    koneksi.connect(function(err){
    if(err) {
        console.log('Database connection failed: ' + err);
    } else {
        
    }
})
})

app.use('/auth', authRoute)
app.use('/book', authenticateJWT, bookRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`server berjalan di http://localhost:${PORT}`);
})