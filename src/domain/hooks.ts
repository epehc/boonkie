import {useEffect, useState} from "react";
import {getBooksByPage} from "./API";
import Book from "./Book";

type FetchState = 'initial' | 'loading' | 'success' | 'error';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [state, setState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);
    const [triggerUpdate, setTriggerUpdate] = useState(false);


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
        fetchBooks();
    }, [page, triggerUpdate]);


    return { books, page, setPage, state, setState, error, setError, triggerUpdate, setTriggerUpdate, refresh: fetchBooks };
}