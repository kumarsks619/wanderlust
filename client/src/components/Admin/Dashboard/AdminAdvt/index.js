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

import './AdminAdvt.css'
import { addAdvtBanner, deleteAdvtBanner } from '../../../../api/admin'
import { AdminContext } from '../../../../utils/Context/admin'
import Loading from '../../../../utils/Comp/Loading'
import ConfirmModal from '../../../../utils/Comp/ConfirmModal'

function AdminAdvt({ advtData, setDeletedAdvtID, setAdvt }) {
    const adminContext = useContext(AdminContext)

    const initialInputs = {
        image: '',
        link: '',
    }

    const [inputValues, setInputValues] = useState(initialInputs)
    const [responseMessage, setResponseMessage] = useState({})
    const [newAdvt, setNewAdvt] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteAdvtID, setDeleteAdvtID] = useState('')

    // handling ADD-ADVT-BANNER **********************************************************************
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        await addAdvtBanner(inputValues, adminContext.admin.adminToken)
            .then((response) => {
                setResponseMessage(response.data)
                setNewAdvt(response.data.newAdvt)
                setInputValues(initialInputs)
            })
            .catch((err) => setResponseMessage({ error: err.message }))
    }

    useEffect(() => {
        if (newAdvt) {
            if (Object.keys(newAdvt).length > 0)
                setAdvt((prevAdvt) => [newAdvt, ...prevAdvt])
        }
    }, [newAdvt])

    // handling DELETE-CAROUSEL *************************************************************************
    const handleDeleteAdvt = () => {
        deleteAdvtBanner(adminContext.admin.adminToken, deleteAdvtID)
            .then((response) => setDeletedAdvtID(response.data))
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        if (confirmDelete) handleDeleteAdvt()
    }, [confirmDelete, deleteAdvtID])

    return (
        <>
            <Container className="adminAdvt">
                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom={true}
                    className="adminAdvt__header"
                >
                    Advertisement Banner
                </Typography>
                <Divider light={true} className="adminAdvt__divider" />
                <form className="adminAdvt__form" onSubmit={handleFormSubmit}>
                    <div className="adminAdvt__formGroup">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Link"
                            placeholder="Link for the Advt."
                            className="adminAdvt__link"
                            name="link"
                            value={inputValues.link}
                            onChange={(e) =>
                                setInputValues({
                                    ...inputValues,
                                    link: e.target.value,
                                })
                            }
                        />

                        <label className="adminAdvt__imageSelect">
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
                            className="adminAdvt__formBtn"
                        >
                            Save Advertisement
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

                {advtData.length > 0 ? (
                    advtData.map((advt) => (
                        <Card className="adminAdvt__card" key={advt._id}>
                            <CardMedia
                                image={advt.image}
                                className="adminAdvt__cardImage"
                            />
                            <CardHeader
                                title="Advertisement Link"
                                subheader={advt.link}
                                className="adminAdvt__cardHeader"
                                action={
                                    <IconButton
                                        onClick={() => {
                                            setDeleteAdvtID(advt._id)
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
                    "Once deleted then it can't be restored. Still sure to delete this Advertisement Banner?"
                }
                setConfirm={setConfirmDelete}
            />
        </>
    )
}

export default AdminAdvt
