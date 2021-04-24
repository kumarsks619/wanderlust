import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import FileBase from 'react-file-base64'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from 'react-bootstrap/Alert'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'

import './AdminCarousel.css'
import { addCarousel, deleteCarousel } from '../../../../api/admin'
import { AdminContext } from '../../../../utils/Context/admin'
import Loading from '../../../../utils/Comp/Loading'
import ConfirmModal from '../../../../utils/Comp/ConfirmModal'

function AdminCarousel({ carouselData, setDeletedCarouselID, setCarousel }) {
    const adminContext = useContext(AdminContext)

    const initialInputs = {
        title: '',
        description: '',
        image: '',
    }

    const [inputValues, setInputValues] = useState(initialInputs)
    const [responseMessage, setResponseMessage] = useState({})
    const [newCarousel, setNewCarousel] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteCarouselID, setDeleteCarouselID] = useState('')

    // handling ADD-CAROUSEL ****************************************************************************
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        await addCarousel(inputValues, adminContext.admin.adminToken)
            .then((response) => {
                setResponseMessage(response.data)
                setNewCarousel(response.data.newCarousel)
                setInputValues(initialInputs)
            })
            .catch((err) => setResponseMessage({ error: err.message }))
    }

    useEffect(() => {
        if (newCarousel) {
            if (Object.keys(newCarousel).length > 0)
                setCarousel((prevCarousel) => [newCarousel, ...prevCarousel])
        }
    }, [newCarousel])

    // handling DELETE-CAROUSEL *************************************************************************
    const handleDeleteCarousel = () => {
        deleteCarousel(adminContext.admin.adminToken, deleteCarouselID)
            .then((response) => setDeletedCarouselID(response.data))
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        if (confirmDelete) handleDeleteCarousel()
    }, [confirmDelete, deleteCarouselID])

    return (
        <>
            <Container className="adminCarousel">
                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom={true}
                    className="adminCarousel__header"
                >
                    Image Carousel
                </Typography>
                <Divider light={true} className="adminCarousel__divider" />
                <form className="adminCarousel__form" onSubmit={handleFormSubmit}>
                    <div className="adminCarousel__formGroup1">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Title"
                            placeholder="Title for the picture"
                            className="adminCarousel__title"
                            name="title"
                            value={inputValues.title}
                            onChange={(e) =>
                                setInputValues({
                                    ...inputValues,
                                    title: e.target.value,
                                })
                            }
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Description"
                            placeholder="Brief description of the picture"
                            className="adminCarousel__description"
                            name="description"
                            value={inputValues.description}
                            onChange={(e) =>
                                setInputValues({
                                    ...inputValues,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="adminCarousel__formGroup2">
                        <label className="adminCarousel__imageSelect">
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setInputValues({
                                        ...inputValues,
                                        image: base64,
                                    })
                                }
                            />
                            {inputValues.image ? 'Image Selected' : 'Choose an Image'}
                        </label>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                            className="adminCarousel__formBtn"
                        >
                            Save Carousel
                        </Button>
                    </div>
                    {Object.keys(responseMessage).length > 0 &&
                        (responseMessage.hasOwnProperty('error') ? (
                            <Alert variant="danger" style={{ fontSize: '1.2rem' }}>
                                {responseMessage.error}
                            </Alert>
                        ) : (
                            <Alert variant="success" style={{ fontSize: '1.2rem' }}>
                                {responseMessage.message}
                            </Alert>
                        ))}
                </form>

                {carouselData.length > 0 ? (
                    carouselData.map((carousel) => (
                        <Card className="adminCarousel__card" key={carousel._id}>
                            <CardMedia
                                image={carousel.image}
                                className="adminCarousel__cardImage"
                            />
                            <CardHeader
                                title={carousel.title.toLowerCase()}
                                subheader={carousel.description}
                                className="adminCarousel__cardHeader"
                                action={
                                    <IconButton
                                        onClick={() => {
                                            setDeleteCarouselID(carousel._id)
                                            setIsOpen(true)
                                        }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                }
                            />
                        </Card>
                    ))
                ) : (
                    <Loading />
                )}
            </Container>

            <ConfirmModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                content={
                    "Once deleted then it can't be restored. Still sure to delete this Carousel Image?"
                }
                setConfirm={setConfirmDelete}
            />
        </>
    )
}

export default AdminCarousel
