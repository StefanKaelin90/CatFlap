let myImgs = ["StarAlliance.jpg","edelweiss_ground.jpg","LOT_ground.jpg","edelweiss_landing.jpg","airberlin.jpg","SWISS_Airbus.jpg","Germania.jpg","SWISS_Boeing.jpg","flypgs.jpg","SWISS_takeoff.jpg","KLM.jpg","LOT_edelweiss.jpg"];
let picPath = "./img/pics/";
let currentIndex = 0;
let arrLengthOutput = myImgs.length;

function render() {
    for (let index = 0; index < myImgs.length; index++) {
        let currentSrc = picPath+myImgs[index];
        let singlePic = document.getElementById('content');
        
        // all small pics are generated in the content div
        addImgToHTML(currentSrc,index,singlePic);  
    }
}


// add small pics to the content div
function addImgToHTML(src,i,pic) {
    pic.innerHTML += `
    <img onclick="toggleOverlaySet(${i})" id="${i}" class="single_pic" src="${src}" alt="pic ${i}">
    `
}


function toggleOverlayReset() {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
}


// onclick event to open the overlay with the large picture
function toggleOverlaySet(i) {
    currentIndex = i;
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
    let largePicSrc = picPath+myImgs[i];
    let largePicDiv = document.getElementById('large_pic');
    let buttonDiv = document.getElementById('button_section');
    
    setLargePicSrcToOverlay(largePicSrc, largePicDiv);
    addButtonsSection(buttonDiv);
    setIndexOfPicToOverlay(currentIndex);
    addDescription(currentIndex);
}


function setLargePicSrcToOverlay(src,pic,){
    pic.innerHTML = `
    <img id="large_pic_img" class="large_pic_img" src="${src}">
    `
}


function setIndexOfPicToOverlay(currIn) {
    let currentIndexOutput = currIn + 1;
    let indexOutput = currentIndexOutput + " / " + arrLengthOutput;
    let indexText = document.getElementById('overlay_text');
    indexText.innerText = indexOutput; 
}


function addButtonsSection(buttonDiv){
    buttonDiv.innerHTML = `
    <img onclick="stopPropa(event); jumpBack()" class="buttons" src="./img/arrow_left.png">
    <p id="overlay_text" class="overlay_text"></p>
    <img onclick="stopPropa(event); jumpNext()" class="buttons" src="./img/arrow_right.png"> 
    `
}


function stopPropa(event) {
    event.stopPropagation();
}


function jumpBack() {
    let priorIndex = currentIndex - 1;
    if (priorIndex < 0) {
        priorIndex = myImgs.length-1;
    }
    currentIndex = priorIndex;
    let priorPic = picPath+myImgs[priorIndex];
    changePicSrc(priorPic);
    setIndexOfPicToOverlay(currentIndex);
    addDescription(currentIndex);
}


function jumpNext() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= myImgs.length) {
        nextIndex = 0;
    }
    currentIndex = nextIndex;
    let nextPic = picPath+myImgs[nextIndex];
    changePicSrc(nextPic);
    setIndexOfPicToOverlay(currentIndex);
    addDescription(currentIndex);
}


function changePicSrc(picId) {
    let changeSrc = document.getElementById('large_pic_img');
    changeSrc.src = picId;
}


function addDescription(currIn) {
    let description = document.getElementById('description');
    let descriptionText = myImgs[currIn];
    descriptionText = descriptionText.replace('.jpg','');
    description.innerHTML = descriptionText;
}