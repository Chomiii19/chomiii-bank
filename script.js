"use strict";

//ELEMENTS
const signUpBtn = document.querySelector(".signUp");
const logInBtn = document.querySelector(".logIn");
const welcome = document.querySelector(".welcomeUsername");
const welcomeContainer = document.querySelector(".welcomeUser");
const confirmBtn = document.querySelector(".confirm");
const popUpTitle = document.querySelector(".popUpTitle");
const element = document.querySelectorAll(".num");
const getStartedBtn = document.querySelector(".getStarted");
const username = document.querySelector(".dataInputUser");
const password = document.querySelector(".dataInputPassword");

const bankSection = document.querySelector(".bankSection");
const balanceTotal = document.querySelector(".balanceValue");
const transaction = document.querySelector(".transactions");
const movementType = document.querySelector(".movement-type");

const popUp = document.querySelector(".popUp");
const introSection = document.querySelector(".introduction");

//Account data
const account1 = {
  owner: "Jomari Borines",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2023-09-21T14:43:26.374Z",
    "2023-09-22T18:49:59.371Z",
    "2023-09-23T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

//scroll feature
const features = document.querySelector(".features");
let scrollAmount = 0;
let scrollDirection = 1;
let isPaused = false;

function scroll() {
  if (!isPaused) {
    const scrollSpeed = 0.5;
    scrollAmount += scrollSpeed * scrollDirection;
    features.scrollLeft = scrollAmount;

    if (
      scrollAmount >= features.scrollWidth - features.clientWidth ||
      scrollAmount <= 0
    )
      scrollDirection *= -1;
  }

  requestAnimationFrame(scroll);
}

features.addEventListener("mouseenter", (el) => {
  isPaused = true;
  // features.style.overflowX = "auto";
});

features.addEventListener("mouseleave", () => (isPaused = false));
scroll();

//popUp function
const popUpFunction = function (str) {
  popUp.classList.add("popUpActive");
  introSection.classList.add("blurred");
  confirmBtn.textContent = str;
  popUpTitle.textContent = `${str} Form`;
};

const closePopUp = function () {
  introSection.classList.remove("blurred");
  popUp.classList.remove("popUpActive");
  username.value = password.value = "";
};

document.addEventListener(
  "keydown",
  (event) =>
    event.key === "Escape" &&
    introSection.classList.contains("blurred") &&
    closePopUp()
);

introSection.addEventListener(
  "click",
  () => introSection.classList.contains("blurred") && closePopUp()
);

//Button functionalities
signUpBtn.addEventListener("click", () => popUpFunction("Sign Up"));
logInBtn.addEventListener("click", () => popUpFunction("Log In"));
getStartedBtn.addEventListener("click", (event) => {
  if (currentAccount) {
    bankSection.scrollIntoView({ behavior: "smooth" });
  } else {
    event.stopPropagation();
    popUpFunction("Sign Up");
  }
});

//number increment
const interval = 10000;
const incrementNum = function (elem) {
  const elements = elem.length ? elem : [elem];
  elements.forEach((el) => {
    let startValue = 0;
    const endValue = parseInt(el.getAttribute("data-val"));
    const duration = Math.floor(interval / endValue);

    const counter = setInterval(function () {
      startValue += 1;
      el.textContent = `PHP ${new Intl.NumberFormat("en-US").format(
        startValue
      )}`;
      if (startValue === endValue) clearInterval(counter);
    }, duration);
  });
};

incrementNum(element);

//LOGIN SIGNUP
let currentAccount;
confirmBtn.addEventListener("click", function () {
  accounts.forEach((acc) => {
    if (username.value === acc.username && Number(password.value) === acc.pin) {
      currentAccount = acc;
      bankSection.style.display = "flex";

      closePopUp();
      display(currentAccount);
      incrementNum(balanceTotal);
    }
  });
});

//display UI when logged in
function display(acc) {
  signUpBtn.style.display = "none";
  logInBtn.style.display = "none";
  const fn = acc.owner.split(" ");
  welcome.textContent = fn[0];
  welcomeContainer.style.display = "inline";
  displayTransactions(acc);
}

//username generate
accounts.forEach((acc) => {
  const [fn, ln] = acc.owner.toLowerCase().split(" ");
  acc.username = [fn[0] + ln[0]].join("");
});

//transactions
const displayTransactions = function (account) {
  transaction.innerHTML = "";
  account.movements.forEach((acc, i) => {
    const type = acc > 0 ? "deposit" : "withdraw";

    const html = `
  <div class="movements">
    <div class="movement-type ${type}">${i + 1} ${type.toUpperCase()}</div>
    <div class="movement-date ">2 days ago</div>
    <div class="movement-value">PHP ${acc}</div>
  </div>`;
    transaction.insertAdjacentHTML("afterbegin", html);
  });
};
