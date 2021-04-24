import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

export const useSelectDynamicInputs = (keyModifier, label, options = []) => {
    const [values, setValues] = useState([])

    const handleInputAdd = () => {
        setValues([...values, ''])
    }

    const handleInputChange = (index, e) => {
        let vals = [...values]
        vals[index] = e.target.value
        setValues(vals)
    }

    const createInputs = () =>
        values.map((input, index) => (
            <div key={index * keyModifier} className="dynamicInput">
                <FormControl variant="outlined" color="secondary">
                    <InputLabel id={`${label}-${index + 1}`}>
                        {`${label} ${index + 1}`}
                    </InputLabel>
                    <Select
                        required
                        labelId={`${label}-${index + 1}`}
                        label={`${label} ${index + 1}`}
                        value={input || ''}
                        onChange={handleInputChange.bind(this, index)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {options.length > 0 &&
                            options.map((option, index) => (
                                <MenuItem
                                    value={`${option.name}||${option.price}`}
                                    key={index}
                                >
                                    {option.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <IconButton
                    color="secondary"
                    onClick={handleInputRemove.bind(this, index)}
                >
                    <CancelIcon />
                </IconButton>
            </div>
        ))

    const handleInputRemove = (index) => {
        let vals = [...values]
        vals.splice(index, 1)
        setValues(vals)
    }

    return {
        values,
        setValues,
        createInputs,
        handleInputAdd,
    }
}
