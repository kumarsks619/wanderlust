import React, { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock'
import FilterHdrIcon from '@material-ui/icons/FilterHdr'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo'
import CreateIcon from '@material-ui/icons/Create'

import useStyles from './styles'
import './Dashboard.css'
import AdminHome from './AdminHome'
import { Button } from '@material-ui/core'
import { AdminContext } from '../../../utils/Context/admin'
import AdminService from './AdminService'
import {
    getBookings,
    getEnquiries,
    getServices,
    getCarousel,
    getAdvtBanner,
    getPrices,
    getCustoms,
} from '../../../api/admin'
import AdminBookings from './AdminBookings'
import AdminEnquiries from './AdminEnquiries'
import AdminSpecial from './AdminSpecial'
import AdminCarousel from './AdminCarousel'
import AdminAdvt from './AdminAdvt'
import AdminCreateOwn from './AdminCreateOwn'

function Dashboard() {
    const classes = useStyles()
    const theme = useTheme()

    const adminContext = useContext(AdminContext)

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [services, setServices] = useState([])
    const [newService, setNewService] = useState({})
    const [deletedServiceID, setDeletedServiceID] = useState('')
    const [bookings, setBookings] = useState([])
    const [enquiries, setEnquiries] = useState([])
    const [deletedEnquiryID, setDeletedEnquiryID] = useState('')
    const [carousel, setCarousel] = useState([])
    const [deletedCarouselID, setDeletedCarouselID] = useState('')
    const [advt, setAdvt] = useState([])
    const [deletedAdvtID, setDeletedAdvtID] = useState('')
    const [prices, setPrices] = useState({
        train: 0,
        flight: 0,
        road: 0,
        ac: 0,
        nonAc: 0,
        local: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
        lodges: 0,
        veg: 0,
        nonVeg: 0,
        jain: 0,
    })
    const [custom, setCustom] = useState([])

    const handleLogout = () => adminContext.logout()

    // handling SERVICES **********************************************************************
    const fetchServices = async () => {
        let response = await getServices()
        setServices(response.data)
    }

    useEffect(() => {
        fetchServices().catch((err) => console.log(err.message))
    }, [])

    useEffect(() => {
        setServices((prevServices) => [...prevServices, newService])
    }, [newService])

    // handling BOOKINGS **************************************************************************
    const fetchBookings = async (adminToken) => {
        let response = await getBookings(adminToken)
        setBookings(response.data)
    }

    useEffect(() => {
        fetchBookings(adminContext.admin.adminToken).catch((err) =>
            console.log(err.message)
        )
    }, [adminContext.admin.adminToken])

    // handling ENQUIRIES *****************************************************************************
    const fetchEnquiries = async (adminToken) => {
        let response = await getEnquiries(adminToken)
        setEnquiries(response.data)
    }

    useEffect(() => {
        fetchEnquiries(adminContext.admin.adminToken).catch((err) =>
            console.log(err.message)
        )
    }, [adminContext.admin.adminToken])

    useEffect(() => {
        if (deletedEnquiryID)
            setEnquiries((prevEnquiries) =>
                prevEnquiries.filter((enquiry) => enquiry._id !== deletedEnquiryID)
            )
    }, [deletedEnquiryID])

    // handling CAROUSEL ***********************************************************************************
    useEffect(() => {
        getCarousel()
            .then((response) => setCarousel(response.data))
            .catch((err) => console.log(err.message))
    }, [])

    useEffect(() => {
        if (deletedCarouselID)
            setCarousel((prevCarousel) =>
                prevCarousel.filter((carousel) => carousel._id !== deletedCarouselID)
            )
    }, [deletedCarouselID])

    // handling ADVERTISEMENT *****************************************************************************
    useEffect(() => {
        getAdvtBanner()
            .then((response) => setAdvt(response.data))
            .catch((err) => console.log(err.message))
    }, [])

    useEffect(() => {
        if (deletedAdvtID)
            setAdvt((prevAdvt) => prevAdvt.filter((advt) => advt._id !== deletedAdvtID))
    }, [deletedAdvtID])

    // handling CREATE OWN PRICES ******************************************************************
    useEffect(() => {
        getPrices()
            .then((response) => {
                if (response.data) {
                    const { data } = response
                    setPrices({
                        train: data.reachTransport.train,
                        flight: data.reachTransport.flight,
                        road: data.reachTransport.road,
                        ac: data.spotTransport.ac,
                        nonAc: data.spotTransport.nonAc,
                        local: data.spotTransport.local,
                        twoStar: data.stay.twoStar,
                        threeStar: data.stay.threeStar,
                        fourStar: data.stay.fourStar,
                        fiveStar: data.stay.fiveStar,
                        lodges: data.stay.lodges,
                        veg: data.food.veg,
                        nonVeg: data.food.nonVeg,
                        jain: data.food.jain,
                    })
                }
            })
            .catch((err) => console.log(err.message))
    }, [])

    // handling CUSTOM Packages *****************************************************************************
    useEffect(() => {
        getCustoms(adminContext.admin.adminToken)
            .then((response) => setCustom(response.data))
            .catch((err) => console.log(err.message))
    }, [])

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isDrawerOpen,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setIsDrawerOpen(true)}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: isDrawerOpen,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            <span className="dashboard__appBarHeaderDesktop">
                                WanderLust | Admin-Dashboard
                            </span>
                            <span className="dashboard__appBarHeaderMobile">
                                Admin-Panel
                            </span>
                        </Typography>
                        <div className="dashboard__appBarBtns">
                            <Button
                                className="dashboard__appBarBtn"
                                variant="outlined"
                                color="secondary"
                                startIcon={<LockIcon />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: isDrawerOpen,
                        [classes.drawerClose]: !isDrawerOpen,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: isDrawerOpen,
                            [classes.drawerClose]: !isDrawerOpen,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={() => setIsDrawerOpen(false)}>
                            {theme.direction === 'rtl' ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className="dashboard__drawerList">
                        <Link to="/">
                            <ListItem button key={'home'}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/treks">
                            <ListItem button key={'treks'}>
                                <ListItemIcon>
                                    <FilterHdrIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Treks'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/camps">
                            <ListItem button key={'camps'}>
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Camps'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/packages">
                            <ListItem button key={'packages'}>
                                <ListItemIcon>
                                    <BusinessCenterIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Packages'} />
                            </ListItem>
                        </Link>

                        <Divider />

                        <Link to="/admin/carousel">
                            <ListItem button key={'carousel'}>
                                <ListItemIcon>
                                    <ViewCarouselIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Carousel'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/advt">
                            <ListItem button key={'advt'}>
                                <ListItemIcon>
                                    <FeaturedVideoIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Advertisement'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/special">
                            <ListItem button key={'special'}>
                                <ListItemIcon>
                                    <FolderSpecialIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Specials'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/bookings">
                            <ListItem button key={'bookings'}>
                                <ListItemIcon>
                                    <MenuBookIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Bookings'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/enquiries">
                            <ListItem button key={'enquiries'}>
                                <ListItemIcon>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Enquiries'} />
                            </ListItem>
                        </Link>
                        <Link to="/admin/create-own">
                            <ListItem button key={'create-own'}>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Create Own'} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route exact path="/">
                        <AdminHome setNewService={setNewService} />
                    </Route>
                    <Route exact path="/admin/treks">
                        <AdminService
                            tab={'Treks'}
                            servicesData={services}
                            deletedServiceID={deletedServiceID}
                            setDeletedServiceID={setDeletedServiceID}
                        />
                    </Route>
                    <Route exact path="/admin/camps">
                        <AdminService
                            tab={'Camps'}
                            servicesData={services}
                            deletedServiceID={deletedServiceID}
                            setDeletedServiceID={setDeletedServiceID}
                        />
                    </Route>
                    <Route exact path="/admin/packages">
                        <AdminService
                            tab={'Packages'}
                            servicesData={services}
                            deletedServiceID={deletedServiceID}
                            setDeletedServiceID={setDeletedServiceID}
                        />
                    </Route>
                    <Route exact path="/admin/bookings">
                        <AdminBookings bookingsData={bookings} />
                    </Route>
                    <Route exact path="/admin/enquiries">
                        <AdminEnquiries
                            enquiriesData={enquiries}
                            setDeletedEnquiryID={setDeletedEnquiryID}
                        />
                    </Route>
                    <Route exact path="/admin/special">
                        <AdminSpecial servicesData={services} />
                    </Route>
                    <Route exact path="/admin/carousel">
                        <AdminCarousel
                            carouselData={carousel}
                            setDeletedCarouselID={setDeletedCarouselID}
                            setCarousel={setCarousel}
                        />
                    </Route>
                    <Route exact path="/admin/advt">
                        <AdminAdvt
                            advtData={advt}
                            setAdvt={setAdvt}
                            setDeletedAdvtID={setDeletedAdvtID}
                        />
                    </Route>
                    <Route exact path="/admin/create-own">
                        <AdminCreateOwn
                            prices={prices}
                            setPrices={setPrices}
                            customData={custom}
                        />
                    </Route>
                </main>
            </div>
        </Router>
    )
}

export default Dashboard
