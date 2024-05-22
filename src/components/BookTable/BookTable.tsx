import React, {useEffect, useState} from "react";
import {TableContainer, Table, TableCell, TableRow, Box} from "@mui/material";
import Book from "../../domain/Book";
import BookTableRow from "../BookTableRow/BookTableRow";
import {getAllBooks, getFirstBooks} from "../../domain/API";


const BookTable = () => {

    const [books, setBooks] = useState<Book[]>([]);

    const removeCoverFromBooks = (books: Book[]): Book[] => {
        return books.map((book, index) => {
            if (index < 2) {
                return { ...book, cover: '' }; // Remove cover from first two books
            }
            return book;
        });
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getFirstBooks(10);
                const booksWithoutCover = removeCoverFromBooks(fetchedBooks);
                setBooks(booksWithoutCover);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <TableContainer sx={{width: "80%"}}>
                <Table>
                    <TableRow>
                        <TableCell><b>COVER</b></TableCell>
                        <TableCell><b>TITLE</b></TableCell>
                        <TableCell><b>AUTHOR</b></TableCell>
                        <TableCell><b>PUBLISHER</b></TableCell>
                        <TableCell><b>PRICE</b></TableCell>
                        <TableCell><b>LIKE</b></TableCell>
                    </TableRow>
                    {books.map(book => (
                        <BookTableRow key={book.id} book={book}/>
                    ))}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BookTable