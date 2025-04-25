import React, { useEffect, useState } from 'react';
import banner1 from '../images/banner1.png'
import banner2 from '../images/banner2.png'
import banner3 from '../images/banner3.png'

const banners = [
    { id: 1, image: `${banner1}` },
    { id: 2, image: `${banner2}` },
    { id: 3, image: `${banner3}` },
];

const BannerCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slides_container">
            <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
                {banners.map(banner => (
                    <div key={banner.id} className="slide">
                        <img src={banner.image} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
