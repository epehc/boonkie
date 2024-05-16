import React, {useEffect, useState} from "react";
import {TableContainer, Table, TableCell, TableRow} from "@mui/material";
import Book from "../../domain/Book";
import BookTableRow from "../BookTableRow/BookTableRow";
import {getAllBooks, getFirstBooks} from "../../domain/API";


const BookTable = () => {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getFirstBooks(10);
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);
    return (
        <TableContainer>
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
    );
};

export default BookTable