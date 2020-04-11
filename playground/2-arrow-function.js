// const square = function (x) {
//     return x*x;
// };

// console.log(square(3));

// const square = (x) => {return x*x;}

// const square = (x) => x * x;

// console.log(square(4));

const event = {
    name: "Tomorrowland",
    guestList: ["George", "Peter", "Jen", "Mike"],
    printGuestList() {
        console.log("Guest list for " + this.name);

        this.guestList.forEach((guest) => {
            console.log(guest + " is attending " + this.name);
        })
    }
}

event.printGuestList();