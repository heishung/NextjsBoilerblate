import React, { useState } from 'react';
import ReactModal from 'react-modal';

const ChangeOrderGuild = ({ onChangeOrder, options, selectedOption }) => {
  const [showSelect, setShowSelect] = useState(false);
  return (
    <>
      <div
        className='input-sort'
        onClick={() => {
          setShowSelect(true);
        }}
      >
        {selectedOption.labelInput}
        <span className='fun-ic ic-sort'></span>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={showSelect}
        overlayClassName='modal-overlay'
        className='modal-sort-guild-content modal-content on-bottom'
        contentLabel='onRequestClose Example'
        onRequestClose={() => {
          setShowSelect(false);
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className='model-wrap'>
          {options.map((option) => (
            <div
              key={option.value}
              className={`option${selectedOption.value == option.value ? ' active' : ''}`}
              onClick={() => {
                setShowSelect(false);
                onChangeOrder(option);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </ReactModal>
    </>
  );
};

export default ChangeOrderGuild;
