const fileInputBigConteiner = document.querySelector('.invisible-file-uploader')
const fileInputButton = document.querySelector('.real-input-button')
const submitBtn = document.querySelector('#submit-btn')
const filterLayer = document.querySelector('.effect-filter')
const progressBar = document.querySelector('.progress-bar')
let progressBarProgress = 0
const fileReader = new FileReader()
const img = new Image();
let imgName = ''



function runUploadEffect(){
    progressBar.style.width = progressBarProgress + '%';
    progressBarProgress += 10
}


fileInputBigConteiner.onchange = () => {
    fileReader.onload = () => {
        img.src = fileReader.result
        document.querySelector('.img-preview').src = img.src
        imgName = fileInputBigConteiner.files[0].name;
        
        filterLayer.style.display = 'block'
        setInterval(runUploadEffect, 1000)

        setTimeout(()=>{
            submitBtn.click()
        }, 10000)
    }
    fileReader.readAsDataURL(fileInputBigConteiner.files[0])
}

fileInputButton.onchange = () => {
    fileInputBigConteiner.files = fileInputButton.files
}