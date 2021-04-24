import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'

import './AdminBookings.css'
import Loading from '../../../../utils/Comp/Loading'
import AdminBookingCard from './AdminBookingCard'


function AdminBookings({ bookingsData }) {
    const [groupedBookingsData, setGroupedBookingsData] = useState([])

    useEffect(() => {
        setGroupedBookingsData(_.groupBy(bookingsData, (booking) => booking.serviceBooked._id))
    }, [ bookingsData ])

    
    return (
        <Container className="adminBookings">
            <Typography variant="h4" color="textSecondary" gutterBottom={true} className="adminBookings__header">
                Bookings
            </Typography>
            <Divider light={true} className="adminBookings__divider" />
            { 
                bookingsData.length > 0 ? (
                    _.orderBy(Object.keys(groupedBookingsData), (serviceID) => (
                            groupedBookingsData[serviceID].reduce((acc, curr) => acc = acc + curr.persons, 0)), ['desc'])
                        .map(serviceID => (
                            <AdminBookingCard
                                key={serviceID}
                                serviceBookingData={groupedBookingsData[serviceID]}
                            />
                        ))
                ) : (
                    <Loading />
                )
            }
        </Container>
    )
}

export default AdminBookings
