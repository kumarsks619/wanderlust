import React, { useState, useEffect, useContext } from 'react'
import {
    Typography,
    FormLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Container,
    FormHelperText,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import EmailIcon from '@material-ui/icons/Email'
import { Alert } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

import './CreateOwn.css'
import { useSelectDynamicInputs } from '../../utils/Hook/useSelectDynamicInputs'
import ModalComp from '../../utils/Comp/ModalComp'
import { startEndCitiesData } from '../../constants/startEndCities'
import Loading from '../../utils/Comp/Loading'
import { UserContext } from '../../utils/Context/user'
import { createCustom } from '../../api/user'
import CreateOwnResult from './CreateOwnResult'

const CreateOwn = ({ destinationsData = [], pricesData = {}, setIsModalOpen }) => {
    const userContext = useContext(UserContext)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')
    const [endCity, setEndCity] = useState('')
    const [reachAssistance, setReachAssistance] = useState('With Us')
    const [reachTransport, setReachTransport] = useState('')
    const [vacationTransport, setVacationTransport] = useState('')
    const [stayPreference, setStayPreference] = useState('')
    const [foodPreference, setFoodPreference] = useState('')
    const [showAgent, setShowAgent] = useState(false)
    const [selectedDestination, setSelectedDestination] = useState({})
    const [responseMessage, setResponseMessage] = useState({})
    const [isResultOpen, setIsResultOpen] = useState(false)

    const {
        values: activities,
        setValues: setActivities,
        createInputs: createActivitiesInputs,
        handleInputAdd: handleActivityInputAdd,
    } = useSelectDynamicInputs(10, 'Activity', selectedDestination?.activities)

    useEffect(() => {
        setSelectedDestination(destinationsData.find((dest) => dest._id === destination))
    }, [destination])

    const doCreateCustom = async (customDetails, loggedInUser) => {
        let response = await createCustom(customDetails, loggedInUser)
        setResponseMessage(response.data)
        setIsResultOpen(true)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        if (!userContext.user) {
            setResponseMessage({
                errors: {
                    user: 'Login first to create your own packages !!!',
                },
            })
            setIsModalOpen(true)
        } else {
            const customDetails = {
                user: userContext.user.ID,
                destination,
                duration: {
                    start: startDate,
                    end: endDate,
                },
                startCity,
                endCity,
                reachAssistance,
                reachTransport: {
                    mode: reachTransport.split('||')[0],
                    price: Number(reachTransport.split('||')[1]),
                },
                spotTransport: {
                    mode: vacationTransport.split('||')[0],
                    price: Number(vacationTransport.split('||')[1]),
                },
                stay: {
                    preference: stayPreference.split('||')[0],
                    price: Number(stayPreference.split('||')[1]),
                },
                food: {
                    preference: foodPreference.split('||')[0],
                    price: Number(foodPreference.split('||')[1]),
                },
                activities: activities.map((activity) => ({
                    name: activity.split('||')[0],
                    price: Number(activity.split('||')[1]),
                })),
            }

            await doCreateCustom(customDetails, userContext.user).catch((err) =>
                setResponseMessage(err.response.data)
            )
        }
    }

    useEffect(() => {
        if (responseMessage.hasOwnProperty('message')) {
            setStartDate(null)
            setEndDate(null)
            setStartCity('')
            setDestination('')
            setEndCity('')
            setReachAssistance('withUs')
            setReachTransport('')
            setVacationTransport('')
            setStayPreference('')
            setFoodPreference('')
            setActivities([])
        }
    }, [responseMessage])

    useEffect(() => {
        if (userContext.user) setResponseMessage({})
    }, [userContext.user])

    return (
        <>
            <Container>
                <div className="createOwn__headerWrapper">
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                        Create Your Own Plan
                    </Typography>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<PhoneInTalkIcon />}
                        className="createOwn__agentBtn"
                        onClick={() => setShowAgent(true)}
                    >
                        Talk To Agent
                    </Button>
                </div>

                {destinationsData.length < 1 || Object.keys(pricesData).length < 1 ? (
                    <Loading />
                ) : (
                    <form className="createOwn__form" onSubmit={handleOnSubmit}>
                        <FormLabel className="createOwn__formLabel">
                            Event Dates
                        </FormLabel>
                        <div className="createOwn__formGroup1">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required
                                    autoOk
                                    disablePast
                                    variant="inline"
                                    inputVariant="outlined"
                                    color="secondary"
                                    format="dd/MM/yyyy"
                                    label="Start Date"
                                    value={startDate}
                                    onChange={setStartDate}
                                />
                            </MuiPickersUtilsProvider>

                            <TrendingFlatIcon className="createOwn__icon" />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required
                                    autoOk
                                    disablePast
                                    variant="inline"
                                    inputVariant="outlined"
                                    color="secondary"
                                    format="dd/MM/yyyy"
                                    label="End Date"
                                    value={endDate}
                                    onChange={setEndDate}
                                />
                            </MuiPickersUtilsProvider>
                        </div>

                        <FormLabel className="createOwn__formLabel">
                            Destination
                        </FormLabel>
                        <div className="createOwn__formGroup2">
                            <FormControl variant="outlined" color="secondary">
                                <InputLabel id="start-city">Start City</InputLabel>
                                <Select
                                    required
                                    labelId="start-city"
                                    label="Start City"
                                    value={startCity}
                                    onChange={(e) => setStartCity(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {startEndCitiesData.map((city, index) => (
                                        <MenuItem value={city} key={index}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TrendingFlatIcon className="createOwn__icon" />

                            <FormControl variant="outlined" color="secondary">
                                <InputLabel id="destination">
                                    Vacation Destination
                                </InputLabel>
                                <Select
                                    required
                                    labelId="destination"
                                    label="Vacation Destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {destinationsData.map((destination, index) => (
                                        <MenuItem value={destination._id} key={index}>
                                            {destination.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TrendingFlatIcon className="createOwn__icon" />

                            <FormControl variant="outlined" color="secondary">
                                <InputLabel id="end-city">End City</InputLabel>
                                <Select
                                    required
                                    labelId="start-city"
                                    label="End City"
                                    value={endCity}
                                    onChange={(e) => setEndCity(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {startEndCitiesData.map((city, index) => (
                                        <MenuItem value={city} key={index}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <FormLabel className="createOwn__formLabel">
                            How Will You Reach?
                        </FormLabel>
                        <div className="createOwn__formGroup3">
                            <FormControl component="fieldset" required>
                                <RadioGroup
                                    value={reachAssistance}
                                    onChange={(e) => setReachAssistance(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="On My Own"
                                        control={<Radio />}
                                        label="On Your Own"
                                    />
                                    <FormControlLabel
                                        value="With Us"
                                        control={<Radio />}
                                        label="With Us"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <TrendingFlatIcon className="createOwn__icon" />

                            <FormControl
                                variant="outlined"
                                color="secondary"
                                className="createOwn__reachTransport"
                            >
                                <InputLabel id="reach-transport">
                                    Mode Of Transport
                                </InputLabel>
                                <Select
                                    required={reachAssistance !== 'own'}
                                    labelId="reach-transport"
                                    label="Mode Of Transport"
                                    value={reachTransport}
                                    onChange={(e) => setReachTransport(e.target.value)}
                                    disabled={reachAssistance === 'own'}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem
                                        value={`Train||${pricesData.reachTransport.train}`}
                                    >
                                        Train
                                    </MenuItem>
                                    <MenuItem
                                        value={`Flight||${pricesData.reachTransport.flight}`}
                                    >
                                        Flight
                                    </MenuItem>
                                    <MenuItem
                                        value={`Road||${pricesData.reachTransport.road}`}
                                    >
                                        By Road
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="createOwn__formGroup4">
                            <FormLabel className="createOwn__formLabel">
                                Mode Of Transport At Vacation Spot:
                            </FormLabel>
                            <FormControl component="fieldset" required>
                                <RadioGroup
                                    value={vacationTransport}
                                    onChange={(e) => setVacationTransport(e.target.value)}
                                >
                                    <FormControlLabel
                                        value={`A/C||${pricesData.spotTransport.ac}`}
                                        control={<Radio />}
                                        label="A/C"
                                    />
                                    <FormControlLabel
                                        value={`Non-AC||${pricesData.spotTransport.nonAc}`}
                                        control={<Radio />}
                                        label="Non-A/C"
                                    />
                                    <FormControlLabel
                                        value={`Local||${pricesData.spotTransport.local}`}
                                        control={<Radio />}
                                        label="Local"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="createOwn__formGroup5">
                            <FormLabel className="createOwn__formLabel">
                                Stay Preference:
                            </FormLabel>
                            <FormControl component="fieldset" required>
                                <RadioGroup
                                    value={stayPreference}
                                    onChange={(e) => setStayPreference(e.target.value)}
                                >
                                    <FormControlLabel
                                        value={`2-Star||${pricesData.stay.twoStar}`}
                                        control={<Radio />}
                                        label="2 Star"
                                    />
                                    <FormControlLabel
                                        value={`3-Star||${pricesData.stay.threeStar}`}
                                        control={<Radio />}
                                        label="3 Star"
                                    />
                                    <FormControlLabel
                                        value={`4-Star||${pricesData.stay.fourStar}`}
                                        control={<Radio />}
                                        label="4 Star"
                                    />
                                    <FormControlLabel
                                        value={`5-Star||${pricesData.stay.fiveStar}`}
                                        control={<Radio />}
                                        label="5 Star"
                                    />
                                    <FormControlLabel
                                        value={`Lodges||${pricesData.stay.lodges}`}
                                        control={<Radio />}
                                        label="Lodges"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="createOwn__formGroup4">
                            <FormLabel
                                className="createOwn__formLabel"
                                style={{ width: '40%' }}
                            >
                                Food Preference:
                            </FormLabel>
                            <FormControl component="fieldset" required>
                                <RadioGroup
                                    value={foodPreference}
                                    onChange={(e) => setFoodPreference(e.target.value)}
                                >
                                    <FormControlLabel
                                        value={`Veg||${pricesData.food.veg}`}
                                        control={<Radio />}
                                        label="Veg"
                                    />
                                    <FormControlLabel
                                        value={`Non-Veg||${pricesData.food.nonVeg}`}
                                        control={<Radio />}
                                        label="Non-Veg"
                                    />
                                    <FormControlLabel
                                        value={`Jain||${pricesData.food.jain}`}
                                        control={<Radio />}
                                        label="Jain"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <FormLabel className="createOwn__formLabel">Activities</FormLabel>
                        <div className="createOwn__formGroup6">
                            {createActivitiesInputs()}
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<AddCircleIcon />}
                                onClick={handleActivityInputAdd}
                                className="createOwn__addBtn"
                            >
                                Add Activity
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="small"
                            className="createOwn__submitBtn"
                        >
                            Create Plan
                        </Button>
                    </form>
                )}
                {(responseMessage.hasOwnProperty('errors') ||
                    responseMessage.hasOwnProperty('message')) &&
                    (responseMessage.hasOwnProperty('errors') ? (
                        Object.keys(responseMessage.errors).map((errorKey) => (
                            <Alert variant="danger" key={uuid()}>
                                {responseMessage.errors[errorKey]}
                            </Alert>
                        ))
                    ) : (
                        <Alert variant="success">{responseMessage.message}</Alert>
                    ))}
            </Container>

            <ModalComp isModalOpen={showAgent} setIsModalOpen={setShowAgent}>
                <Typography
                    variant="h5"
                    color="textSecondary"
                    style={{ marginBottom: '20px' }}
                >
                    Talk To Agent
                </Typography>
                <Typography variant="h6">
                    <PhoneInTalkIcon /> Telephone: +512-2255-9966, +512-6655-7700
                </Typography>
                <Typography variant="h6">
                    <EmailIcon /> Email: wander.lust@gmail.com
                </Typography>
                <FormHelperText>
                    You can also drop your query in the contact form at the footer of the
                    website.
                </FormHelperText>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowAgent(false)}
                    className="createOwn__okayBtn"
                >
                    Okay
                </Button>
            </ModalComp>

            <CreateOwnResult
                isResultOpen={isResultOpen}
                setIsResultOpen={setIsResultOpen}
                summary={responseMessage}
            />
        </>
    )
}

export default CreateOwn
