import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const GiftLoader = ({ count = 3 }) => {
  return (
    <div className='gift-loader'>
      <SkeletonTheme>
        <Skeleton count={count} height={70} />
      </SkeletonTheme>
    </div>
  );
};

export default GiftLoader;
