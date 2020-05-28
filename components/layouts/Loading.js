import React from 'react';

const Loading = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(37, 36, 29, 0.06)',
      zIndex: 2
    }}
  >
    <div className='lds-ring'>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loading;
