import React, {useEffect} from "react"
import Book from "../../domain/Book";
import {Box, Button, ButtonGroup, Modal, TextField} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";

interface EditBookModalProps {
    book: Book
    open: boolean
    onClose: () => void
    onEditBook: (book: Book) => void
}

const EditBookModal: React.FC<EditBookModalProps> = ({book, open, onClose, onEditBook}) => {
    const [editedBook, setEditedBook] = React.useState<Book>(book)

    const navigate = useNavigate()

    const handleEditBook = () => {
        if(editedBook){
            onEditBook(editedBook)
            console.log(editedBook)
        }
    }

    const handleClose = () => {
        navigate('/')
        onClose()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setEditedBook(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        // Resets the edited applicant when the modal opens or the applicant changes.
        setEditedBook(book)

    }, [book, open])

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
            <Box sx={{
                borderRadius: "1.5rem",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '950px',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <Grid container spacing={2} style={{width:'100%', marginTop: '20px'}}>
                    <Grid xs={6}>
                        <TextField label="Title" name="title" value={editedBook.title} onChange={handleInputChange} sx={{ marginBottom: '20px'}} fullWidth/>
                    </Grid>
                    <Grid xs={6}>
                        <TextField label="Subtitle" name="subtitle" value={editedBook.subtitle} onChange={handleInputChange} sx={{ marginBottom: '20px'}} fullWidth/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{width:'100%', marginTop: '20px'}}>
                    <Grid xs={6}>
                        <TextField label="Author" name="author" value={editedBook.author} onChange={handleInputChange} sx={{width: '100%', marginBottom: '20px'}}/>
                    </Grid>
                    <Grid xs={6}>
                        <TextField label="Publisher" name="publisher" value={editedBook.publisher} onChange={handleInputChange} sx={{width: '100%', marginBottom: '20px'}}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{width:'100%', marginTop: '20px'}}>
                    <Grid xs={3}>
                        <TextField label="Price" name="price" value={editedBook.price} onChange={handleInputChange} sx={{width: '100%', marginBottom: '20px'}}/>
                    </Grid>
                    <Grid xs={3}>
                        <TextField label="Number of Pages" name="numPages" value={editedBook.numPages} onChange={handleInputChange} sx={{width: '100%', marginBottom: '20px'}}/>
                    </Grid>
                    <Grid xs={6}>
                        <TextField label="ISBN" name="isbn" value={editedBook.isbn} onChange={handleInputChange} sx={{width: '100%', marginBottom: '20px'}}/>
                    </Grid>
                </Grid>
                <TextField multiline rows={5} label="About" name="abstract" value={editedBook.abstract} onChange={handleInputChange} sx={{width: '100%', marginBottom: '20px'}}/>
                <ButtonGroup sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '20px',
                    marginTop: '20px',
                }} >
                    <Button variant="contained" color="primary" onClick={handleEditBook} sx={{width:'100px'}}>Save</Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} sx={{width:'100px'}}>Cancel</Button>
                </ButtonGroup>
            </Box>
        </Modal>
    )
}

export default EditBookModal