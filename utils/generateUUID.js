// TODO: remove this
const UUIDKey = 'funtap-uuid';

function localStorageGetItem(key) {
  if (localStorage) {
    return localStorage.getItem(key);
  }
}

function localStorageSetItem(key, value) {
  if (localStorage) {
    localStorage.setItem(key, value);
  } else {
    console.error('Local storage is not support');
  }
}

function generateUUID() {
  let uuid = localStorageGetItem(UUIDKey);
  if (!uuid || uuid.length > 37) {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : r && 0x3 | 0x8).toString(16);
    });
    localStorageSetItem(UUIDKey, uuid);
  }
  return uuid;
}

export default generateUUID;
