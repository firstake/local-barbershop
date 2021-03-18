export const formatDate = (dateString) => {
  const date = new Date(dateString.split(':').reverse().join('-'));

  return `
    ${date.toLocaleDateString('en', {weekday: 'short'})}, 
    ${date.getDate()} ${date.toLocaleString('en', {month: 'long'})}, 
    ${date.getFullYear()}
  `;
};
