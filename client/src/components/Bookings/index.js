import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from 'react-bootstrap/Container'
import _ from 'lodash'

import './Bookings.css'
import { UserContext } from '../../utils/Context/user'
import { getBookings } from '../../api/user'
import BookingCard from './BookingCard'
import Loading from '../../utils/Comp/Loading'
import AdvtBanner from '../../utils/Comp/AdvtBanner'

function Bookings({ setIsModalOpen, advtData }) {
    const userContext = useContext(UserContext)
    const [bookings, setBookings] = useState([])
    const [deletedBookingID, setDeletedBookingID] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchBookings = async (loggedInUser) => {
        let response = await getBookings(loggedInUser)
        setBookings(response.data)
    }

    useEffect(() => {
        if (!userContext.user) setIsModalOpen(true)
        else {
            fetchBookings(userContext.user)
                .then(() => setLoading(false))
                .catch((err) => console.log(err.response.data.error))
        }
    }, [userContext.user, setIsModalOpen])

    useEffect(() => {
        if (deletedBookingID)
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== deletedBookingID)
            )
    }, [deletedBookingID])

    return (
        <div className="bookings">
            <div className="bookings__header">
                <h1>My Bookings</h1>
            </div>
            {userContext.user ? (
                <Container className="bookings__cards">
                    {!loading ? (
                        bookings.length > 0 ? (
                            _.orderBy(
                                bookings,
                                [(booking) => booking.serviceBooked.startDate],
                                ['asc']
                            ).map((bookingData) => (
                                <BookingCard
                                    key={bookingData._id}
                                    bookingData={bookingData}
                                    setDeletedBookingID={setDeletedBookingID}
                                />
                            ))
                        ) : (
                            <Typography
                                variant="h3"
                                color="textSecondary"
                                style={{ margin: '100px 0', textAlign: 'center' }}
                            >
                                You have no bookings! Go and grab your package.
                            </Typography>
                        )
                    ) : (
                        <Loading />
                    )}

                    {advtData && (
                        <AdvtBanner image={advtData.image} link={advtData.link} />
                    )}
                </Container>
            ) : (
                <div className="bookings__notLoggedIn">
                    <div className="bookings__notLoggedInContentWrapper">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Login First
                        </Button>
                        <Typography variant="body2" color="textSecondary">
                            Login to See Your Bookings.
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Bookings
