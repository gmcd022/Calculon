let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldReset = false

const point = document.getElementById('point')
const operator = document.querySelectorAll('[data-operator]')
const numberButtons= document.querySelectorAll('[data-number]')
const displayCurrent= document.getElementById('displayCurrent')
const clearButton = document.getElementById('clearB')
const equal = document.getElementById('equals')
const deleteButton = document.getElementById('deleteB')

numberButtons.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

operator.forEach((button) =>
button.addEventListener('click', () => store(button.textContent))
)

clearButton.addEventListener('click', clear)

deleteButton.addEventListener('click', backspace)

equal.addEventListener('click', evaluate)

point.addEventListener('click', addPoint)
       
function evaluate() {
    if (currentOperation === null || shouldReset) return
    if (currentOperation === '÷' && displayCurrent.textContent === '0') {
        alert("Illegal Operation! Math Police dispatched to your location")
        clear()
        return
    }
    secondOperand = displayCurrent.textContent
    displayCurrent.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
    firstOperand = displayCurrent.textContent
    secondOperand = ''
    currentOperation = null
    }
    
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(currentOperation, a, b) {
    a = Number(a)
    b = Number(b)
    switch (currentOperation) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '÷':
            if (b === 0)
              alert("Oh G'mon!") 
            else return divide(a, b)
        default:
            return null              
    }
}

function appendNumber(number) {
    if (displayCurrent.textContent === '0' || shouldReset)
    resetScreen()
    displayCurrent.textContent += number
}

function store (operator) {
   if (currentOperation !== null) evaluate()
    firstOperand = displayCurrent.textContent
    currentOperation = operator
    shouldReset = true
}

function resetScreen() {
    displayCurrent.textContent= ''
    shouldReset = false
}

function clear() {
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
    displayCurrent.textContent = '0'
}

function backspace() {
    let tempText = displayCurrent.textContent
    displayCurrent.textContent = tempText.slice(0,-1)
}

function addPoint() {
    if (shouldReset) resetScreen()
    if (displayCurrent.textContent === '')
        displayCurrent.textContent = '0'
    if (displayCurrent.textContent.includes('.')) return
    displayCurrent.textContent += '.'  
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}