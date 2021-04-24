import React from 'react'
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"

import './ConfirmModal.css'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


const ConfirmModal = ({ isOpen, setIsOpen, setConfirm, content }) => {

    const handleTrue = () => {
        setConfirm(true)
        setIsOpen(false)
    }

    const handleFalse = () => {
        setConfirm(false)
        setIsOpen(false)
    }

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setIsOpen(false)}
        >
            <DialogTitle>{"Are you Sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleFalse} color="secondary" style={{ color: '#dc3545' }}>
                    Disagree
                </Button>
                <Button onClick={handleTrue} color="secondary" variant="contained" className="confirmModal__btn">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default ConfirmModal
