import React, { useState, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FileBase from 'react-file-base64'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import InputAdornment from '@material-ui/core/InputAdornment'
import Alert from 'react-bootstrap/Alert'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'


import { useDynamicInputs } from '../../../../utils/Hook/useDynamicInputs'
import { addService } from '../../../../api/admin'
import { AdminContext } from '../../../../utils/Context/admin'
import './AdminHome.css'


function AdminHome({ setNewService }) {
    const adminContext = useContext(AdminContext)
    const [responseMessage, setResponseMessage] = useState({})

    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [isSpecial, setIsSpecial] = useState(false)
    const [image, setImage] = useState("")
    const [overview, setOverview] = useState("")
    const [days, setDays] = useState(0)
    const [startDate, setStartDate] = useState(null)
    const [price, setPrice] = useState(0)

    const {
        values: highlights,
        setValues: setHighlights,
        createInputs: createHighlightInputs,
        handleInputAdd: handleHighlightsInputAdd,
    } = useDynamicInputs(10, "Highlight")

    const {
        values: itinerary,
        setValues: setItinerary,
        createInputs: createItineraryInputs,
        handleInputAdd: handleItineraryInputAdd,
    } = useDynamicInputs(100, "Day")

    const {
        values: inclusions,
        setValues: setInclusions,
        createInputs: createInclusionInputs,
        handleInputAdd: handleInclusionInputAdd,
    } = useDynamicInputs(1000, "Inclusion")

    const {
        values: exclusions,
        setValues: setExclusions,
        createInputs: createExclusionInputs,
        handleInputAdd: handleExclusionInputAdd,
    } = useDynamicInputs(10000, "Exclusion")


    const handleDataFormReset = () => {
        setType("")
        setTitle("")
        setIsSpecial(false)
        setOverview("")
        setHighlights([""])
        setItinerary([""])
        setInclusions([""])
        setExclusions([""])
        setDays(0)
        setStartDate(null)
        setPrice(0)
    }


    const handleDataFormSubmit = async (e) => {
        e.preventDefault()

        const serviceDetails = {
            type,
            title,
            isSpecial,
            overview,
            highlights,
            itinerary,
            inclusions,
            exclusions,
            startDate: startDate.toISOString(),
            days,
            price,
            image
        }

        try {
            const response = await addService(serviceDetails, adminContext.admin?.adminToken)
            setResponseMessage(response.data)
            setNewService(response.data.addedService)
            handleDataFormReset()
        } catch (err) {
            setResponseMessage(err.response.data)
        }
    }


    return (
        <Container className="adminHome">
            <form className="adminHome__dataForm" onSubmit={handleDataFormSubmit}>
                <InputLabel className="adminHome__dataFormHeader"><h1>Add a {type ? type.slice(0, -1) : "Service"}</h1></InputLabel>
                <Divider light={true} className="adminService__divider" />
                
                <div className="adminHome__dataFormGroup1">
                    <FormControl variant="outlined" color="secondary">
                        <InputLabel id="service-type">Type</InputLabel>
                        <Select
                            required
                            labelId="service-type"
                            label="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Treks">Treks</MenuItem>
                            <MenuItem value="Camps">Camps</MenuItem>
                            <MenuItem value="Packages">Packages</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Title"
                        placeholder="Heading or Name or Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormControlLabel
                        control={
                            <Switch 
                                checked={isSpecial} 
                                onChange={() => setIsSpecial(prevIsSpecial => !prevIsSpecial)} 
                            />
                        }
                        label={ isSpecial ? "Special" : "Usual" }
                    />
                </div>


                <TextField
                    required
                    multiline
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Overview"
                    placeholder="Description of the Trip/Trek/Package"
                    rows={5}
                    rowsMax={10}
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                />


                <div className="adminHome__dataFormDynamicInput">
                    <div className="adminHome__dataFormGroup2">
                        <InputLabel>Highlights</InputLabel>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            onClick={handleHighlightsInputAdd}
                            className="adminHome__dataFormBtn"
                        >
                            Add<span className="adminHome__dataFormResponsiveHidden">Highlight</span>
                        </Button>
                    </div>
                    {createHighlightInputs()}
                </div>


                <div className="adminHome__dataFormDynamicInput">
                    <div className="adminHome__dataFormGroup2">
                        <InputLabel>Itinerary</InputLabel>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            onClick={handleItineraryInputAdd}
                            className="adminHome__dataFormBtn"
                        >
                            Add<span className="adminHome__dataFormResponsiveHidden">Itinerary</span>
                        </Button>
                    </div>
                    {createItineraryInputs()}
                </div>


                <div className="adminHome__dataFormDynamicInput">
                    <div className="adminHome__dataFormGroup2">
                        <InputLabel>Inclusions</InputLabel>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            onClick={handleInclusionInputAdd}
                            className="adminHome__dataFormBtn"
                        >
                            Add<span className="adminHome__dataFormResponsiveHidden">Inclusion</span>
                        </Button>
                    </div>
                    {createInclusionInputs()}
                </div>


                <div className="adminHome__dataFormDynamicInput">
                    <div className="adminHome__dataFormGroup2">
                        <InputLabel>Exclusions</InputLabel>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            onClick={handleExclusionInputAdd}
                            className="adminHome__dataFormBtn"
                        >
                            Add<span className="adminHome__dataFormResponsiveHidden">Exclusion</span>
                        </Button>
                    </div>
                    {createExclusionInputs()}
                </div>


                <div className="adminHome__dataFormGroup3">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            autoOk
                            disablePast 
                            variant="inline"
                            inputVariant="outlined"
                            color="secondary"
                            format="dd/MM/yyyy"
                            label="Start Date of Event"
                            value={startDate}
                            onChange={setStartDate}
                        />
                    </MuiPickersUtilsProvider>
                    
                    <TextField
                        required
                        type="number"
                        variant="outlined"
                        color="secondary"
                        label="Number of Days"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                        }}
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="adminHome__dataFormNumOfDays"
                    />

                    <TextField
                        required
                        type="number"
                        variant="outlined"
                        color="secondary"
                        label="Price"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">INR</InputAdornment>,
                        }}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <label className="adminHome__dataFormImage">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setImage(base64)}
                        />
                        { image ? "Image Selected" : "Choose an Image" }
                    </label>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="adminHome__dataFormSubmitBtn adminHome__dataFormBtn"
                >
                    Add a {type ? type.slice(0, -1) : "Service"}
                </Button>

                {
                    (responseMessage.hasOwnProperty("error") || responseMessage.hasOwnProperty("message")) && (
                        responseMessage.hasOwnProperty("error") ? (
                            <Alert variant="danger" className="adminHome__dataFormMessage">{responseMessage.error}</Alert>
                        ) : (
                            <Alert variant="success" className="adminHome__dataFormMessage">{responseMessage.message}</Alert>
                        )
                    )
                }
            </form>
        </Container>
    )
}

export default AdminHome
