import TagManager from 'react-gtm-module';

// TODO: move this variable to env or config file
const tagManagerArgs = {
  gtmId: 'GTM-WBWRVB4',
};

export const initGTM = () => {
  TagManager.initialize(tagManagerArgs);
};

export const pushDatalayer = (tagManagerArgs) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(tagManagerArgs);
};
