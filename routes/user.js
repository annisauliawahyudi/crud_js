const express = require('express')
const router = express.Router()
const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/UserController')


// route untuk menampilkan data 
router.get('/', getUsers)


// route untuk mengirim data    
router.post('/', addUser)

// route untuk menampilkan data beradasarkan id buku
router.get('/:id', getUser)

// route untuk memperbarui / update berdasarkan id buku
router.put('/:id', updateUser)


// route untuk menghapus data
router.delete('/:id', deleteUser)

module.exports = router