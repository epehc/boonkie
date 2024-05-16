import React, {useState} from "react";
import {IconButton, TableCell, TableRow} from "@mui/material";
import Book from "../../domain/Book";
import AltCover from "../../assets/noLogo.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface BookTableRowProps {
    book: Book;
}

const BookTableRow: React.FC<BookTableRowProps> = ({ book }) => {
    const [like, setLike] = useState<boolean>(book.like);

    const handleLike = () => {
        setLike(!like);
    };

    return (
        <TableRow>
            <TableCell><img src={book.cover || AltCover} alt="Cover" width="150px" height="175px"/> </TableCell>
            <TableCell> <b>{book.title.toUpperCase()}</b> </TableCell>
            <TableCell> {book.author} </TableCell>
            <TableCell> {book.publisher} </TableCell>
            <TableCell> {book.price} </TableCell>
            <TableCell >
                <IconButton onClick={handleLike}>
                    {like ? <FavoriteIcon sx={{color: "red"}}/> : <FavoriteBorderIcon/>}
                </IconButton>

            </TableCell>
        </TableRow>
    );
};

export default BookTableRow