import React, { useEffect, useState, Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Typography from '@material-ui/core/Typography'
import { v4 as uuid } from 'uuid'
import Brightness6Icon from '@material-ui/icons/Brightness6'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import StarsIcon from '@material-ui/icons/Stars'
import AddBoxIcon from '@material-ui/icons/AddBox'
import EventIcon from '@material-ui/icons/Event'
import PaymentIcon from '@material-ui/icons/Payment'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import NumberFormat from 'react-number-format'
import Chip from '@material-ui/core/Chip'

import './Individual.css'
import { getService } from '../../api/admin'
import Loading from '../../utils/Comp/Loading'
import BookingForm from './BookingForm'
import { goodToKnowData } from '../../constants/goodToKnow'
import AdvtBanner from '../../utils/Comp/AdvtBanner'

function Individual({ match, setIsModalOpen, advtData }) {
    const serviceID = match.params.serviceID
    const [oneServiceData, setOneServiceData] = useState({})

    const fetchService = async (serviceID) => {
        let response = await getService(serviceID)
        setOneServiceData(response.data)
    }

    useEffect(() => {
        try {
            fetchService(serviceID)
        } catch (err) {
            console.log(err)
        }
    }, [serviceID])

    return Object.keys(oneServiceData).length > 0 ? (
        <Container className="individual">
            <div className="individual__image">
                <img src={oneServiceData.image} alt={oneServiceData.title} />
            </div>

            <Typography variant="h3" className="individual__title">
                {oneServiceData.title.toLowerCase()}
                {oneServiceData.isSpecial && (
                    <Chip
                        size="medium"
                        label="SPECIAL"
                        icon={<StarsIcon style={{ color: '#fff' }} />}
                        color="secondary"
                        style={{
                            color: '#fff',
                            backgroundColor: '#f1c40f',
                            marginLeft: '10px',
                            fontWeight: '700',
                        }}
                    />
                )}
            </Typography>

            <Typography variant="h5" className="individual__heading">
                Overview
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                className="individual__body"
            >
                {oneServiceData.overview}
            </Typography>

            <Typography variant="h5" color="textSecondary">
                Highlights:
            </Typography>
            <div className="individual__body">
                {oneServiceData.highlights.map((highlight) => (
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        key={uuid()}
                        gutterBottom={true}
                    >
                        <StarsIcon className="individual__bullet" />
                        {highlight}
                    </Typography>
                ))}
            </div>

            <Typography variant="h5" className="individual__heading">
                Excluded
            </Typography>
            <div className="individual__body">
                {oneServiceData.itinerary.map((it, index) => (
                    <Fragment key={uuid()}>
                        <Typography variant="h5" color="textSecondary">
                            <Brightness6Icon className="individual__bullet" />
                            Day {index + 1}:
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            style={{ paddingLeft: '30px' }}
                            gutterBottom={true}
                        >
                            {it}
                        </Typography>
                    </Fragment>
                ))}
            </div>

            <Typography variant="h5" className="individual__heading">
                Included
            </Typography>
            <div className="individual__body">
                {oneServiceData.inclusions.map((inclusion) => (
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        key={uuid()}
                        gutterBottom={true}
                    >
                        <AddBoxIcon className="individual__bullet" />
                        {inclusion}
                    </Typography>
                ))}
            </div>

            <Typography variant="h5" className="individual__heading">
                Excluded
            </Typography>
            <div className="individual__body">
                {oneServiceData.exclusions.map((exclusion) => (
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        key={uuid()}
                        gutterBottom={true}
                    >
                        <IndeterminateCheckBoxIcon className="individual__bullet" />
                        {exclusion}
                    </Typography>
                ))}
            </div>

            <Typography variant="h5" className="individual__heading">
                Good to Know
            </Typography>
            <div className="individual__body">
                {goodToKnowData.map((point) => (
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        key={uuid()}
                        gutterBottom={true}
                    >
                        <CheckCircleIcon className="individual__bullet" />
                        {point}
                    </Typography>
                ))}
            </div>

            {advtData && <AdvtBanner image={advtData.image} link={advtData.link} />}

            <Typography variant="h5" className="individual__heading">
                Event Details
            </Typography>
            <div className="individual__detailsAndFormWrapper">
                <div className="individual__details">
                    <Typography variant="body1" color="textPrimary">
                        <span className="individual__detail">
                            <EventIcon className="individual__eventIcon" />
                            {new Date(oneServiceData.startDate).toDateString()}
                        </span>
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        style={{ margin: '20px 0' }}
                    >
                        <span className="individual__detail">
                            <Brightness4Icon className="individual__eventIcon" />
                            {oneServiceData.days}{' '}
                            {oneServiceData.days > 1 ? 'Days' : 'Day'}
                        </span>
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                        <span className="individual__detail">
                            <PaymentIcon className="individual__eventIcon" />
                            <NumberFormat
                                value={oneServiceData.price}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </span>
                    </Typography>
                </div>
                <BookingForm
                    setIsModalOpen={setIsModalOpen}
                    serviceID={match.params.serviceID}
                />
            </div>
        </Container>
    ) : (
        <Loading />
    )
}

export default Individual
