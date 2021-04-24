import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import LockOpenIcon from '@material-ui/icons/LockOpen'

import './UserModal.css'
import { useStyles, getModalStyle } from './styles'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'


function UserModal({ isModalOpen, setIsModalOpen }) {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [tab, setTab] = useState(0)

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            className="userModal"
        >
            <div style={modalStyle} className={classes.paper}>
                <Paper square className={classes.root}>
                    <Tabs
                        value={tab}
                        onChange={(e, newTab) => setTab(newTab)}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        <Tab icon={<LockOpenIcon />} label="Login" />
                        <Tab icon={<PersonAddIcon />} label="Sign Up" />
                    </Tabs>
                </Paper>
                <div className="userModal__form">
                    { !tab ? <LoginForm handleModalClose={handleClose} /> : <RegisterForm /> }
                </div>
            </div>
        </Modal>
    )
}

export default UserModal
