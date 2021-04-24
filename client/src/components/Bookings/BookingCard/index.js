import React, { useState, Fragment, useContext, useEffect } from 'react'
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
import StarRateIcon from '@material-ui/icons/StarRate'
import CheckIcon from '@material-ui/icons/Check'
import RemoveIcon from '@material-ui/icons/Remove'
import EventIcon from '@material-ui/icons/Event'
import PaymentIcon from '@material-ui/icons/Payment'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { v4 as uuid } from 'uuid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import PeopleIcon from '@material-ui/icons/People'
import PersonIcon from '@material-ui/icons/Person'
import Chip from '@material-ui/core/Chip'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Button from '@material-ui/core/Button'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import NumberFormat from 'react-number-format'

import { useStyles } from './styles'
import './BookingCard.css'
import { deleteBooking } from '../../../api/user'
import { UserContext } from '../../../utils/Context/user'
import ConfirmModal from '../../../utils/Comp/ConfirmModal'

function BookingCard({ bookingData, setDeletedBookingID }) {
    const userContext = useContext(UserContext)

    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [cancelBookingConfirm, setCancelBookingConfirm] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleBookingDelete = async (bookingID) => {
        try {
            await deleteBooking(bookingID, userContext.user)
            setDeletedBookingID(bookingID)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (cancelBookingConfirm) handleBookingDelete(bookingData._id)
    }, [cancelBookingConfirm, bookingData._id])

    return (
        <>
            <Card className="bookingCard">
                <CardHeader
                    title={bookingData.serviceBooked.title.toLowerCase()}
                    subheader={bookingData.serviceBooked.type.slice(0, -1)}
                    className="bookingCard__header"
                />

                <div className="bookingCard__horizontalWrapper">
                    <CardMedia
                        className="bookingCard__image"
                        image={bookingData.serviceBooked.image}
                    />
                    <CardContent className="bookingCard__sideContent">
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            className="bookingCard__bookingDetailsHeading"
                        >
                            Booking Details
                        </Typography>

                        <div className="bookingCard__bookingDetailsWrapper">
                            <div className="bookingCard__bookingDetailsLeft">
                                <Typography
                                    variant="h5"
                                    color="textSecondary"
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    <AccountCircleIcon
                                        fontSize="large"
                                        className="bookingCard__icon"
                                    />
                                    {bookingData.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    className="bookingCard__startDate"
                                >
                                    <EmailIcon
                                        fontSize="large"
                                        className="bookingCard__icon"
                                    />
                                    {bookingData.email}
                                </Typography>
                                <div className="bookingCard__bookingDetailsGroup">
                                    <Typography variant="body1" color="textSecondary">
                                        <PhoneIcon
                                            fontSize="large"
                                            className="bookingCard__icon"
                                        />
                                        {bookingData.contact}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {bookingData.persons > 1 ? (
                                            <PeopleIcon
                                                fontSize="large"
                                                className="bookingCard__icon"
                                            />
                                        ) : (
                                            <PersonIcon
                                                fontSize="large"
                                                className="bookingCard__icon"
                                            />
                                        )}
                                        {bookingData.persons}{' '}
                                        {bookingData.persons > 1 ? 'Persons' : 'Person'}
                                    </Typography>
                                </div>
                            </div>

                            <div className="bookingCard__bookingDetailsRight">
                                <Typography variant="h5" color="textSecondary">
                                    <PaymentIcon
                                        fontSize="large"
                                        className="bookingCard__icon"
                                    />
                                    <NumberFormat
                                        value={
                                            bookingData.serviceBooked.price *
                                            bookingData.persons
                                        }
                                        prefix={'INR '}
                                        thousandSeparator={true}
                                        displayType={'text'}
                                    />
                                    <Chip
                                        size="small"
                                        label="PAID"
                                        icon={<CheckCircleIcon />}
                                        color="secondary"
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#27ae60',
                                            marginLeft: '10px',
                                        }}
                                    />
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    className="bookingCard__startDate"
                                >
                                    <EventIcon
                                        fontSize="large"
                                        className="bookingCard__icon"
                                    />
                                    Start Date:{' '}
                                    {new Date(
                                        bookingData.serviceBooked.startDate
                                    ).toDateString()}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    <Brightness4Icon
                                        fontSize="large"
                                        className="bookingCard__icon"
                                    />
                                    Number of Days: {bookingData.serviceBooked.days}
                                </Typography>
                            </div>
                        </div>

                        <Divider
                            variant="middle"
                            light={true}
                            className="bookingCard__divider"
                        />

                        <Typography variant="h6" color="textSecondary">
                            Overview
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {bookingData.serviceBooked.overview.slice(0, 250)}...
                            <span
                                className="bookingCard__readMore"
                                onClick={handleExpandClick}
                            >
                                [Read More]
                            </span>
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
                        <Typography variant="h6" color="textSecondary">
                            Overview
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {bookingData.serviceBooked.overview}
                        </Typography>
                        <Divider
                            variant="middle"
                            light={true}
                            className="bookingCard__divider"
                        />

                        <Typography variant="h6" color="textSecondary">
                            Highlights
                        </Typography>
                        {bookingData.serviceBooked.highlights.map((highlight) => (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom={true}
                                key={uuid()}
                            >
                                <StarRateIcon className="bookingCard__bulletPoint" />{' '}
                                {highlight}
                            </Typography>
                        ))}
                        <Divider
                            variant="middle"
                            light={true}
                            className="bookingCard__divider"
                        />

                        <Typography variant="h6" color="textSecondary">
                            Itinerary
                        </Typography>
                        {bookingData.serviceBooked.itinerary.map((it, index) => (
                            <Fragment key={uuid()}>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    className="bookingCard__subHeading"
                                >
                                    <Brightness4Icon className="bookingCard__bulletPoint" />{' '}
                                    Day {index + 1}:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    gutterBottom={true}
                                    style={{ paddingLeft: '30px' }}
                                >
                                    {it}
                                </Typography>
                            </Fragment>
                        ))}
                        <Divider
                            variant="middle"
                            light={true}
                            className="bookingCard__divider"
                        />

                        <Typography variant="h6" color="textSecondary">
                            Included
                        </Typography>
                        {bookingData.serviceBooked.inclusions.map((inclusion) => (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom={true}
                                key={uuid()}
                            >
                                <CheckIcon className="bookingCard__bulletPoint" />{' '}
                                {inclusion}
                            </Typography>
                        ))}
                        <Divider
                            variant="middle"
                            light={true}
                            className="bookingCard__divider"
                        />

                        <Typography variant="h6" color="textSecondary">
                            Excluded
                        </Typography>
                        {bookingData.serviceBooked.exclusions.map((exclusion) => (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                gutterBottom={true}
                                key={uuid()}
                            >
                                <RemoveIcon className="bookingCard__bulletPoint" />{' '}
                                {exclusion}
                            </Typography>
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            endIcon={<SentimentVeryDissatisfiedIcon />}
                            style={{
                                marginLeft: 'auto',
                                marginBottom: '5px',
                                marginRight: '5px',
                            }}
                            onClick={() => setIsOpen(true)}
                        >
                            Cancel Booking
                        </Button>
                    </CardActions>
                </Collapse>
            </Card>

            <ConfirmModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setConfirm={setCancelBookingConfirm}
                content={
                    'Cancellation charges will be deducted according to our Cancellation Policy. Still sure to cancel this Booking ?'
                }
            />
        </>
    )
}

export default BookingCard
