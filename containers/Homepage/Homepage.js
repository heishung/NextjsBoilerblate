import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'components/LinkMaster';
import { baseUrl } from 'configs/baseUrls';
import CarouselHome from './Carousel'
import Charts from './charts'
import TournamentList from './TournamentList'
import 'styles/pages/homepage.scss';



const Homepage = () => {
  const router = useRouter();
  const { authRequired, option } = router.query;
  const showPopupAuth = authRequired == 'true';
  const [showAuthRequired, setShowAuthRequired] = useState(showPopupAuth);

  useEffect(() => {
    setShowAuthRequired(showPopupAuth);
  }, [showPopupAuth]);

  return (
    <React.Fragment>
      <div className='home-banner'>
          <CarouselHome/>
          <Charts/>
      </div>
      <TournamentList/>
      <TournamentList/>
      <TournamentList/>
      <TournamentList/>
    </React.Fragment>
  );
};

export default Homepage;
