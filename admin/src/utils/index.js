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

export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  const dis = originalPrice - originalPrice * (discountPercentage / 100);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(dis);
};

export const formatToINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};
