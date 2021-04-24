import React, { useState, useEffect } from 'react'
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
import Divider from '@material-ui/core/Divider'
import EventIcon from '@material-ui/icons/Event'
import PaymentIcon from '@material-ui/icons/Payment'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import WeekendIcon from '@material-ui/icons/Weekend'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import NumberFormat from 'react-number-format'

import './AdminBookingCard.css'
import { useStyles } from './styles'
import AdminBookingsTable from './AdminBookingsTable'

function AdminBookingCard({ serviceBookingData }) {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const [tableRows, setTableRows] = useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        setTableRows(
            serviceBookingData.map((booking) => ({
                id: booking._id,
                name: booking.name,
                email: booking.email,
                contact: booking.contact,
                persons: booking.persons,
            }))
        )
    }, [serviceBookingData])

    return (
        <Card className="adminBookingCard">
            <CardHeader
                title={serviceBookingData[0].serviceBooked.title.toLowerCase()}
                subheader={serviceBookingData[0].serviceBooked.type.slice(0, -1)}
                className="adminBookingCard__header"
            />

            <div className="adminBookingCard__horizontalWrapper">
                <CardMedia
                    className="adminBookingCard__image"
                    image={serviceBookingData[0].serviceBooked.image}
                />
                <CardContent className="adminBookingCard__sideContent">
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        style={{ margin: '-25px 0 5px' }}
                    >
                        Service Details
                    </Typography>

                    <Typography variant="h5" color="textSecondary">
                        <PaymentIcon
                            fontSize="large"
                            className="adminBookingCard__icon"
                        />
                        <NumberFormat
                            value={serviceBookingData[0].serviceBooked.price}
                            prefix={'INR '}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
                    </Typography>

                    <Typography
                        variant="body1"
                        color="textSecondary"
                        className="adminBookingCard__startDate"
                    >
                        <EventIcon fontSize="large" className="adminBookingCard__icon" />
                        Start Date:{' '}
                        {new Date(
                            serviceBookingData[0].serviceBooked.startDate
                        ).toDateString()}
                    </Typography>

                    <Typography variant="body1" color="textSecondary">
                        <Brightness4Icon
                            fontSize="large"
                            className="adminBookingCard__icon"
                        />
                        Number of Days: {serviceBookingData[0].serviceBooked.days}
                    </Typography>

                    <Divider
                        variant="middle"
                        light={true}
                        className="adminBookingCard__divider"
                    />

                    <Typography variant="h6" color="textSecondary">
                        Bookings Summary
                    </Typography>

                    <Typography variant="h5" color="textSecondary">
                        <WeekendIcon
                            fontSize="large"
                            className="adminBookingCard__icon"
                        />
                        Total Bookings:{' '}
                        {serviceBookingData.reduce(
                            (accumulator, current) => (accumulator += current.persons),
                            0
                        )}{' '}
                        Seats
                    </Typography>

                    <Typography variant="h5" color="textSecondary">
                        <AccountBalanceWalletIcon
                            fontSize="large"
                            className="adminBookingCard__icon"
                        />
                        Total Amount:{' '}
                        <NumberFormat
                            value={
                                serviceBookingData.reduce(
                                    (accumulator, current) =>
                                        (accumulator += current.persons),
                                    0
                                ) * serviceBookingData[0].serviceBooked.price
                            }
                            prefix={'INR '}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
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
                    <AdminBookingsTable rows={tableRows} />
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default AdminBookingCard
