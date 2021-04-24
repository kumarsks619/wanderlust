import React from 'react'
import Container from 'react-bootstrap/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { v4 as uuid } from 'uuid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'

import './AdminSpecial.css'
import Loading from '../../../../utils/Comp/Loading'


function AdminSpecial({ servicesData }) {


    return (
        <Container className="adminSpecial">
            <Typography variant="h4" color="textSecondary" gutterBottom={true} className="adminSpecial__header">
                Specials
            </Typography>
            <Divider light={true} className="adminSpecial__divider" />
            {
                servicesData.length > 1 ? (
                    servicesData.filter(service => service.isSpecial)
                        .map(service => (
                            <Card className="adminSpecial__card" key={uuid()}>
                                <CardMedia 
                                    image={service.image}
                                    className="adminSpecial__cardImage"
                                />
                                <CardHeader 
                                    title={service.title.toLowerCase()}
                                    subheader={service.type}
                                    className="adminSpecial__cardHeader"
                                />
                            </Card>
                        ))
                ) : (
                    <Loading />
                )
            }
        </Container>
    )
}

export default AdminSpecial
