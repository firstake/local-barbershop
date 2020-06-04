const sessionizeUser = (user) => {
  return {
    name: user.name,
    phone: user.phone,
    email: user.email,
    avatar: user.avatar,
    bookings: [...user.bookings],
  };
};

module.exports = sessionizeUser;
