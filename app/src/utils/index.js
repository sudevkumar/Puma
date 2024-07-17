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

export const support = [
  "Contact us",
  "FAQs",
  "Promotions & Sale",
  "My Account",
  "Track Order",
  "Exchange & Return Policy",
  "Shoe Care",
  "Privacy Policy",
  "Tech Glossary",
  "Terms & Conditions",
  "Initiate Return / Exchange",
  "Sneakers",
  "Running Shoes",
  "Cookie Settings",
];

export const account = [
  "Company",
  "Corporate News",
  "Press Center",
  "Investors",
  "Sustainability",
  "Careers",
  "Store Locator",
  "PUMA Articles",
];
