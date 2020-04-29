const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const rand = Math.random();
    // Success if bigger than 0.5, else Reject
    if (rand > 0.5) {
      resolve(rand);
    } else {
      reject(rand);
    }
  }, 2000);
});

doWorkPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
