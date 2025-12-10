import React from 'react';
import Marquee from 'react-fast-marquee'
import logo from '../../../logos/hanif-logo.png'
import logo2 from '../../../logos/logo2.png'
import logo3 from '../../../logos/logo3.png'
import logo4 from '../../../logos/logo4.png'
import logo6 from '../../../logos/logo6.png'
import logo7 from '../../../logos/logo7.png'
import logo9 from '../../../logos/logo9.png'
import logo10 from '../../../logos/logo10.png'
import logo11 from '../../../logos/logo11.png'
import logo12 from '../../../logos/logo12.png'
import { FaHandshake } from 'react-icons/fa';

const Partners = () => {
    const logos = [
        logo, logo2, logo3, logo4, logo6, logo7, logo9, logo10, logo11, logo12
    ]
    return (
        <div data-aos="fade-in" className='rounded-2xl my-10 space-y-20 mx-3'>
            <div className='flex justify-center items-center gap-1.5'>
                <h2 className='text-xl md:text-4xl font-bold text-secondary-content text-center'>Companies we have partnered with </h2>
                <FaHandshake size={40} />
            </div>
            <Marquee speed={70}>
                {
                    logos.map((logo, i) => <img
                        className='w-52 h-20 ml-10'
                        src={logo}
                        key={i}
                    >
                    </img>)
                }
            </Marquee>
        </div>
    );
};

export default Partners;