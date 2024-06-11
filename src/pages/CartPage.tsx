import React, {useEffect, useState} from "react"
import {getBooksForCart, updateBook} from "../domain/API";
import Book from "../domain/Book";
import {
    Box,
    Button,
    ButtonGroup, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";

const CartPage = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [total, setTotal] = useState<number>(0)
    const [refreshBooks, setRefreshBooks] = useState<boolean>(true)

    const theme = useTheme();
    const navigate = useNavigate()

    const booksInCart = async () => {
        getBooksForCart().then((fetchedBooks) => {
            setBooks(fetchedBooks)
            calculateTotal(fetchedBooks)
        }).catch((error) => {
            console.error("Failed to fetch books for cart", error)
        })
    }

    const calculateTotal = (books: Book[]) => {
        let subtotal = 0
        books.forEach(book => {
            let cleanedPriceString = book.price.replace("$", "").trim();
            let priceNumber = parseFloat(cleanedPriceString);
            subtotal += priceNumber
        })
        subtotal = parseFloat(subtotal.toFixed(2))
        setTotal(subtotal)
        console.log(total)
    }

    const handleRemoveFromCart = (book: Book) => {
        book.userId = 1
        updateBook(book).then(() => {
            setRefreshBooks(true)
        })
    }

    const handleProceedToCheckout = () => {
        navigate('/thank-you')
        books.forEach(book => {
            book.userId = 1
            updateBook(book)
        })
    }

    useEffect(() => {
        if (refreshBooks) {
            booksInCart().then(() => {
                console.log("Books fetched")
                setRefreshBooks(false)
            })
        }
    }, [refreshBooks]);

    return (
        <Box sx={{display: "flex", justifyContent:"center", marginTop: "10vh", marginBottom:"10vh"}}>
            <Box sx={{width: "60%", bgcolor: 'background.paper', borderRadius: '1.5rem', padding: '30px'}}>
                <Typography variant="h4"><b>Shopping Cart</b></Typography>
                <TableContainer sx={{ marginTop: '20px', overflow:'visible'}}>
                    <Table>
                        <TableHead sx={{position: "sticky", top: 60, bgcolor: theme.palette.background.paper, zIndex: 1}}>
                            <TableRow>
                                <TableCell><b>REMOVE</b></TableCell>
                                <TableCell><b>TITLE</b></TableCell>
                                <TableCell><b>AUTHOR</b></TableCell>
                                <TableCell><b>PRICE</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map(book => (
                                <TableRow key={book.id}>
                                    <TableCell>
                                        <IconButton onClick={() => handleRemoveFromCart(book)}><DeleteIcon/></IconButton>
                                    </TableCell>
                                    <TableCell>{book.title.toUpperCase()}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.price}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell><b>TOTAL</b></TableCell>
                                <TableCell><b>${total}</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <ButtonGroup sx={{marginTop:'20px', display: 'flex', justifyContent:'flex-end'}}>
                    <Button variant='contained' color='primary' onClick={handleProceedToCheckout} sx={{marginRight:'40px'}}>Proceed to Checkout</Button>
                    <Button variant='contained' color='secondary' onClick={() => navigate('/books')}>Back to Books</Button>
                </ButtonGroup>
            </Box>

        </Box>
    )
}

export default CartPage