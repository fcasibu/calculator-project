function keyboardPressed(e) {
    const key = document.querySelector(`div[data-key="${e.key}"]`)
    if (!key) return // returns nothing if key pressed is not in the calculator
    key.classList.add('pressed')
    setTimeout(function () {
        key.classList.remove('pressed')
    }, 100)

    console.log(key)
}

window.addEventListener('keydown', keyboardPressed)

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function modulo(num1, num2) {
    return num1 % num2
}