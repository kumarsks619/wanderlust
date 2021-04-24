import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'

import { useStyles, getModalStyle } from './styles'

function ModalComp({ isModalOpen, setIsModalOpen, children }) {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <Modal open={isModalOpen} onClose={handleClose} className="userModal">
            <div style={modalStyle} className={classes.paper}>
                {children}
            </div>
        </Modal>
    )
}

export default ModalComp
