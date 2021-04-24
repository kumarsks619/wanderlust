import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import TextField from '@material-ui/core/TextField'

export const useDoubleDynamicInputs = (keyModifier, label) => {
    const [values, setValues] = useState([
        {
            name: '',
            price: 0,
        },
    ])

    const handleInputAdd = () => {
        setValues([
            ...values,
            {
                name: '',
                price: 0,
            },
        ])
    }

    const handleInputChange = (index, e) => {
        let vals = [...values]
        vals[index][e.target.name] = e.target.value
        setValues(vals)
    }

    const createInputs = () =>
        values.map((input, index) => (
            <div key={index * keyModifier} className="doubleDynamicInput">
                <TextField
                    required
                    type="text"
                    variant="outlined"
                    color="secondary"
                    name="name"
                    label={`${label} ${index + 1}`}
                    value={input.name || ''}
                    onChange={handleInputChange.bind(this, index)}
                />
                <TextField
                    required
                    type="number"
                    variant="outlined"
                    color="secondary"
                    label="Price"
                    name="price"
                    value={input.price || 0}
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
