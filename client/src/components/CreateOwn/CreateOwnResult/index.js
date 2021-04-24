import React, { useEffect, useState } from 'react'
import { Typography, Divider } from '@material-ui/core'
import NumberFormat from 'react-number-format'

import './CreateOwnResult.css'
import ModalComp from '../../../utils/Comp/ModalComp'

const CreateOwnResult = ({
    isResultOpen,
    setIsResultOpen,
    summary: { createdCustom },
}) => {
    const [totalEstimate, setTotalEstimate] = useState(0)

    const calculateTotal = (createdCustom) => {
        if (createdCustom) {
            const {
                destination,
                reachTransport,
                spotTransport,
                stay,
                food,
                activities,
            } = createdCustom

            let total = 0

            if (destination && destination.price) {
                total = total + destination.price
            }

            if (reachTransport && reachTransport.price) {
                total = total + reachTransport.price
            }

            if (spotTransport && spotTransport.price) {
                total = total + spotTransport.price
            }

            if (stay && stay.price) {
                total = total + stay.price
            }

            if (food && food.price) {
                total = total + food.price
            }

            if (activities && activities.length > 0) {
                activities.forEach((activity) => {
                    total = total + activity.price
                })
            }

            return total
        }
    }

    useEffect(() => {
        setTotalEstimate(calculateTotal(createdCustom))
    }, [createdCustom])

    return (
        <ModalComp isModalOpen={isResultOpen} setIsModalOpen={setIsResultOpen}>
            <div className="createOwnResult">
                <Typography variant="h4">Summary</Typography>
                <Divider light={true} className="createOwnResult__divider" />

                <div className="createOwnResult__group">
                    <Typography variant="h5">
                        Destination: <strong>{createdCustom?.destination.name}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.destination.price}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                <div className="createOWnResult__listWrapper">
                    <Typography variant="body1">Attraction Spots:</Typography>
                    <ul>
                        {createdCustom &&
                            createdCustom.destination &&
                            createdCustom.destination.spots.map((spot, index) => (
                                <li key={index}>{spot}</li>
                            ))}
                    </ul>
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Start Date:{' '}
                        <strong>
                            {new Date(createdCustom?.duration.start).toDateString()}
                        </strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        End Date:{' '}
                        <strong>
                            {new Date(createdCustom?.duration.end).toDateString()}
                        </strong>
                    </Typography>
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Start City: <strong>{createdCustom?.startCity}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        End City: <strong>{createdCustom?.endCity}</strong>
                    </Typography>
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        You will Reach: <strong>{createdCustom?.reachAssistance}</strong>
                    </Typography>

                    {createdCustom?.reachAssistance === 'withUs' && (
                        <>
                            <span></span>
                            <Typography variant="body1">
                                <strong>
                                    {createdCustom?.reachTransport.mode} ---{' '}
                                    <NumberFormat
                                        value={createdCustom?.reachTransport.price}
                                        prefix={'INR '}
                                        thousandSeparator={true}
                                        displayType={'text'}
                                    />
                                </strong>
                            </Typography>
                        </>
                    )}
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Mode of Transport at Vacation Spot:{' '}
                        <strong>{createdCustom?.spotTransport.mode}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.spotTransport.price}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Stay Preference: <strong>{createdCustom?.stay.preference}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.stay.price}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="body1">
                        Food Preference: <strong>{createdCustom?.food.preference}</strong>
                    </Typography>
                    <span></span>
                    <Typography variant="body1">
                        <strong>
                            <NumberFormat
                                value={createdCustom?.food.price}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>

                <div className="createOWnResult__actListWrapper">
                    <Typography variant="body1">Activities:</Typography>
                    <ul>
                        {createdCustom &&
                            createdCustom.activities &&
                            createdCustom.activities.map((activity) => (
                                <li key={activity._id}>
                                    <span>
                                        <strong> {activity.name}</strong>
                                    </span>
                                    <span></span>
                                    <span>
                                        <strong>
                                            <NumberFormat
                                                value={activity.price}
                                                prefix={'INR '}
                                                thousandSeparator={true}
                                                displayType={'text'}
                                            />
                                        </strong>
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="createOwnResult__group">
                    <Typography variant="h4">Estimated Cost:</Typography>
                    <span></span>
                    <Typography variant="h4">
                        <strong>
                            <NumberFormat
                                value={totalEstimate}
                                prefix={'INR '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </strong>
                    </Typography>
                </div>
            </div>
        </ModalComp>
    )
}

export default CreateOwnResult
