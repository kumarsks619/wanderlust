import React from 'react'
import Card from 'react-bootstrap/Card'

import './WhyUsCard.css'

function WhyUsCard({ image, title, body, borderClass }) {
    return (
        <Card className={`whyUsCard ${borderClass}`} text="muted">
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title style={{ color: "#000" }}>{title}</Card.Title>
                <Card.Text>{body}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default WhyUsCard
