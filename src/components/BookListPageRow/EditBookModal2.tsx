import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom";
import Book from "../../domain/Book";
import {pawBook} from "../../domain/pawBook";
import {getBook, updateBook} from "../../domain/API";
import EditBookModal from "./EditBookModal";
import {useBooks} from "../../domain/hooks";

const EditBookModal2 = () => {
    const {refresh} = useBooks()
    const {id} = useParams() as {id: string};

    const [book, setBook] = useState<Book >(pawBook);
    const [open, setOpen] = useState<boolean>(true);

    const navigate = useNavigate()

    useEffect(() => {
        getBook(id).then((book) => {
            setBook(book);
        }).catch((error) => {
            console.error("Error getting book", error)
        })
    }, [id]);
    
    const handleClose =  () => {
        setOpen(false);
        navigate('/books')
    }

    const handleEditBook = (editedBook: Book) => {
        return new Promise<void>((resolve, reject) => {

            if (!editedBook.title) {
                reject(new Error('Title is required'));
                return;
            }

            if (!editedBook.isbn) {
                reject(new Error('ISBN is required'));
                return;
            }
            updateBook(editedBook)
                .then(() => {
                    setBook(editedBook);
                    refresh()
                        .then(() => {
                            resolve();
                        })
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
        });
    };

    
    if(!book){
        return <p>Book not found</p>
    }

    return (
            <EditBookModal book={book} open={open} onClose={handleClose} onEditBook={handleEditBook}/>
    )
}

export default EditBookModal2