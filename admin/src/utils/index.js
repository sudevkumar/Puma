export const navBar = [
  {
    title: "ADD NEW PRODUCT",
    link: "/addnewproduct",
  },
  {
    title: "SHOW ALL PRODUCT",
    link: "/",
  },
];

export const validatePassword = (pass) => {
  const regex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return regex.test(pass);
};
