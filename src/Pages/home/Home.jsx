import React from 'react';
import Advertisement from './advertisement/Advertisement';
import Banner from './banner/Banner';
import LatestTickets from './latest-tickets/LatestTickets';
import Partners from './partners/Partners';
import HowItWorks from './HowItWorks/HowItWorks';
import FAQ from './FAQ/FAQ';

const Home = () => {


    return (
        <div className='max-w-7xl mx-auto'>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <Partners></Partners>
            <HowItWorks></HowItWorks>
            <FAQ></FAQ>
        </div>

    );
};

export default Home;