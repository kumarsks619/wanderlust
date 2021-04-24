import React from 'react'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import ShowcaseItem from './ShowcaseItem'
import './ShowcaseCarousel.css'
import Loading from '../../../utils/Comp/Loading'

function ShowcaseCarousel({ showcaseItems, divID }) {
   
    const handlePrevNav = () => {
        const prevScrollPosition = document.getElementById(divID).scrollLeft
        if (prevScrollPosition === 0)
            document.getElementById(divID).scrollLeft = document.getElementById(divID).scrollWidth
        else 
            document.getElementById(divID).scrollLeft = prevScrollPosition - 400
    }

    const handleNextNav = () => {
        const prevScrollPosition = document.getElementById(divID).scrollLeft
        if (prevScrollPosition >= document.getElementById(divID).scrollWidth-1600)
            document.getElementById(divID).scrollLeft = 0
        else
            document.getElementById(divID).scrollLeft = prevScrollPosition + 400
    }

    return (
        showcaseItems.length > 0 ? (
            <>
                <div className="showcaseCarousel__navBtns">
                    <Fab
                        color="secondary"
                        size="small"
                        className="showcaseCarousel__navBtnPrev"
                        onClick={handlePrevNav}
                    >
                        <KeyboardArrowLeftIcon />
                    </Fab>
                    <Fab
                        color="secondary"
                        size="small"
                        className="showcaseCarousel__navBtnNext"
                        onClick={handleNextNav}
                    >
                        <KeyboardArrowRightIcon />
                    </Fab>
                </div>
                <div className="showcaseCarousel" id={divID}>
                    <div className="showcaseCarousel__items">
                        {showcaseItems.map((showcaseItem, index) => (
                            <ShowcaseItem
                                key={`${new Date().toISOString()}${index}`}
                                {...showcaseItem}
                            />
                        ))}
                    </div>
                </div>
            </>
        ) : (
            <Loading />
        )
    )
}

export default ShowcaseCarousel
