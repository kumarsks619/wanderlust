import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import TextField from '@material-ui/core/TextField'


export const useDynamicInputs = (keyModifier, label) => {
    const [values, setValues] = useState([""])


    const handleInputAdd = () => {
        setValues([
            ...values,
            ""
        ])
    }

    const handleInputChange = (index, e) => {
        let vals = [ ...values ]
        vals[index] = e.target.value
        setValues(vals)
    }


    const createInputs = () => (
        values.map((input, index) => (
            <div key={index * keyModifier} className="dynamicInput">
                <TextField
                    required 
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label={`${label} ${index + 1}`}
                    value={input || ""}
                    onChange={handleInputChange.bind(this, index)}
                />
                <IconButton
                    color="secondary"
                    onClick={handleInputRemove.bind(this, index)}
                >
                    <CancelIcon />
                </IconButton>
            </div>
        ))
    )


    const handleInputRemove = (index) => {
        let vals = [ ...values ]
        vals.splice(index, 1)
        setValues(vals)
    }


    return {
        values,
        setValues,
        createInputs,
        handleInputAdd
    }
}