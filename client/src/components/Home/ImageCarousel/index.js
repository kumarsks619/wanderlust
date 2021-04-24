import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import './ImageCarousel.css'

function ImageCarousel({ carouselData }) {
    return (
        <Carousel className="imageCarousel">
            {carouselData.map((carousel) => (
                <Carousel.Item key={carousel._id}>
                    <img
                        className="d-block w-100"
                        src={carousel.image}
                        alt={carousel.title}
                    />
                    <Carousel.Caption>
                        <h3>{carousel.title}</h3>
                        <p>{carousel.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ImageCarousel
