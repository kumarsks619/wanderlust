import React from 'react'
import { Typography } from '@material-ui/core'
import NumberFormat from 'react-number-format'

import './AdminCustomItem.css'

const AdminCustomItem = ({ custom }) => {
    return (
        <div className="adminCustomItem">
            <Typography variant="h5">
                Destination: <strong>{custom?.destination.name}</strong>
            </Typography>

            <Typography variant="body1">Attraction Spots:</Typography>
            <ul>
                {custom?.destination.spots.map((spot, index) => (
                    <li key={index}>{spot}</li>
                ))}
            </ul>

            <Typography variant="body1">
                Start Date:{' '}
                <strong> {new Date(custom?.duration.start).toDateString()}</strong>
            </Typography>

            <Typography variant="body1">
                End Date:{' '}
                <strong> {new Date(custom?.duration.end).toDateString()}</strong>
            </Typography>

            <Typography variant="body1">
                Start City: <strong> {custom?.startCity}</strong>
            </Typography>

            <Typography variant="body1">
                End City: <strong> {custom?.endCity}</strong>
            </Typography>

            <Typography variant="body1">
                Reach Assistance: <strong>{custom?.reachAssistance}</strong>
            </Typography>

            {custom && custom.reachAssistance === 'With Us' && (
                <Typography variant="body1">
                    Reach Transport:{' '}
                    <strong>
                        {custom?.reachTransport.mode} ---{' '}
                        <NumberFormat
                            value={custom?.reachTransport.price}
                            prefix={'INR '}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
                    </strong>
                </Typography>
            )}

            <Typography variant="body1">
                Transport At Spot:{' '}
                <strong>
                    {custom?.spotTransport.mode} ---{' '}
                    <NumberFormat
                        value={custom?.spotTransport.price}
                        prefix={'INR '}
                        thousandSeparator={true}
                        displayType={'text'}
                    />
                </strong>
            </Typography>

            <Typography variant="body1">
                Stay Preference:{' '}
                <strong>
                    {custom?.stay.preference} ---{' '}
                    <NumberFormat
                        value={custom?.stay.price}
                        prefix={'INR '}
                        thousandSeparator={true}
                        displayType={'text'}
                    />
                </strong>
            </Typography>

            <Typography variant="body1">
                Food Preference:{' '}
                <strong>
                    {custom?.food.preference} ---{' '}
                    <NumberFormat
                        value={custom?.food.price}
                        prefix={'INR '}
                        thousandSeparator={true}
                        displayType={'text'}
                    />
                </strong>
            </Typography>

            <Typography variant="body1">Selected Activities:</Typography>
            <ul>
                {custom &&
                    custom.activities.map((activity) => (
                        <li key={activity._id}>
                            <strong>
                                {activity.name} ---{' '}
                                <NumberFormat
                                    value={activity.price}
                                    prefix={'INR '}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            </strong>
                        </li>
                    ))}
            </ul>

            <Typography variant="body1">Created By:</Typography>
            <Typography variant="body1">
                Name:{' '}
                <strong>
                    {custom?.user.firstName} {custom?.user.lastName}
                </strong>
            </Typography>
            <Typography variant="body1">
                Email: <strong>{custom?.user.email}</strong>
            </Typography>
        </div>
    )
}

export default AdminCustomItem
