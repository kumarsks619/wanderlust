import React, { useState, useContext, Fragment, useEffect } from 'react'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CancelIcon from '@material-ui/icons/Cancel'
import Divider from '@material-ui/core/Divider'
import StarRateIcon from '@material-ui/icons/StarRate'
import CheckIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Remove'
import EventIcon from '@material-ui/icons/Event'
import PaymentIcon from '@material-ui/icons/Payment'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { v4 as uuid } from 'uuid'
import NumberFormat from 'react-number-format'

import { useStyles } from './styles'
import './AdminServiceCard.css'
import { deleteService } from '../../../../../api/admin'
import { AdminContext } from '../../../../../utils/Context/admin'
import ConfirmModal from '../../../../../utils/Comp/ConfirmModal'


function AdminServiceCard({ cardData, setDeletedServiceID }) {
    const adminContext = useContext(AdminContext)

    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    useEffect(() => {
        const handleDeleteService = async (serviceID) => {
            try {
                const response = await deleteService(adminContext.admin?.adminToken, serviceID)
                setDeletedServiceID(response.data.deletedServiceID)
            } catch (err) {
                console.log(err)
            }
        }

        if (deleteConfirm)
            handleDeleteService(cardData._id)
    }, [deleteConfirm, cardData._id, setDeletedServiceID, adminContext.admin?.adminToken])
    


    return (
        <>
            <Card className="serviceCard">
                <CardHeader
                    action={
                        <IconButton onClick={() => setIsOpen(true)}>
                            <CancelIcon />
                        </IconButton>
                    }
                    title={cardData.title.toLowerCase()}
                    subheader={cardData.type.slice(0, -1)}
                    className="serviceCard__header"
                />

                <div className="serviceCard__horizontalWrapper">
                    <CardMedia
                        className="serviceCard__image"
                        image={cardData.image}
                    />
                    <CardContent className="serviceCard__sideContent">
                        <Typography variant="h5" color="textSecondary">
                            <PaymentIcon fontSize="large" className="serviceCard__icon" />
                            <NumberFormat 
                                value={cardData.price}
                                prefix={"INR "}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </Typography>
                        <Typography variant="body1" color="textSecondary" className="serviceCard__startDate">
                            <EventIcon fontSize="large" className="serviceCard__icon" /> 
                            Start Date: {new Date(cardData.startDate).toDateString()}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <Brightness4Icon fontSize="large"  className="serviceCard__icon" /> 
                            Number of Days: {cardData.days}
                        </Typography>

                        <Divider variant="middle" light={true} className="serviceCard__divider" />

                        <Typography variant="h6" color="textSecondary">Overview</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {cardData.overview.slice(0, 350)}...
                            <span className="serviceCard__readMore" onClick={handleExpandClick}>[Read More]</span> 
                        </Typography>
                    </CardContent>
                </div>

                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="h6" color="textSecondary">Overview</Typography>
                        <Typography variant="body2" color="textSecondary">{cardData.overview}</Typography>
                        <Divider variant="middle" light={true} className="serviceCard__divider" />

                        <Typography variant="h6" color="textSecondary">Highlights</Typography>
                        {
                            cardData.highlights.map(highlight => (
                                <Typography variant="body2" color="textSecondary" key={uuid()} gutterBottom={true}>
                                    <StarRateIcon className="serviceCard__bulletPoint" /> {highlight}
                                </Typography>
                            ))
                        }
                        <Divider variant="middle" light={true} className="serviceCard__divider" />

                        <Typography variant="h6" color="textSecondary">Itinerary</Typography>
                        {
                            cardData.itinerary.map((it, index) => (
                                <Fragment key={uuid()}>
                                    <Typography variant="body1" color="textSecondary" className="serviceCard__subHeading">
                                        <Brightness4Icon className="serviceCard__bulletPoint" /> Day {index + 1}:
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom={true} style={{ paddingLeft: '30px' }}>
                                        {it}
                                    </Typography>
                                </Fragment>
                            ))
                        }
                        <Divider variant="middle" light={true} className="serviceCard__divider" />

                        <Typography variant="h6" color="textSecondary">Included</Typography>
                        {
                            cardData.inclusions.map(inclusion => (
                                <Typography variant="body2" color="textSecondary" gutterBottom={true} key={uuid()}>
                                    <CheckIcon className="serviceCard__bulletPoint" /> {inclusion}
                                </Typography>
                            ))
                        }
                        <Divider variant="middle" light={true} className="serviceCard__divider" />

                        <Typography variant="h6" color="textSecondary">Excluded</Typography>
                        {
                            cardData.exclusions.map(exclusion => (
                                <Typography variant="body2" color="textSecondary" gutterBottom={true} key={uuid()}>
                                    <RemoveIcon className="serviceCard__bulletPoint" /> {exclusion}
                                </Typography>
                            ))
                        }
                    </CardContent>
                </Collapse>
            </Card>

            <ConfirmModal
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                setConfirm={setDeleteConfirm}
                content={"Once deleted, then it can't be restored. And all the bookings for this service will be deleted too. Still Sure?"}
            />
        </>
    )
}

export default AdminServiceCard
