import React, {Component} from 'react';
import axios from 'axios';
import EpicNatural from './epicNatural';
import logo from '../React-icon.svg';
import EarthCarousel from './earthCarousel';
import $ from 'jquery';
import mainStyles from './epic.module.css';
import styles from '../dash.module.css';

class Epic extends Component{


    constructor(props) {
        super(props);
        this.state =
            { apods: [] };

    }


    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();

        axios.get(`https://localhost:8000/api/epic`).then(response => {
            this.setState({apods: response.data});
        });
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel('Axios request canceled.');
    }

    render() {
        if (this.state.apods.length !== 0) {

            const map1 = this.state.apods.map(x =>{
                let cleanDate = x.date.split(' ')[0];

                let test = 'https://epic.gsfc.nasa.gov/archive/natural/'+cleanDate.split('-').join('/')+'/png/'+x.image+'.png';

                return <EpicNatural className='epicSection' key={x.identifier} title={x.date} explanation={x.image} url={test}/>;
            });

            const map2 = this.state.apods.map(x =>{
                let cleanDate = x.date.split(' ')[0];

                let test = 'https://epic.gsfc.nasa.gov/archive/natural/'+cleanDate.split('-').join('/')+'/png/'+x.image+'.png';

                return <EarthCarousel key={x.identifier} title={x.date} explanation={x.image} url={test}/>;
            });

            return (

                <div className={mainStyles.epic}>
                    <div className={mainStyles.heroEpicSection}>
                    {map2}
                        <div className={mainStyles.epicCardSection}>
                            {map1}
                        </div>
                    </div>

                    {this.initCarouselJS()}
                </div>

            )
        }else {

            return(
                <div className={styles.loadingSection}>
                    <div className={styles.loading}>
                        <img src={logo} className={styles.spinnerLoad} alt="logo" />
                        <small className={styles.textGlow}>Loading Component...</small>
                    </div>
                </div>
            )
        }
    }

    initCarouselJS(){
        $(document).ready(function () {

            // Set Options
            let speed = 0;			// Fade speed
            let autoswitch = true;		// Auto slider options
            let autoswitch_speed = 3000;	// Auto slider speed

            // Add initial active class
            $('.slide').first().addClass('active');

            // Hide all slides
            $('.slide').hide();

            // Show first slide
            $('.active').show();

            // Next Handler
            $('#next').on('click', this.nextSlide);

            // Prev Handler
            $('#prev').on('click', prevSlide);

            // Auto Slider Handler
            if (autoswitch === true) {

                setInterval(nextSlide, autoswitch_speed);
            }

            // Switch to next slide
            function nextSlide() {
                $('.active').addClass('oldActive');
                $('.active').removeClass('active')

                if ($('.oldActive').is(':last-child')) {
                    $('.slide').first().addClass('active');
                } else {
                    $('.oldActive').next().addClass('active');
                }


                $('.oldActive').removeClass('oldActive');
                $('.slide').hide();
                $('.slide').fadeOut(speed+200);
                //   $('.active').animate({width:'toggle'},350);

                //   $('.active').animate({width:'toggle'},1000);
                $('.active').fadeIn(60);


            }


            // Switch to prev slide
            function prevSlide() {
                $('.active').removeClass('active').addClass('oldActive');
                if ($('.oldActive').is(':first-child')) {
                    $('.slide').last().addClass('active');
                } else {
                    $('.oldActive').prev().addClass('active');
                }
                $('.oldActive').removeClass('oldActive');
                $('.slide').fadeOut(speed);
                $('.active').fadeIn(speed);
            }
        });

    };

    isPrimitive(test) {
        return (test !== Object(test));
    };
    nextSlide(){
        $('.active').removeClass('active').addClass('oldActive');
        if ($('.oldActive').is(':last-child')) {
            $('.slide').first().addClass('active');
        } else {
            $('.oldActive').next().addClass('active');
        }


        $('.oldActive').removeClass('oldActive');
        $('.slide').hide();
        $('.slide').fadeOut(speed);
        //   $('.active').animate({width:'toggle'},350);

        //   $('.active').animate({width:'toggle'},1000);
        $('.active').fadeIn(speed + 500);

    }
}

export default Epic;
