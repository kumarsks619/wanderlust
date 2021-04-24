import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import TranslateIcon from '@material-ui/icons/Translate'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import PersonIcon from '@material-ui/icons/Person'
import Brightness6Icon from '@material-ui/icons/Brightness6'
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format'
import Chip from '@material-ui/core/Chip'
import StarsIcon from '@material-ui/icons/Stars'

import './OtherCard.css'


function OtherCard({ serviceData }) {
    const { _id, title, isSpecial, overview, days, price, image } = serviceData

    return (
        <div className="otherCard">
            <div className="otherCard__image">
                <img src={image} alt={title} />
            </div>
            <div className="otherCard__body">
                <div className="otherCard__description">
                    <Typography variant="h4" color="textPrimary" gutterBottom={true} className="otherCard__title">
                        {title.toLowerCase()}
                        {
                            isSpecial && (
                                <Chip 
                                    size="small" 
                                    label="SPECIAL" 
                                    icon={<StarsIcon style={{ color: '#fff' }} />} 
                                    color="secondary"
                                    style={{ color: '#fff', backgroundColor: '#f1c40f', fontWeight: '700' }}
                                />
                            )
                        }
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {overview.slice(0, 200)}...
                        <Link to={`/user/service/${_id}`}>[Read More]</Link>
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1" color="textSecondary">
                                <TranslateIcon/> Instruction Language: English
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" color="textSecondary">
                                <RestaurantIcon/> All meals included
                            </Typography>
                        </li>
                    </ul>
                </div>
                <div className="otherCard__action">
                    <Typography variant="h4" color="textPrimary">
                        <NumberFormat 
                            value={price}
                            prefix={"INR "}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
                    </Typography>
                    <div>
                        <Typography variant="body1" color="textSecondary">Price for:</Typography>
                        <ul>
                            <li>
                                <Typography variant="body1" color="textSecondary">
                                    <PersonIcon/> 1 Person
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1" color="textSecondary">
                                    <Brightness6Icon/> {days} Days
                                </Typography>
                            </li>
                        </ul>
                    </div>
                    <Button variant="contained" color="secondary" size="large" component={Link} to={`/user/service/${_id}`}>
                        View More
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OtherCard
