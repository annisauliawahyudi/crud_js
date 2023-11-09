const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')
const { query } = require('express')
const pool = mysql.createPool(dbConfig)

const getUsers = (req, res) => {
    const query = "SELECT * FROM users"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'User successfully fetched')
        })

        connection.release()
    })
}

const getUser = ( (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM users WHERE id=${id}`

    pool.getConnection( (err, connection) => {
        if(err) throw err

        connection.query( query, (err, results) => {
            if(err) throw err

            if (results.length == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'User successfully fetched')
        })

        connection.release()
    })
})

const addUser = (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        social_media: req.body.social_media,  
        address: req.body.address 
    }

    const query = 'INSERT INTO users SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'User successfully fetched')
        })

        connection.release()
    })
}

const updateUser = (req, res) => {
    const id = req.params.id 

    const data = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        social_media: req.body.social_media,   
        address: req.body.address 
    }

    const query = `UPDATE users SET ? WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'User successfully updated')
        })

        connection.release()
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM users WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'User successfully deleted')
        })

        connection.release()
    })
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}
