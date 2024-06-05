import React from "react"
import Book from "../../domain/Book";
import {Box, Button, ButtonGroup, Modal, Typography} from "@mui/material";

interface DeleteBookModalProps {
    book: Book,
    open: boolean,
    onClose: () => void,
    onDeleteBook: (book: Book) => void
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({book, open, onClose, onDeleteBook}) => {

    const handleDelete = () => {
        onDeleteBook(book);
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
            <Box sx={{
                borderRadius: "1.5rem",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <Typography id="modal-title">Are you sure you want to delete this book?</Typography>
                <ButtonGroup sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px',
                }} >
                    <Button variant="contained" color="warning" onClick={handleDelete}>Delete</Button>
                    <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
                </ButtonGroup>
            </Box>

        </Modal>
    )
}

export default DeleteBookModal