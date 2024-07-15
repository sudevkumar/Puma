export const navBar = [
  "New",
  "Women",
  "Men",
  "Kids",
  "Motorsport",
  "Collaboration",
  "Sports",
  "Outlet",
];

export const validatePassword = (pass) => {
  const regex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return regex.test(pass);
};
