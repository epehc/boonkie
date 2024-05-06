const express = require("express")
const axios = require("axios")
const router = express.Router()


const BOOKMONKEY_API_URL = "http://localhost:4730"

//Route to get all books
router.get("/books", async (req, res) => {
    try {
        const response = await axios.get(`${BOOKMONKEY_API_URL}/books`)
        res.json(response.data)
    }catch (error){
        res.status(500).json({message: "Failed to retrieve books", error: error.message})
    }
})

//Route to get a specific book based on the ISBN
router.get("/books/:isbn", async (req, res) => {
    try{
        const response = await axios.get(`${BOOKMONKEY_API_URL}/books/${req.params.isbn}`)
        res.json(response.data)
    }catch (error){
        res.status(500).json({message: "Failed to retrieve book with specified isbn", error: error.message})
    }
})

//Route to delete a book based on the ISBN
router.delete("books/:isbn", async (req, res) =>{
    try{
        const response = await axios.delete(`${BOOKMONKEY_API_URL}/books/${req.params.isbn}`)
        res.json("Book deleted successfully")
    } catch (error){
        res.status(500).json({message: "An error was encountered deleting the specified book", error:error.message})
    }
})

//Route to create a new book
router.post("/books", async (req, res) => {
    try {
        const newBook = req.body;
        const response = await axios.post(`${BOOKMONKEY_API_URL}/books`, newBook);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: "Failed to create new book", error: error.message});
    }
});

//Route to update a specific book based on the ISBN
router.put("/books/:isbn", async (req, res) => {
    try {
        const updatedBook = req.body;
        const response = await axios.put(`${BOOKMONKEY_API_URL}/books/${req.params.isbn}`, updatedBook);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: "Failed to update book", error: error.message});
    }
});