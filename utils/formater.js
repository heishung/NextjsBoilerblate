/*
 * @strDate : format
 */

const formatDateTime = strDate => {
  const date = new Date(strDate);
  const hours = date.getHours();
  const month = date.getMonth() + 1;
  return `${hours > 12 ? hours - 12 : hours}:${date.getMinutes()}${
    hours > 12 ? 'PM' : 'AM'
  } - ${date.getDate()}/${month < 10 ? `0${month}` : month}/${date.getFullYear()}`;
};

const formatDate = strDate => {
  const date = new Date(strDate);
  const month = date.getMonth() + 1;
  return `${date.getDate()}/${month < 10 ? `0${month}` : month}/${date.getFullYear()}`;
};

exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
