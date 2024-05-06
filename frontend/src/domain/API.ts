import Book from "./Book";

const API_URL = 'http://localhost:4730'; // replace with your backend URL

export const getAllBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
    return response.json();
};

export const getBook = async (isbn: string) => {
    const response = await fetch(`${API_URL}/books/${isbn}`);
    return response.json();
};

export const createBook = async (book: Book) => {
    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    return response.json();
};

export const updateBook = async (book: Book) => {
    const response = await fetch(`${API_URL}/books/${book.isbn}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    return response.json();
};

export const deleteBook = async (isbn: string) => {
    const response = await fetch(`${API_URL}/books/${isbn}`, {
        method: 'DELETE',
    });
    return response.json();
};