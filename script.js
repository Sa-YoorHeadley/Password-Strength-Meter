//Toggle Visisbility
const showToggle = document.getElementById("show-hide")
showToggle.addEventListener('click', () => {
    const inputField = showToggle.nextElementSibling
    if(inputField.type === "text"){
        inputField.type = "password"
    }
    else if(inputField.type === "password"){
        inputField.type = "text"
    }
})


//Password Checks

const strengthMeter = document.getElementById("strength-meter")
const passwordInput = document.getElementById("password")
const reasonsContainer = document.getElementById("reasons")
const checksContainer = document.getElementById("checks")

passwordInput.addEventListener("input", updateStrengthMeter)

function updateStrengthMeter(){
    const weaknesses = calculateStrength(passwordInput.value)
    let strength = 100
    checksContainer.innerHTML = ''
    weaknesses.forEach(weakness => {
        //Calculate strength value
        strength -= weakness.deduction

        //Add class to checks
        if(weakness.status === "error"){
            //Adding appropriate icon
            const iconElement = document.createElement("i")
            iconElement.classList.add("fa", "fa-exclamation-circle")
            checksContainer.append(iconElement)

            //Removing old class adn adding new
            checksContainer.classList.remove("success")
            checksContainer.classList.add(weakness.status)
        }
        else if(weakness.status === "success"){
            //Adding appropriate icon
            const iconElement = document.createElement("i")
            iconElement.classList.add("fa", "fa-check")
            checksContainer.append(iconElement)

            //Removing old class adn adding new
            checksContainer.classList.remove("error")
            checksContainer.classList.add(weakness.status)
        }

        //Add message in small
        const messageElement = document.createElement("small")
        messageElement.classList.add("reasons")
        messageElement.innerText = weakness.message
        checksContainer.append(messageElement)
    })
    //Set value
    strengthMeter.style.setProperty("--value", strength)

    //Set color
    if(strength <= 35){
        strengthMeter.style.setProperty("--bar-color", "red")
    }
    else if(strength <= 75){
        strengthMeter.style.setProperty("--bar-color", "yellow")
    }
    else if(strength > 75){
        strengthMeter.style.setProperty("--bar-color", "lightgreen")
    }
}

function calculateStrength(password){
    const weaknesses = []

    weaknesses.push(lengthWeakness(password))

    return weaknesses
}

function lengthWeakness(password){
    if(password.length < 8){
        return {message: "Password must be longer than 8 characters", deduction: 40, status: "error"}
    }
    else{
        return {message: "Password must be longer than 8 characters", deduction: 0, status: "success"}
    }
}