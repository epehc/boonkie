import React, {useState} from "react";
import {IconButton, TableCell, TableRow} from "@mui/material";
import Book from "../../domain/Book";
import AltCover from "../../assets/noLogo.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import {deleteBook} from "../../domain/API";
import DeleteBookModal from "./DeleteBookModal";

interface BookTableRowProps {
    book: Book;
    loggedIn: boolean;
    refresh: () => void;
}

const BookListPageRow: React.FC<BookTableRowProps> = ({ book, loggedIn, refresh }) => {
    const [likes, setLikes] = useState<number>(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();


    const handleSelectBook = () => {
        navigate(`/books/${book.id}`)

    }

    const handleLike = () => {
        setLikes(likes+1);
    };

    const handleDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen);
    }

    const handleEditBookModal2 = () => {
        navigate(`/books/${book.id}/edit`)
    }

    const handleDeleteBook = () => {
        deleteBook(book.isbn).then( () => {
            handleDeleteModal();
            navigate("/")
            refresh();
        } ).catch( (error) => {
            console.error("Error deleting book", error)
        })
    }

    return (
        <>
            <TableRow>
                <TableCell onClick={handleSelectBook}>
                    {book.cover === "" ? <img src={AltCover} alt="No Cover" style={{margin: 20,width: 100, height: 116}}/> : <img src={book.cover} alt="Cover" style={{width: 150, height: 175}}/>}
                </TableCell>
                <TableCell onClick={handleSelectBook}><b>{book.title.toUpperCase()}</b></TableCell>
                <TableCell> {book.author} </TableCell>
                <TableCell> {book.publisher} </TableCell>
                <TableCell> {book.price} </TableCell>
                <TableCell >
                    <IconButton onClick={handleLike}>
                        { likes === 0 ? <FavoriteBorderIcon/> : <><FavoriteIcon sx={{color: "red"}}/>{likes}</> }
                    </IconButton>
                </TableCell>
                {loggedIn &&
                    <>
                        <TableCell>
                            <IconButton onClick={handleEditBookModal2}><EditIcon/></IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={handleDeleteModal}><DeleteIcon/></IconButton>
                        </TableCell>
                    </>
                }
            </TableRow>
            <DeleteBookModal open={deleteModalOpen} book={book} onClose={handleDeleteModal} onDeleteBook={handleDeleteBook}/>
        </>

    );
};

export default BookListPageRow