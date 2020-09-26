const fileInputBigConteiner = document.querySelector('.invisible-file-uploader')
const fileInputButton = document.querySelector('.real-input-button')
const submitBtn = document.querySelector('#submit-btn')
const fileReader = new FileReader()
const img = new Image();
let imgName = ''

fileInputBigConteiner.onchange = () => {
    fileReader.onload = () => {
        img.src = fileReader.result
        document.querySelector('.img-preview').src = img.src
        imgName = fileInputBigConteiner.files[0].name;
        submitBtn.style.display = 'block'
    }
    fileReader.readAsDataURL(fileInputBigConteiner.files[0])
}

fileInputButton.onchange = () => {
    fileReader.onload = () => {
        img.src = fileReader.result
        document.querySelector('.img-preview').src = img.src
        imgName = fileInputBigConteiner.files[0].name;
        submitBtn.style.display = 'block'
    }
    fileReader.readAsDataURL(fileInputButton.files[0])
}

submitBtn.addEventListener('click', ()=>{
    window.location.assign(`/upload-img/${img.src}/${imgName}`)
})