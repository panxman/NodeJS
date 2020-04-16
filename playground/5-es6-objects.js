// Object property shorthand

const name = "Panos";
const userAge = "27";

const user = {
  name,
  age: userAge,
  location: "Melbourne",
};

console.log(user);

// Object destructuring

const product = {
  label: "Red notebook",
  price: 3,
  stock: 201,
  salePrice: undefined,
};

// const label = product.label;
// const stock = product.stock;

// const {label:productLabel, stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);

const transaction = (type, { label, stock }) => {
  console.log(type);
  console.log(label);
  console.log(stock);
};

transaction("order", product);