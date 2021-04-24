import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import _ from 'lodash'

import AdminServiceCard from './AdminServiceCard'
import './AdminService.css'
import Loading from '../../../../utils/Comp/Loading'

function AdminService({ tab, servicesData, deletedServiceID, setDeletedServiceID }) {
    const [tabData, setTabData] = useState([])
    
    
    useEffect(() => {
        setTabData(servicesData.filter(serviceData => serviceData.type === tab))
    }, [ tab, servicesData ])


    useEffect(() => {
        if (deletedServiceID !== "")
            setTabData(prevTabData => prevTabData.filter(service => service._id !== deletedServiceID))
    }, [ deletedServiceID ])
    


    return (
        <Container className="adminService">
            <Typography variant="h4" color="textSecondary" gutterBottom={true} className="adminService__header">{tab}</Typography>
            <Divider light={true} className="adminService__divider" />
            { 
                tabData.length > 0 ? (
                    _.orderBy(tabData, [(data) => data.createdAt], ['desc'])
                        .map((service, index) => (
                            <AdminServiceCard key={`${service._id}${index}`} cardData={service} setDeletedServiceID={setDeletedServiceID} />
                        ))
                ) : (
                    <Loading />
                )
            }
        </Container>
    )
}

export default AdminService
