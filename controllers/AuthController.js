const dbConfig = require('../config/database')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const pool = mysql.createPool(dbConfig)
const {
    responseAuthSuccess,
    responseFailValidate
} = require('../traits/ApiResponse')

const { connect, use } = require('../routes/book')
// const { Connection } = require('mysql2/typings/mysql/lib/Connection')

pool.on('error', (err) => {
    console.error(err)
})

const accessTokenSecret = '2023-WikramA-exp'

const register = (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    pool.getConnection((err, connect) => {
        if(err) throw err

        
    })

    if(data.email == null || data.username == null || data.password == null) {
        responseFailValidate(res, 'Email/Username/Password wajib diisi!')
    } else {
        const query = 'INSERT INTO userss SET ?'
        const query2 =  `SELECT * FROM userss WHERE email='${data.email}' OR username='${data.username}'`

        pool.getConnection(async (err, Connection) => {
            if(err) throw err

            var  checkUnique = new Promise((resolve) => {
                Connection.query(query2, (err, results) => {

                if(err) throw err 

                if(results.length > 0) {
                    res.status(403).json({
                        message: 'Email/Username sudah digunakan'
                    })
                } else {
                    resolve()
                }
            })
            
        })

        await checkUnique.then(()=> {
            Connection.query(query, [data], (err,results) => {
                if(err) throw err 
                
                if(results.affectedRows >= 1) {
                    const token = jwt.sign({
                        email: data.email,
                        username: data.username,

                    }, accessTokenSecret)

                    responseAuthSuccess(res, token, 'Register successfully', {
                        email: data.email,
                        username: data.username,
                    })
                } else {
                    res.status(500).json({
                        message: 'Failed creating user'
                    })
                }
                
            })
        })
            Connection.release()
        })
    }
}

const login = ((req, res) => {
    const {email, password} = req.body

    if( email == null || password == null) {
        responseFailValidate(res, 'Email/Password wajib diisi!')
    } else {
        const query = `SELECT * FROM userss WHERE email = '${email}' AND password = '${password}'`

        pool.getConnection((err, Connection) => {
            if(err) throw err

            //eksekusi query login
            Connection.query(query, (err, results) => {
                if(err) throw err

                if(results.length >= 1) {
                    const user = results.pop()

                    const token = jwt.sign (
                        {
                            email: user.email,
                            username: user.username
                        },
                        accessTokenSecret
                    )

                    responseAuthSuccess(res, token, 'Login successfuly', {
                        email: user.email,
                        username: user.username
                    })

                    return
                }
                res.status(404).json({
                    message: 'Email or Password wrong'
                })
            })

            Connection.release()
        })
    }
})

module.exports = {
    register,
    login
}