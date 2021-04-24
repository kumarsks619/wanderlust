import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import BuildIcon from '@material-ui/icons/Build'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { v4 as uuid } from 'uuid'
import NumberFormat from 'react-number-format'

import ImageCarousel from './ImageCarousel'
import ShowcaseCarousel from './ShowcaseCarousel'
import WhyUs from './WhyUs'
import './Home.css'
import Loading from '../../utils/Comp/Loading'
import AdvtBanner from '../../utils/Comp/AdvtBanner'

function Home({
    carouselData,
    servicesData,
    trendingServices,
    advtData,
    setIsModalOpen,
    location,
    history,
}) {
    const [searchInput, setSearchInput] = useState('')
    const [specials, setSpecials] = useState([])

    // handling when redirected from the password update page *******************************************
    let redirect = location.search && location.search.split('=')[1]
    if (redirect === 'login') {
        setIsModalOpen(true)
        history.push('/user')
    }

    // handling SPECIALS *************************************************************************************************
    useEffect(() => {
        setSpecials(servicesData.filter((service) => service.isSpecial))
    }, [servicesData])

    return (
        <>
            <Container fluid className="home">
                <div className="home__searchBar">
                    <ClickAwayListener onClickAway={() => setSearchInput('')}>
                        <div className="home__searchInputAndResultsWrapper">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search Holiday by Package Name/Type/Price"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="danger">Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            {searchInput && (
                                <div className="home__searchResults">
                                    {searchInput &&
                                        servicesData
                                            .filter((service) => {
                                                if (/^\d+$/.test(searchInput)) {
                                                    return (
                                                        service.price <=
                                                        Number(searchInput)
                                                    )
                                                } else {
                                                    return (
                                                        service.title
                                                            .toLowerCase()
                                                            .includes(
                                                                searchInput.toLowerCase()
                                                            ) ||
                                                        service.type
                                                            .toLowerCase()
                                                            .includes(
                                                                searchInput.toLowerCase()
                                                            )
                                                    )
                                                }
                                            })
                                            .map((service) => (
                                                <Link
                                                    to={`user/service/${service._id}`}
                                                    className="home__searchResult"
                                                    key={uuid()}
                                                >
                                                    <div className="home__searchResultImage">
                                                        <img
                                                            src={service.image}
                                                            alt={service.title}
                                                        />
                                                    </div>
                                                    <div className="home__searchResultDetails">
                                                        <Typography variant="h6">
                                                            {service.title.toLowerCase()}
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {service.type} |{' '}
                                                            <NumberFormat
                                                                value={service.price}
                                                                prefix={'INR '}
                                                                thousandSeparator={true}
                                                                displayType={'text'}
                                                            />
                                                        </Typography>
                                                    </div>
                                                </Link>
                                            ))}
                                </div>
                            )}
                        </div>
                    </ClickAwayListener>
                    <div
                        className="home__createPlan"
                        onClick={() => history.push('user/create-own')}
                    >
                        <BuildIcon />
                        <p>Create Your Plan </p>
                    </div>
                </div>
            </Container>

            {carouselData.length > 0 ? (
                <ImageCarousel carouselData={carouselData} />
            ) : (
                <Loading />
            )}

            <h3 className="home__showcaseHeading">Trending Indian Destinations</h3>
            <ShowcaseCarousel
                showcaseItems={trendingServices}
                divID={'trendingPlacesDivID'}
            />

            {advtData && <AdvtBanner image={advtData.image} link={advtData.link} />}

            <h3 className="home__showcaseHeading home__headingSpecial">
                Special Packages
            </h3>
            <ShowcaseCarousel showcaseItems={specials} divID={'specialPackagesDivID'} />

            <WhyUs />
        </>
    )
}

export default Home
