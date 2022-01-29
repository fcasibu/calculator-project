let topNum = ''
let bottomNum = ''
let operator = ''
let result;
let buttons = document.querySelectorAll('button')
let dot = false

let bottomScreen = document.querySelector('h2')
let topScreen = document.querySelector('h3')

// Mouse click
buttons.forEach(button => button.addEventListener('click', function () {
    if (button.classList.contains('number')) {
        numberPress(button)
    } else if (button.classList.contains('operator')) {
        operatorPress(button)
    } else if (button.classList.contains('equal')) {
        equal()
    } else if (button.classList.contains('clear')) {
        clearAll()
    } else if (button.classList.contains('del')) {
        backspace()
    }
}))

// Keyboard press
function keyboardPressed(e) {
    let key = document.querySelector(`button[data-key="${e.key}"]`)
    if (!key) return
    key.classList.add('pressed')
    setTimeout(function () {
        key.classList.remove('pressed')
    }, 100)

    numberPress(key)
    operatorPress(key);
    `${e.key}` === '=' ? equal(): false;
    `${e.key}` === 'Backspace' ? backspace(): false;
    `${e.key}` === 'c' ? clearAll(): false;
}

// Display number pressed/clicked in the calculator to the bottom of the screen
function numberPress(e) {
    if (e.classList.contains('number')) {
        if (e.textContent === '.' && !dot) {
            dot = true
        } else if (e.textContent === '.' && dot) {
            return
        }
        bottomNum += e.textContent
        bottomScreen.textContent = bottomNum
    }
}

// Stores the operator in the operator variable
function operatorPress(e) {
    const operatorName = e.textContent
    if (e.classList.contains('operator')) {
        dot = false
        if (!bottomNum) return; // Returns nothing if user didn't input a second number
        if (topNum && operator && bottomNum) {
            operate() // Calls the operate function if all condition is true
        } else {
            result = parseFloat(bottomNum)
        }
        operator = operatorName
        topNumber()
    }
}

// Displays the top number of the screen
function topNumber() {
    topNum += bottomNum + ' ' + operator + ' '
    topScreen.textContent = topNum
    bottomScreen.textContent = ''
    bottomNum = bottomScreen.textContent
}

function operate() {
    if (operator === '+') {
        result = parseFloat(result) + parseFloat(bottomNum)
    } else if (operator === '-') {
        result = parseFloat(result) - parseFloat(bottomNum)
    } else if (operator === '*') {
        result = parseFloat(result) * parseFloat(bottomNum)
    } else if (operator === '÷') {
        result = parseFloat(result) / parseFloat(bottomNum)
    } else if (operator === '%') {
        result = parseFloat(result) % parseFloat(bottomNum)
    }
}

function equal() {
    operate()
    if (isNaN(result)) {
        topScreen.textContent = "You can't do that ! ! !"
        setTimeout(() => clearAll(), 1200)
    } else {
        topScreen.textContent = Math.round((result + Number.EPSILON) * 100) / 100
    }
    dot = false;

    bottomScreen.textContent = ''
    bottomNum = bottomScreen.textContent
}


function backspace() {
    const slicebottomScreen = bottomScreen.textContent.slice(0, -1)
    const slicebottomNum = bottomNum.slice(0, -1)
    bottomScreen.textContent = slicebottomScreen
    bottomNum = slicebottomNum
    dot = false
}

function clearAll() {
    topNum = ''
    bottomNum = ''
    operator = ''
    bottomScreen.textContent = 0
    topScreen.textContent = ''
    result = ''
    dot = false
}

window.addEventListener('keydown', keyboardPressed)
