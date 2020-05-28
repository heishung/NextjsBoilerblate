import React from 'react';
import { napBaseUrl, playfunBaseUrl } from 'configs/baseUrls';

const GamePromos = ({ game }) => {
  const promos = [
    {
      id: 'giftcode-promo',
      icon: 'ic-giftcode-promo',
      text: 'Giftcode',
      linkTo: `${playfunBaseUrl}/giftcode/${game.alias}`,
    },
    {
      id: 'nap-promo',
      icon: 'ic-nap-promo',
      text: 'Nạp',
      linkTo: `${napBaseUrl}/${game.alias}`,
    },
    {
      id: 'homepage-promo',
      icon: 'ic-homepage-promo',
      text: 'Trang chủ',
      linkTo: game.homepage_url,
    },
    {
      id: 'facebook-promo',
      icon: 'ic-facebook-promo',
      text: 'Fanpage',
      linkTo: game.fanpage_url,
    },
  ];
  return (
    <div className='game-promos'>
      {promos.map(
        (promo) =>
          !!promo.linkTo && (
            <div key={promo.id} className='game-promo'>
              <a href={promo.linkTo} target='_blank'>
                <span className={`fun-ic ${promo.icon}`}></span>
                <span>{promo.text}</span>
              </a>
            </div>
          )
      )}
    </div>
  );
};

export default GamePromos;
