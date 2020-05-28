import React from 'react';
import Link from 'components/LinkMaster';
import { napBaseUrl, playfunBaseUrl } from 'configs/baseUrls';

const Sidebar = () => {
  return (
    <ul id='menu'>
      <li>
        <Link href='/'>
          <a>
            <img src='/bang-hoi/statics/images/bang-hoi-logo.svg' alt='' />
          </a>
        </Link>
      </li>
      <li>
        <Link href='/'>
          <a>
            <span className='fun-ic ic-homepage'></span>
            {'Trang chủ - Giới thiệu'}
          </a>
        </Link>
      </li>
      <li>
        <a href={playfunBaseUrl} target='_blank'>
          <span className='fun-ic ic-playfun'></span>
          {'Playfun'}
        </a>
      </li>
      <li>
        <a href={napBaseUrl} target='_blank'>
          <span className='fun-ic ic-nap'></span>
          {'Nạp - Funcard'}
        </a>
      </li>
      <li>
        <a href={`${playfunBaseUrl}/ho-tro/`} target='_blank'>
          <span className='fun-ic ic-more-info'></span>
          {'Báo lỗi Nạp'}
        </a>
      </li>
    </ul>
  );
};

export default Sidebar;
