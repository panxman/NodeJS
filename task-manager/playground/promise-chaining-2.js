require("../src/db/mongoose");
const Task = require("../src/models/task");

// 5eabcdf287763754e033d78a

Task.findByIdAndRemove("5eabcdf287763754e033d78a")
  .then(() => {
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
