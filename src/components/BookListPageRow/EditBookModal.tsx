import React, {useEffect, useState} from "react"
import Book from "../../domain/Book";
import {Alert, AlertTitle, Box, Button, ButtonGroup, Collapse, IconButton, Modal, TextField} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";
import {useBooks} from "../../domain/hooks";
import CloseIcon from "@mui/icons-material/Close";

interface EditBookModalProps {
    book: Book
    open: boolean
    onClose: () => void
    onEditBook: (book: Book) => Promise<void>
}

const EditBookModal: React.FC<EditBookModalProps> = ({book, open, onClose, onEditBook}) => {
    const [editedBook, setEditedBook] = React.useState<Book>(book)
    const [errorDialogText, setErrorDialogText] = useState<string>("")
    const [errorDialogName, setErrorDialogName] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);


    const {refresh} = useBooks()
    const navigate = useNavigate()

    const handleEditBook = () => {
        if(editedBook){
            onEditBook(editedBook).then(() => {
               setUpdateSuccess(true)
            }).catch((error) => {
                console.error("Error updating book", error)
                setErrorDialogName("Error updating book")
                setErrorDialogText(error.message)
                setError(true)

            })
        }
    }

    const handleClose = () => {
        setUpdateSuccess(false)
        navigate('/books')
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
            <Box sx={{borderRadius: "1.5rem", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '950px',
                bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
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
                <Collapse in={updateSuccess}>
                    <Alert severity="success" variant="filled"  onClose={handleClose}>
                        Book updated successfully!
                    </Alert>
                </Collapse>
                <Collapse in={error}>
                    <Alert severity='error' sx={{marginTop:'20px', mb: 2, borderRadius: '1.25rem' }} action={
                        <IconButton aria-label="close" color="inherit" size="medium" onClick={() => {setError(false);}}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                        <AlertTitle>{errorDialogName}</AlertTitle>
                        {errorDialogText}
                    </Alert>
                </Collapse>
                <ButtonGroup sx={{width: '50%', display: 'flex', justifyContent: 'space-around', padding: '20px', marginTop: '20px',}} >
                    <Button variant="contained" color="primary" onClick={handleEditBook} sx={{width:'100px'}}>Save</Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} sx={{width:'100px'}}>Cancel</Button>
                </ButtonGroup>
            </Box>
        </Modal>
    )
}

export default EditBookModal