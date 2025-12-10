import React from 'react';
import Advertisement from './advertisement/Advertisement';
import Banner from './banner/Banner';
import LatestTickets from './latest-tickets/LatestTickets';
import Partners from './partners/Partners';
import HowItWorks from './HowItWorks/HowItWorks';
import FAQ from './FAQ/FAQ';
import About from './About/About';
import NewsLetter from './newsletter/NewsLetter';

const Home = () => {


    return (
        <div className='max-w-7xl mx-auto'>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <Partners></Partners>
            <HowItWorks></HowItWorks>
            <About></About>
            <FAQ></FAQ>
            <NewsLetter></NewsLetter>
        </div>

    );
};

export default Home;