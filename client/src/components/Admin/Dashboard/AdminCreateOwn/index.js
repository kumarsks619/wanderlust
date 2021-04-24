import React, { useState, useContext } from 'react'
import {
    Container,
    Typography,
    Divider,
    TextField,
    Button,
    InputLabel,
} from '@material-ui/core'
import { Alert } from 'react-bootstrap'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import './AdminCreateOwn.css'
import { useDynamicInputs } from '../../../../utils/Hook/useDynamicInputs'
import { useDoubleDynamicInputs } from '../../../../utils/Hook/useDoubleDynamicInputs'
import { AdminContext } from '../../../../utils/Context/admin'
import { addDestination, updatePrices } from '../../../../api/admin'
import AdminCustomItem from './AdminCustomItem'

const AdminCreateOwn = ({ prices, setPrices, customData }) => {
    const adminContext = useContext(AdminContext)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [responseMessage, setResponseMessage] = useState({})
    const [pricesResponse, setPricesResponse] = useState({})

    const {
        values: spots,
        setValues: setSpots,
        createInputs: createSpotsInputs,
        handleInputAdd: handleSpotsInputAdd,
    } = useDynamicInputs(10, 'Spot')

    const {
        values: activities,
        setValues: setActivities,
        createInputs: createActivitiesInputs,
        handleInputAdd: handleActivitiesInputAdd,
    } = useDoubleDynamicInputs(100, 'Activity')

    const handleDataFormReset = () => {
        setName('')
        setPrice(0)
        setSpots([''])
        setActivities([{ name: '', price: 0 }])
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const destinationDetails = {
            name,
            price,
            spots,
            activities,
        }

        try {
            const response = await addDestination(
                destinationDetails,
                adminContext.admin?.adminToken
            )
            setResponseMessage(response.data)
            handleDataFormReset()
        } catch (err) {
            setResponseMessage(err.response.data)
        }
    }

    const handleInputChange = (e) =>
        setPrices({ ...prices, [e.target.name]: e.target.value })

    const handlePricesSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updatePrices(prices, adminContext.admin?.adminToken)
            setPricesResponse(response.data)
        } catch (err) {
            setPricesResponse(err.response.data)
        }
    }

    return (
        <>
            <Container>
                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom={true}
                    className="adminCreateOwn__header"
                >
                    Create Own
                </Typography>
                <Divider light={true} className="adminCreateOwn__divider" />

                <form className="adminCreateOwn__form" onSubmit={handleFormSubmit}>
                    <div className="adminCreateOwn__formGroup1">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Destination"
                            placeholder="Destination Name"
                            className="adminCreateOwn__name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            type="number"
                            variant="outlined"
                            color="secondary"
                            label="Price"
                            placeholder="Price of the Destination"
                            className="adminCreateOwn__price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="adminCreateOwn__dataFormDynamicInput">
                        <div className="adminCreateOwn__dataFormGroup2">
                            <InputLabel>Attraction Spots</InputLabel>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<AddCircleIcon />}
                                onClick={handleSpotsInputAdd}
                                className="adminCreateOwn__dataFormBtn"
                            >
                                Add
                                <span className="adminHome__dataFormResponsiveHidden">
                                    Attraction Spot
                                </span>
                            </Button>
                        </div>
                        {createSpotsInputs()}
                    </div>

                    <div className="adminCreateOwn__dataFormDynamicInput">
                        <div className="adminCreateOwn__dataFormGroup2">
                            <InputLabel>Activities</InputLabel>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<AddCircleIcon />}
                                onClick={handleActivitiesInputAdd}
                                className="adminCreateOwn__dataFormBtn"
                            >
                                Add
                                <span className="adminHome__dataFormResponsiveHidden">
                                    Activity
                                </span>
                            </Button>
                        </div>
                        {createActivitiesInputs()}
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        className="adminCreateOwn__formBtn"
                    >
                        Save Destination
                    </Button>
                </form>
                {Object.keys(responseMessage).length > 0 &&
                    (responseMessage.hasOwnProperty('error') ? (
                        <Alert variant="danger" style={{ fontSize: '1.2rem' }}>
                            {responseMessage.error}
                        </Alert>
                    ) : (
                        <Alert variant="success" style={{ fontSize: '1.2rem' }}>
                            {responseMessage.message}
                        </Alert>
                    ))}

                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom={true}
                    className="adminCreateOwn__header"
                    style={{ marginTop: '50px' }}
                >
                    Set Prices
                </Typography>
                <Divider light={true} className="adminCreateOwn__divider" />

                <form
                    className="adminCreateOwn__pricesForm"
                    onSubmit={handlePricesSubmit}
                >
                    <InputLabel>Mode of Transport</InputLabel>
                    <div className="adminCreateOwn__pricesFormGroup">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Train"
                            placeholder="Price for Train"
                            name="train"
                            value={prices.train}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Flight"
                            placeholder="Price for Flight"
                            name="flight"
                            value={prices.flight}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="By Road"
                            placeholder="Price for by  Road"
                            name="road"
                            value={prices.road}
                            onChange={handleInputChange}
                        />
                    </div>

                    <InputLabel>Mode of Transport At Vacation Spot</InputLabel>
                    <div className="adminCreateOwn__pricesFormGroup">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="A/C"
                            placeholder="Price for A/C"
                            name="ac"
                            value={prices.ac}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Non-A/C"
                            placeholder="Price for Non-A/C"
                            name="nonAc"
                            value={prices.nonAc}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Local"
                            placeholder="Price for Local"
                            name="local"
                            value={prices.local}
                            onChange={handleInputChange}
                        />
                    </div>

                    <InputLabel>Stay Preference</InputLabel>
                    <div className="adminCreateOwn__pricesFormGroup">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="2 Star"
                            placeholder="Price for 2 Star"
                            name="twoStar"
                            value={prices.twoStar}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="3 Star"
                            placeholder="Price for 3 Star"
                            name="threeStar"
                            value={prices.threeStar}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="4 Star"
                            placeholder="Price for 4 Star"
                            name="fourStar"
                            value={prices.fourStar}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="5 Star"
                            placeholder="Price for 5 Star"
                            name="fiveStar"
                            value={prices.fiveStar}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Lodges"
                            placeholder="Price for Lodges"
                            name="lodges"
                            value={prices.lodges}
                            onChange={handleInputChange}
                        />
                    </div>

                    <InputLabel>Food Preference</InputLabel>
                    <div className="adminCreateOwn__pricesFormGroup">
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Veg Food"
                            placeholder="Price for Veg Food"
                            name="veg"
                            value={prices.veg}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Non-Veg Food"
                            placeholder="Price for Non-Food"
                            name="nonVeg"
                            value={prices.nonVeg}
                            onChange={handleInputChange}
                        />
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Jain Food"
                            placeholder="Price for Jain Food"
                            name="jain"
                            value={prices.jain}
                            onChange={handleInputChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        className="adminCreateOwn__formBtn"
                    >
                        Set Prices
                    </Button>
                </form>

                {Object.keys(pricesResponse).length > 0 &&
                    (pricesResponse.hasOwnProperty('error') ? (
                        <Alert variant="danger" style={{ fontSize: '1.2rem' }}>
                            {pricesResponse.error}
                        </Alert>
                    ) : (
                        <Alert variant="success" style={{ fontSize: '1.2rem' }}>
                            {pricesResponse.message}
                        </Alert>
                    ))}

                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom={true}
                    className="adminCreateOwn__header"
                    style={{ marginTop: '50px' }}
                >
                    Custom Packages
                </Typography>
                <Divider light={true} className="adminCreateOwn__divider" />

                {customData &&
                    customData.map((custom) => (
                        <AdminCustomItem key={custom._id} custom={custom} />
                    ))}
            </Container>
        </>
    )
}

export default AdminCreateOwn
