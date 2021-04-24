import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import './ShowcaseItem.css'

function ShowcaseItem({ title, price, image, _id: serviceID }) {
    return (
        <Card className="showcaseItem bg-dark text-white" as={Link} to={`user/service/${serviceID}`}>
            <Card.Img src={image} alt={title} />
            <Card.ImgOverlay>
                <Card.Title className="showcaseItem__name">{title}</Card.Title>
                <Card.Text>Starting From</Card.Text>
                <Card.Text className="showcaseItem__price">Rs {price}/-</Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}

export default ShowcaseItem
