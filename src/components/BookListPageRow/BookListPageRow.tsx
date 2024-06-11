import React, {useEffect, useState} from "react";
import {Alert, Button, Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import Book from "../../domain/Book";
import AltCover from "../../assets/noLogo.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom";
import {deleteBook, updateBook} from "../../domain/API";
import DeleteBookModal from "./DeleteBookModal";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store";
import CloseIcon from "@mui/icons-material/Close";

interface BookTableRowProps {
    book: Book;
    refresh: () => void;
}

const BookListPageRow: React.FC<BookTableRowProps> = ({ book, refresh }) => {
    const [likes, setLikes] = useState<number>(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
    const [cartIconDisabled, setCartIconDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const isAdmin = useSelector((state: RootState) => state.login.isAdmin)


    const handleSelectBook = () => {
        navigate(`/books/${book.id}`)

    }

    const handleLike = () => {
        setLikes(likes+1);
    };

    const handleDeleteAlertClose = () => {
        setUpdateSuccess(false)
        refresh()
    }

    const handleAddToCartAlertClose = () => {
        setAddedToCart(false)
    }

    const handleDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen);
    }

    const handleAddBookToCart = () => {
        book.userId = 2
        updateBook(book)
        setCartIconDisabled(true)
        setAddedToCart(true)
    }

    const handleEditBookModal2 = () => {
        navigate(`/books/${book.id}/edit`)
    }

    const handleDeleteBook = () => {
        deleteBook(book.isbn).then( () => {
            handleDeleteModal();
            setUpdateSuccess(true)
            //navigate("/books")
            //refresh();
        } ).catch( (error) => {
            console.error("Error deleting book", error)
        })
    }

    useEffect(() => {
        if(book.userId !== 1) {
            setCartIconDisabled(true)
        }
    }, [book.userId])

    return (
        <>
            {addedToCart &&
                <TableRow>
                    <TableCell colSpan={7}>
                        <Collapse sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', flexGrow: 1}} in={addedToCart}>
                            <Alert variant="filled" severity="success" onClose={handleAddToCartAlertClose} action={
                                <>
                                    <Button color="inherit" size="small" onClick={() => navigate('/cart')}>
                                        <u>Go to cart</u>
                                    </Button>
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={handleAddToCartAlertClose}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                </>
                            }>
                                Book Added to cart!
                            </Alert>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
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
                {isAdmin &&
                    <>
                        <TableCell>
                            <IconButton onClick={handleEditBookModal2}><EditIcon/></IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={handleDeleteModal}><DeleteIcon/></IconButton>
                        </TableCell>
                    </>
                }
                {!isAdmin &&
                    <TableCell>
                        <IconButton disabled={cartIconDisabled} onClick={handleAddBookToCart}><AddShoppingCartIcon/></IconButton>
                    </TableCell>
                }
            </TableRow>
            {updateSuccess &&
                <TableRow>
                    <TableCell colSpan={8}>
                        <Collapse sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', flexGrow: 1}} in={updateSuccess}>
                            <Alert variant="filled" severity="warning" onClose={handleDeleteAlertClose}>
                                Book deleted successfully!
                            </Alert>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }

            <DeleteBookModal open={deleteModalOpen} book={book} onClose={handleDeleteModal} onDeleteBook={handleDeleteBook}/>
        </>

    );
};

export default BookListPageRow