import { useState } from 'react';
import Slider from 'react-slick';
import GradeIcon from '@mui/icons-material/Grade';
import VideocamIcon from '@mui/icons-material/Videocam';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Container, Typography, Grid, Avatar, Card} from '@mui/material';

import leftArrow from 'assets/images/LandingPage/Content8/left-arrows.png';
import rightArrow from 'assets/images/LandingPage/Content8/right-arrows.png';
import avatar2 from 'assets/images/LandingPage/Content8/avatar2.png';

// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useTheme } from '@mui/material/styles';

export default function CrousalForfun() {
    const theme = useTheme();
    const [sliderRef, setSliderRef] = useState(null);
    const sliderSettings = {
        arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };
    const pricingCards = [
        {
            // imageSrc: IMG7,
            title: 'thisisthenickname123',
            description: 'Kazi_Steff thirty lettersetsss',
            text:"I will make electrician 2d electric service explainer video",
            price: 'USD 0.6/min',
            calls: '631 calls answered',
            last:"last 5 ratings"
        },
        {
            // imageSrc: IMG8,
            title: 'thisisthenickname123',
            description: 'Kazi_Steff thirty lettersetsss',
            text:"I will make electrician 2d electric service explainer video",
            price: 'USD 0.6/min',
            calls: '631 calls answered',
            last:"last 5 ratings"
        },
        {
            // imageSrc: IMG6,
            title: 'thisisthenickname123',
            description: 'Kazi_Steff thirty lettersetsss',
            text:"I will make electrician 2d electric service explainer video",
            price: 'USD 0.6/min',
            calls: '631 calls answered',
            last:"last 5 ratings"
        },
        {
            // imageSrc: IMG9,
            title: 'thisisthenickname123',
            description: 'Kazi_Steff thirty lettersetsss',
            text:"I will make electrician 2d electric service explainer video",
            price: 'USD 0.6/min',
            calls: '631 calls answered',
            last:"last 5 ratings"
        },
        {
            // imageSrc: IMG10,
            title: 'thisisthenickname123',
            description: 'Kazi_Steff thirty lettersetsss',
            text:"I will make electrician 2d electric service explainer video",
            price: 'USD 0.6/min',
            calls: '631 calls answered',
            last:"last 5 ratings"
        },
        {
            // imageSrc: IMG8,
            title: 'thisisthenickname123',
            description: 'Kazi_Steff thirty lettersetsss',
            text:"I will make electrician 2d electric service explainer video",
            price: 'USD 0.6/min',
            calls: '631 calls answered',
            last:"last 5 ratings"
        },
    ];

    return (
        <Container style={{marginTop: '-200px'}}>
            <Grid className="content">
                <Slider ref={setSliderRef} {...sliderSettings}>
                    {pricingCards.map((card, index) => (
                        <Grid>
                            <Card sx={{ maxWidth: 345,  boxShadow: 3, padding: '10px 0px 10px 0px'}}>
                                <Grid sx={{ px: 2, py: 0.7 }}>
                                <img src={leftArrow} alt='leftArrow'/>

                                <Typography sx={{color: '#000000', fontSize: '18px', mt: 2}}>
                                            Lorem Ipsum is simply dummy text
                                            of the printing and typesetting
                                            industry. Lorem Ipsum has been the
                                            industrys standard dummy text ever
                                            since the 1500s, when an unknown
                                            printer took a galley of type and
                                            scrambled it to make a type
                                            specimen book.
                                        </Typography>
                    
                                        <img src={rightArrow} alt='right' style={{float: 'right'}}/>
                            
                                        <Grid sx={{mt: 7, display: 'flex'}}>
                                            <Avatar src={avatar2} alt='avatar2' sx={{width: 60, height: 60}}/>
                                            <Typography sx={{color: '#000000', fontSize: 24, fontWeight: 'bold', ml: 2}}>
                                                John Doe<br/>
                                                <span style={{fontSize: 20, fontWeight: 'normal'}}>Marketing Manager</span>
                                            </Typography>
                                        </Grid>

                                </Grid>
                                
                              
                              
                          
                            </Card>
                        </Grid>
                    ))}
                </Slider>

                <Grid sx={{ display: 'flex', justifyContent: 'center',pr:"40px",pb:"30px", mt: '50px'}}>
                    <button onClick={sliderRef?.slickPrev} type="button" style={{background: '#008BFF', border: 'none', borderRadius: '50px', padding: '5px 5px 5px 15px', cursor: 'pointer'}}>
                        <ArrowBackIosIcon  sx={{ fontSize:"35px",color:"#FFFFFF", alignContent: 'center'}}/>
                    </button>
                    <button onClick={sliderRef?.slickNext} type="button" style={{ background: '#008BFF', border: 'none' , borderRadius: '50px', padding: '5px 5px 5px 15px', marginLeft: '10px', cursor: 'pointer'}}>
                        <ArrowForwardIosRoundedIcon sx={{ fontSize:"35px",color:"#FFFFFF", alignContent: 'center'}} />
                    </button>
                </Grid>
            </Grid>
        </Container>
    );
}