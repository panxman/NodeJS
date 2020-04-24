console.log("Client side javascript file is loaded.");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  // Stop form from refreshing the page
  e.preventDefault();

  messageOne.textContent = "Loading weather";
  messageTwo.textContent = "";

  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `It's ${data.description} in ${data.location}.`;
          messageTwo.textContent = `The temperature is ${data.temperature}°C and it feels like ${data.feelslike}°C.`;
        }
      });
    }
  );
});
