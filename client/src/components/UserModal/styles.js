import { makeStyles } from '@material-ui/core/styles'

export const getModalStyle = () => {
    return {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
    }
}

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 700,
    },
    paper: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    [theme.breakpoints.down('sm')]: {
        paper: {
            width: '90vw',
        },
    },
}))
