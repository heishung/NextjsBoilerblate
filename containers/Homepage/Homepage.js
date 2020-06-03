import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'components/LinkMaster';
import { baseUrl } from 'configs/baseUrls';
import CarouselHome from './Carousel'
import Charts from './charts'
import TournamentList from './TournamentList'
import 'styles/pages/homepage.scss';
import styled from 'styled-components'

const Container = styled.div`

`

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
      <Container className='home-banner row'>
          <CarouselHome className="col-md-8 " />
          <Charts className="col-md-4 list-charts" />
      </Container>
      <TournamentList/>
      <TournamentList/>
      <TournamentList/>
      <TournamentList/>
    </React.Fragment>
  );
};

export default Homepage;
