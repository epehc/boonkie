import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import Book from "../../domain/Book";
import {pawBook} from "../../domain/pawBook";
import {getBook, updateBook} from "../../domain/API";
import EditBookModal from "./EditBookModal";

interface EditBookModal2Props{
    refresh: () => void;
}


const EditBookModal2: React.FC<EditBookModal2Props> = ({refresh}) => {
    const {id} = useParams() as {id: string};

    const [book, setBook] = useState<Book >(pawBook);
    const [open, setOpen] = useState<boolean>(true);

    useEffect(() => {
        getBook(id).then((book) => {
            setBook(book);
        }).catch((error) => {
            console.error("Error getting book", error)
        })
    }, [id]);
    
    const handleClose = () => {
        setOpen(false);
        refresh()
    }
    
    const handleEditBook = (editedBook: Book) => {
        updateBook(editedBook).then(() => {
            setBook(editedBook)
            console.log(editedBook)
            handleClose()
        }).catch((error) => {
            console.error("Error updating book", error)
        })
    }
    
    if(!book){
        return <p>Book not found</p>
    }

    return (
       <EditBookModal book={book} open={open} onClose={handleClose} onEditBook={handleEditBook}/>
    )
}

export default EditBookModal2