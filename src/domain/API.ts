import Book from "./Book";
import User from "./User";

const API_URL = 'http://localhost:4730'; // replace with your backend URL


//-------------Standard CRUD Operations----------------

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

//--------------Additional Operations------------------

/**
 * Get a specific amount of books
 */
export const getFirstBooks = async (count: number) => {
    const response = await fetch(`${API_URL}/books?_limit=${count}`);
    return response.json();

}

/**
 * Get Books by page
 */
export const getBooksByPage = async (page: number, limit: number) => {
    const response = await fetch(`${API_URL}/books?_page=${page}&_limit=${limit}`);
    return response.json();
}

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

//---------------Log in / Register---------------------


export const login = async (user: User) => {
    const response = await fetch(`${API_URL}/login}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export const register = async (user: User) => {
    const response = await fetch(`${API_URL}/register}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
}