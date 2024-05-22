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
            <TableCell>
                {book.cover === "" ? <img src={AltCover} alt="No Cover" style={{margin: 20,width: 100, height: 116}}/> : <img src={book.cover} alt="Cover" style={{width: 150, height: 175}}/>}
            </TableCell>
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