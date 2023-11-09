const express = require('express')
const router = express.Router()
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
} = require('../controllers/BookController')


// route untuk menampilkan data 
router.get('/', getBooks)


// route untuk mengirim data    
router.post('/', addBook)

// route untuk menampilkan data beradasarkan id buku
router.get('/:id', getBook)

// route untuk memperbarui / update berdasarkan id buku
router.put('/:id', updateBook)


// route untuk menghapus data
router.delete('/:id', deleteBook)

module.exports = router