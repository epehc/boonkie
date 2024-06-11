import {useEffect, useState} from "react";
import {getBooksByPage} from "./API";
import Book from "./Book";
import {useLocation} from "react-router-dom";

type FetchState = 'initial' | 'loading' | 'success' | 'error';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [state, setState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const location = useLocation()

    const fetchBooks = async () => {
        setState('loading');
        setError(null);
        try {
            const fetchedBooks = await getBooksByPage(page, 10);
            setBooks(fetchedBooks);
            setState('success');
        } catch (e) {
            // @ts-ignore
            setError(e);
            setState('error');
            console.error('Failed to fetch books:', e);
        }
    };

    useEffect(() => {
        if(location.pathname === "/books"){
            const intervalId = setInterval(() => {
                fetchBooks();
            }, 60000);

            return () => clearInterval(intervalId);
        }
    }, [page, location])

    useEffect(() => {
        if(location.pathname === "/books"){
            fetchBooks();
        }
    }, [page, location]);


    return { books, page, setPage, state, setState, error, setError, refresh: fetchBooks };
}

export const useErrorDialog = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [name, setName] = useState<string>("");

    const handleErrorDialog = () => {
        setOpen(!open)
    }

    const handleError = () => {
        setName(name)
        setText(text)
        setOpen(true)
    }

    return {open, setText, setName, handleErrorDialog, handleError};
}