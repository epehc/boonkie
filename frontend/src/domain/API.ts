import Book from "./Book";

const API_URL = 'http://localhost:4730'; // replace with your backend URL


//Standard CRUD Operations

/**
 * Get all books from the backend
 */
export const getAllBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
    return response.json();
};

/**
 * Get a single book from the backend
 */
export const getBook = async (isbn: string) => {
    const response = await fetch(`${API_URL}/books/${isbn}`);
    return response.json();
};

/**
 * Create a new book
 */
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

/**
 * Update a book
 */
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

/**
 * Delete a book
 */
export const deleteBook = async (isbn: string) => {
    const response = await fetch(`${API_URL}/books/${isbn}`, {
        method: 'DELETE',
    });
    return response.json();
};

//Additional Operations

/**
 * Get all books sorted by title in descending order
 */
export const getBooksSortedByTitleDescending = async () => {
    const response = await fetch(`${API_URL}//books?_sort=title&_order=desc`);
    return response.json();
}

/**
 * Get all books sorted by title in ascending order
 */
export const getBooksSortedByTitleAscending = async () => {
    const response = await fetch(`${API_URL}//books?_sort=title`);
    return response.json();
}

/**
 * Get all books sorted by author in descending order
 */
export const getBooksSortedByAuthorDescending = async () => {
    const response = await fetch(`${API_URL}//books?_sort=author&_order=desc`);
    return response.json();
}

/**
 * Get all books sorted by author in ascending order
 */
export const getBooksSortedByAuthorAscending = async () => {
    const response = await fetch(`${API_URL}//books?_sort=author`);
    return response.json();
}