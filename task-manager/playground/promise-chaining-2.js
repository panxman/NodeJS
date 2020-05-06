require("../src/db/mongoose");
const Task = require("../src/models/task");

// 5eabcdf287763754e033d78a

// Task.findByIdAndRemove("5eabcdf287763754e033d78a")
//   .then(() => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskandCount = async (id) => {
  const removedTask = Task.findByIdAndDelete(id);
  //console.log(removedTask);

  const count = Task.countDocuments({ completed: true });
  return count;
}

deleteTaskandCount("5eabcdf287763754e033d78a").then((count) => {
  console.log("Count: ", count);
}).catch((e) => {
  console.log("Error: ", e);
})