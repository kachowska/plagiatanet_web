import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceData } from '../data/services';
import Hero from './Hero';
import Services from './Services';
import Advantages from './Advantages';
import Faq from './Faq';
import FinalCta from './FinalCta';
import Testimonials from './Testimonials';
import Problems from './Problems';
import HowItWorks from './HowItWorks';
import { Orderable } from '../types';

const ServicePage: React.FC<Orderable> = ({ onOrderClick }) => {
    const { slug } = useParams<{ slug: string }>();
    const serviceData = getServiceData(slug || '');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]); // Only scroll when slug changes

    // Redirect if service not found, but do it in render or safely
    if (!serviceData) {
        // You can render a NotFound component here or redirect
        // Using Navigate component is safer than useEffect for redirects during render
        // return <Navigate to="/" replace />; // Needs import { Navigate } from 'react-router-dom'
        
        // Or just return null and let useEffect handle it if you prefer, 
        // but remove [serviceData] from dependency if it causes issues during re-renders
        // However, keeping it simple:
        return null; 
    }

    // We can also use a useLayoutEffect to check for existence if we want to redirect
    // But the issue described ("redirects to home on modal close") suggests
    // that closing the modal triggers a re-render where serviceData might be temporarily undefined 
    // or the effect re-runs. 
    
    // Let's simplify the useEffect to ONLY scroll.
    // And handle "not found" by rendering nothing (or a 404 message).
    // If you really want to redirect, do it only if slug changes and data is missing.

    return (
        <div className="service-page">
            <Hero 
                onOrderClick={onOrderClick} 
                customTitle={serviceData.heroTitle} 
                customSubtitle={serviceData.heroSubtitle} 
            />
            <Problems />
            <Advantages />
            <Services onOrderClick={onOrderClick} />
            <HowItWorks />
            <Testimonials />
            <Faq />
            <FinalCta onOrderClick={onOrderClick} />
        </div>
    );
};

export default ServicePage;