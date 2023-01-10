//CALCULATOR Selectors
const currenetNumber = document.querySelector('.currentNumber');
const perviousNumber = document.querySelector('.perviousNumber p');
const mathSign = document.querySelector('.mathSign');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

//HISTORY Selectors
const calculatorHistory = document.querySelector('.history');
const historyButton = document.querySelector('.history-btn');

let result = '';

//FUNCTIONS
const displayNumbers = function () {
  if (this.textContent === '.' && currenetNumber.innerHTML.includes('.'))
    return;
  if (this.textContent === '.' && currenetNumber.innerHTML === '')
    return (currenetNumber.innerHTML = '0.');
  if (this.textContent === '.' && currenetNumber.innerHTML === '-') {
    return (currenetNumber.innerHTML = '-0.');
  }
  currenetNumber.innerHTML += this.textContent;
};

const operate = function () {
  if (currenetNumber.innerHTML === '' && this.textContent === '-') {
    currenetNumber.innerHTML = '-';
    return;
  } else if (currenetNumber.innerHTML === '') return;

  if (mathSign.innerHTML !== '') {
    showResult();
  }
  perviousNumber.innerHTML = currenetNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currenetNumber.innerHTML = '';
};

const showResult = function () {
  if (perviousNumber.innerHTML === '' || currenetNumber === '') return;

  let currentNum = Number(currenetNumber.innerHTML);
  let pervNum = Number(perviousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch (operator) {
    case '+':
      result = currentNum + pervNum;
      break;
    case '-':
      result = pervNum - currentNum;
      break;
    case ':':
      result = pervNum / currentNum;
      break;
    case 'x':
      result = currentNum * pervNum;
      break;
    case '2^':
      result = pervNum ** currentNum;
      break;
  }

  addToHistory();
  historyButton.classList.add('active');
  currenetNumber.innerHTML = result;
  perviousNumber.innerHTML = '';
  mathSign.innerHTML = '';
};

const addToHistory = function () {
  const newHistoryItem = document.createElement('li');
  newHistoryItem.classList.add('history-item');
  newHistoryItem.innerHTML = `${currenetNumber.innerHTML} ${mathSign.innerHTML} ${perviousNumber.innerHTML} = ${result}`;
  calculatorHistory.appendChild(newHistoryItem);
};

const clearScreen = function () {
  result = '';
  currenetNumber.innerHTML = '';
  mathSign.innerHTML = '';
  perviousNumber.innerHTML = '';
};

const clearHistory = function () {
  calculatorHistory.innerHTML = '';
  if (calculatorHistory.textContent === '') {
    historyButton.classList.remove('active');
  }
};

//EVENTS
operatorButtons.forEach((button) => button.addEventListener('click', operate));
equalsButton.addEventListener('click', showResult);
clearButton.addEventListener('click', clearScreen);
numberButtons.forEach((button) =>
  button.addEventListener('click', displayNumbers)
);
historyButton.addEventListener('click', clearHistory);
