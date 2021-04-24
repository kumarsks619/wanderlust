import { useState } from 'react'


export const useForm = (initialState = {}, apiCall) => {
    const [inputValues, setInputValues] = useState(initialState)
    const [result, setResult] = useState({})
    const [errors, setErrors] = useState({})


    const handleOnChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await apiCall(inputValues)
            setResult(response)
        } catch (err) {
            setErrors(err.response.data.errors)
        }
    }


    const handleReset = () => {
        setInputValues(initialState)
        setErrors({})
    }


    return {
        inputValues,
        handleOnChange,
        handleOnSubmit,
        result,
        errors,
        handleReset
    }
}

