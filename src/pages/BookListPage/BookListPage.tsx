import React from "react";
import {TableContainer, Table, TableCell, TableRow, Box, Button} from "@mui/material";
import Book from "../../domain/Book";
import BookListPageRow from "../../components/BookListPageRow/BookListPageRow";
import Pagination from "@mui/material/Pagination";
import {useTheme} from "@mui/material/styles";
import {Outlet, useNavigate} from "react-router-dom";

interface BookTableProps {
    books: Book[];
    page: number
    loggedIn: boolean
    setPage: (page: number) => void
    refresh: () => void
}

const BookListPage: React.FC<BookTableProps> = ({books, page, loggedIn, setPage, refresh}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    const tempLoggedIn = true;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleNavigateCreateBookPage = () => {
        navigate('/new');
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible'}}>
            <TableContainer sx={{width: "80%", overflow:'visible'}}>
                {loggedIn &&
                    <Button variant="contained" color="secondary" onClick={handleNavigateCreateBookPage} sx={{marginTop:"20px", marginBottom:"20px"}}>+ Add new Book</Button>
                }
                <Table>
                    <TableRow sx={{position: "sticky", top: 0, bgcolor: theme.palette.background.paper, zIndex: 1}}>
                        <TableCell><b>COVER</b></TableCell>
                        <TableCell><b>TITLE</b></TableCell>
                        <TableCell><b>AUTHOR</b></TableCell>
                        <TableCell><b>PUBLISHER</b></TableCell>
                        <TableCell><b>PRICE</b></TableCell>
                        <TableCell><b>LIKE</b></TableCell>
                        {loggedIn &&
                            <>
                                <TableCell><b>EDIT</b></TableCell>
                                <TableCell><b>DELETE</b></TableCell>
                            </>
                        }

                    </TableRow>
                    {books.map(book => (
                        <BookListPageRow key={book.id} book={book} loggedIn={loggedIn} refresh={refresh}/>
                    ))}
                </Table>
                <Pagination count={26} page={page} onChange={handlePageChange} sx={{display: 'flex', justifyContent: 'center',
                    alignItems: 'center', margin: 2}}/>
            </TableContainer>
            <Outlet/>
        </Box>
    );
};

export default BookListPage