import React from 'react'

import { whyUsData } from '../../../constants/whyUs'
import WhyUsCard from './WhyUsCard'
import './WhyUs.css'


function WhyUs() {
    return (
        <div className="whyUs">
            <h3 className="whyUs__heading">Why With WanderLust?</h3>
            <div className="whyUs__cards">
                {
                    whyUsData.map((card, index) => (
                        <WhyUsCard 
                            key={`${new Date().toISOString()}${index*5}`}
                            image={card.image} 
                            title={card.title} 
                            body={card.body} 
                            borderClass={card.borderClass} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default WhyUs
