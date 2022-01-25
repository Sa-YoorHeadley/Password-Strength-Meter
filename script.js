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

