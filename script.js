const buttons = document.querySelectorAll('.btn')
const screen_last = document.querySelector('.screen-last')
const screen_current = document.querySelector('.screen-current')
const operator = ["/", "+", "-", "*"]
const reg = /[+\-\/*]/g


function calculate() {
    screen_last.textContent = screen_current.textContent
    result = eval(screen_current.textContent)
    screen_current.textContent = `${result}`
}

function chop_leading_zeros(str) {
    if (str === '0') {
        str = ""
        return str
    }
    if (str[0] === '0') {
        str = str.slice(1,)
        return str
    }
    return str
}

function checker_operator() {
    operator.forEach((e) => {
        if (screen_current.textContent.includes(e)) {
            return "TRUE"
        }
    })
    return "FALSE"
}

function screen_updater(type, text) {
    screen_current.textContent = chop_leading_zeros(screen_current.textContent)
    if (type === "id") {
        let a = screen_current.textContent.split(reg).at(-1)
        if (a.includes(text) === false) {
            screen_current.textContent += text
        }
    }
    if (type === "data-number") {
        screen_current.textContent += text
    }
    if (type === "data-operator") {
        if (text === "CLEAR") {
            screen_last.textContent = ""
            screen_current.textContent = "0"
        } else if (text === "DELETE") {
            screen_current.textContent = screen_current.textContent.slice(0, -1)
        } else if (text === "=") {
            calculate()
        } else {
            if (checker_operator()) {
                calculate()
                screen_current.textContent += text
            } else screen_current.textContent += text
        }
    }

}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        screen_updater(button.attributes[1].nodeName, button.textContent)
    })
})