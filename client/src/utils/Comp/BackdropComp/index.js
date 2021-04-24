import React from "react"
import Backdrop from "@material-ui/core/Backdrop"
import { makeStyles } from "@material-ui/core/styles"
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import './BackdropComp.css'


const BackdropComp = ({ open, setOpen, content }) => {
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#000'
        }
    }))
    
    const classes = useStyles()
   
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
        >
            <Typography variant="h3" className="backdropComp__content">{content}</Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClose}
                style={{ marginTop: '15px' }}
            >
                Okay! I understand.
            </Button>
        </Backdrop>
    )
}


export default BackdropComp
