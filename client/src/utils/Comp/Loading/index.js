import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './Loading.css'

function Loading() {
    return (
        <div className="loading">
            <CircularProgress color="secondary" size={60} style={{ color: '#dc3545' }} />
        </div>
    )
}

export default Loading
