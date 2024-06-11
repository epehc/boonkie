import Book from "./Book";

const API_URL = 'http://localhost:4730'; // replace with your backend URL


//-------------Standard CRUD Operations----------------

/**
 * Get all books from the backend
 */
export const getAllBooks = async () => {
    try {
        const response = await fetch(`${API_URL}/books`);
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Get a single book from the backend
 */
export const getBook = async (isbn: string) => {
    try {
        const response = await fetch(`${API_URL}/books/${isbn}`);
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }

};

/**
 * Create a new book
 */
export const createBook = async (book: Book) => {
    try{
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        let data = await response.json();

        if (!response.ok) {
            let errorMessage = ''
            for(let key in data.errors){
                errorMessage += data.errors[key].msg + '\n';
            }
            throw new Error(errorMessage.trim());
        }

        return data;
    }catch(error){
        console.error(error);
        throw error;
    }
};

/**
 * Update a book
 */
export const updateBook = async (book: Book) => {

        const response = await fetch(`${API_URL}/books/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(response.statusText)
            let errorMessage = ''
             // Log the entire data object
            for(let key in data.errors){
                console.log(key)
                errorMessage += data.errors[key].msg + ' ';
            }
            console.log(errorMessage)
            throw new Error(errorMessage);
        }

        return data;

};

/**
 * Delete a book
 */
export const deleteBook = async (isbn: string) => {
    try {
        const response = await fetch(`${API_URL}/books/${isbn}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete book. Please try again.');
        }

        return response.json();
    }catch(error){
        console.error(error);
        throw error;
    }
};

export const getBooksForCart = async () => {
    try{
        const response = await fetch(`${API_URL}/users/2/books`);
        return response.json();
    }catch(error){
        console.error(error);
        throw error;
    }
}

//--------------Additional Operations------------------

/**
 * Get Books by page
 */
export const getBooksByPage = async (page: number, limit: number) => {
    try {
        const response = await fetch(`${API_URL}/books?_page=${page}&_limit=${limit}`);

        if (!response.ok) {

            throw new Error('Failed to retrieve books. Please try again.');
        }

        return response.json();

    }catch(error){
        console.error(error);
        throw error;
    }
}

//---------------Log in---------------------

/**
 * Log in a user
 */
export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data + '. Please try again.');
        }

        return data;
    } catch (error) {
        throw error;
    }
}
