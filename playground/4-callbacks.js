const doWorkCallback = (callback) => {
  setTimeout(() => {
    const rand = Math.random();
    if (rand >= 0.5) {
      callback(undefined, "Success:" + rand);
    } else {
      callback("Error: " + rand);
    }
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }

  console.log(result);
});
