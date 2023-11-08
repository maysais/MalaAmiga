const bodyElement = document.body;
const toggleButton = document.getElementById('toggle');
const screenWidth = window.innerWidth;
const background = document.querySelector('.banner');

function setDarkTheme(){
    bodyElement.style.setProperty('--background', '#00232E');
    bodyElement.style.setProperty('--main-color', '#EEE0C9');
    bodyElement.style.setProperty('--secondary-color', '#F1F0E8');
    bodyElement.style.setProperty('--tertiary-color', '#006782');
    bodyElement.style.setProperty('--neutral-color', '#002E3C');
    bodyElement.style.setProperty('--error-color', '#BA1A1A');

    if(screenWidth < 480){
        background.style.backgroundImage = "url('../Imagens/background_phone_night.svg')";
    } else{
        background.style.backgroundImage = "url('../Imagens/background_desktop_night.svg')";
    }
}

function setLightTheme(){
    bodyElement.style.setProperty('--background', '#F1F0E8');
    bodyElement.style.setProperty('--main-color', '#96B6C5');
    bodyElement.style.setProperty('--secondary-color', '#006782');
    bodyElement.style.setProperty('--tertiary-color', '#EEE0C9');
    bodyElement.style.setProperty('--neutral-color', '#DCE4E8');
    bodyElement.style.setProperty('--error-color', '#BA1A1A');
    
    if(screenWidth < 480){
        background.style.backgroundImage = "url('../Imagens/background_phone.svg')";
    } else{
        background.style.backgroundImage = "url('../Imagens/background_desktop.svg')";
    }
}

toggleButton.addEventListener('change', () => {
    if(toggleButton.checked == true){
        setLightTheme()
    } else{
        setDarkTheme()
    }
})

