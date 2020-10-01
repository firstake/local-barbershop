export const withExclamation = (str) => {
  if (str) {
    return str.match(/!$/) ? str : `${str}!`;
  }

  return str;
};
