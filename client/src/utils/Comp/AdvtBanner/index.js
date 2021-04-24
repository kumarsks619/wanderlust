import React from 'react'

import './AdvtBanner.css'

const AdvtBanner = ({ image, link }) => {
    return (
        <div className="advtBanner">
            <a href={link} target="__blank">
                <img src={image} alt="advertisement-banner" />
            </a>
        </div>
    )
}

export default AdvtBanner
