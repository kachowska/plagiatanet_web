import React from 'react';
import Hero from './Hero';
import Problems from './Problems';
import Services from './Services';
import HowItWorks from './HowItWorks';
import Methods from './Methods';
import CheckSystems from './CheckSystems';
import WorkTypes from './WorkTypes';
import Cases from './Cases';
import Advantages from './Advantages';
import Testimonials from './Testimonials';
import Faq from './Faq';
import AdditionalServices from './AdditionalServices';
import Blog from './Blog';
import FinalCta from './FinalCta';
import { Orderable } from '../types';

const Home: React.FC<Orderable> = ({ onOrderClick }) => {
  return (
    <>
      <Hero onOrderClick={onOrderClick} />
      <Problems />
      <Services onOrderClick={onOrderClick} />
      <HowItWorks />
      <Methods />
      <CheckSystems />
      <WorkTypes />
      <Cases />
      <Advantages />
      <Testimonials />
      <Faq />
      <AdditionalServices />
      <Blog onOrderClick={onOrderClick} />
      <FinalCta onOrderClick={onOrderClick} />
    </>
  );
};

export default Home;