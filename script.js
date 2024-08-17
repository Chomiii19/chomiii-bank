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
const currentDate = document.querySelector(".spanDate");
const balanceTotal = document.querySelector(".balanceValue");
const transaction = document.querySelector(".transactions");
const movementType = document.querySelector(".movement-type");
const transferTo = document.querySelector(".transferUser");
const transferAmount = document.querySelector(".transferBalance");
const transferBtn = document.querySelector(".transferBtn");
const requestAmount = document.querySelector(".requestAmount");
const requestBtn = document.querySelector(".requestBtn");
const deleteUser = document.querySelector(".deleteUsername");
const deletePassword = document.querySelector(".deletePassword");
const deleteBtn = document.querySelector(".deleteBtn");

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
const incrementNum = function (elem, totalDuration) {
  const elements = elem.length ? elem : [elem];
  elements.forEach((el) => {
    const endValue = parseInt(el.getAttribute("data-val"), 10);
    const startTime = Date.now();

    const counter = setInterval(function () {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);
      const currentValue = Math.floor(progress * endValue);

      el.textContent = `PHP ${new Intl.NumberFormat("en-US").format(
        currentValue
      )}`;

      if (progress === 1) {
        clearInterval(counter);
      }
    }, 10);
  });
};

incrementNum(element, 100000);

//LOGIN SIGNUP
let currentAccount;
confirmBtn.addEventListener("click", function () {
  accounts.forEach((acc) => {
    if (username.value === acc.username && Number(password.value) === acc.pin) {
      currentAccount = acc;
      bankSection.style.display = "flex";

      closePopUp();
      display(currentAccount);
      currentAccount.balance = currentAccount.movements.reduce(
        (acc, mov) => (acc += mov)
      );
      updateBalance(currentAccount);
      balanceTotal.setAttribute("data-val", currentAccount.balance);
      incrementNum(balanceTotal, 3000);
    }
  });
});

// Create current date and time
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  // weekday: 'long',
};

const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDaysPassed(new Date(), date);

  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

currentDate.textContent = new Intl.DateTimeFormat("en-US", options).format(now);

//display UI when logged in
function display(acc) {
  signUpBtn.style.display = "none";
  logInBtn.style.display = "none";
  const fn = acc.owner.split(" ");
  welcome.textContent = fn[0];
  welcomeContainer.style.display = "inline";
  displayTransactions(acc);
}

function updateBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => (acc += mov));
  balanceTotal.textContent = `PHP ${new Intl.NumberFormat("en-US").format(
    acc.balance
  )}`;
  balanceTotal.setAttribute("data-val", acc.balance);
  displayTransactions(currentAccount);
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
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatDate(date, "en-US");

    const html = `
  <div class="movements">
    <div class="movement-type ${type}">${i + 1} ${type.toUpperCase()}</div>
    <div class="movement-date ">${displayDate}</div>
    <div class="movement-value">PHP ${new Intl.NumberFormat("en-US").format(
      acc
    )}</div>
  </div>`;
    transaction.insertAdjacentHTML("afterbegin", html);
  });
};

//transfer
transferBtn.addEventListener("click", function () {
  const amount = Number(transferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === transferTo.value);
  if (
    receiverAcc &&
    receiverAcc.username !== currentAccount.username &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(now.toISOString());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(now.toISOString());
    updateBalance(currentAccount);

    transferAmount.value = transferTo.value = "";
  }
});

//request
requestBtn.addEventListener("click", function () {
  const amount = Number(requestAmount.value);
  if (amount <= currentAccount.balance * 0.5) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(now.toISOString());
    updateBalance(currentAccount);
    requestAmount.value = "";
  }
});

//close
deleteBtn.addEventListener("click", function () {
  if (
    deleteUser.value === currentAccount.username &&
    +deletePassword.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => currentAccount.username === acc.username
    );
    accounts.splice(index, 1);
    currentAccount = null;

    bankSection.style.display = "none";
    signUpBtn.style.display = "inline";
    logInBtn.style.display = "inline";
    welcomeContainer.style.display = "none";
    transaction.innerHTML = "";

    deleteUser.value = "";
    deletePassword.value = "";
  }
});
