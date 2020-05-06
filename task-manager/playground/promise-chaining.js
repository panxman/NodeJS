require("../src/db/mongoose");
const User = require("../src/models/user");

// 5eabd646cdc9e628b8678714
// 5ead02771722e852b0c4728c

// User.findByIdAndUpdate("5ead02771722e852b0c4728c", {
//   age: 27,
// })
//   .then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 29 });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeandCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });

  return count;
};

updateAgeandCount("5ead02771722e852b0c4728c", 29)
  .then((count) => {
    console.log("Result:", count);
  })
  .catch((e) => {
    console.log("Error:", e);
  });
