import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Slide from '@material-ui/core/Slide'
import _ from 'lodash'

import OtherCard from './OtherCard'
import './Other.css'
import Loading from '../../utils/Comp/Loading'
import AdvtBanner from '../../utils/Comp/AdvtBanner'

function Other({ tab, servicesData, advtData }) {
    const [tabData, setTabData] = useState([])

    useEffect(() => {
        setTabData(servicesData.filter((service) => service.type === tab))
    }, [tab, servicesData])

    return (
        <div className="other">
            <div className={`other__header other__header${tab}`}>
                <h1>{tab}</h1>
            </div>

            <Slide in={true} direction="right" timeout={900} mountOnEnter unmountOnExit>
                <Container className="other__cards">
                    {advtData && (
                        <AdvtBanner image={advtData.image} link={advtData.link} />
                    )}

                    {tabData.length > 0 ? (
                        _.orderBy(
                            tabData,
                            [(data) => data.createdAt],
                            ['desc']
                        ).map((service) => (
                            <OtherCard key={service._id} serviceData={service} />
                        ))
                    ) : (
                        <Loading />
                    )}
                </Container>
            </Slide>
        </div>
    )
}

export default Other
