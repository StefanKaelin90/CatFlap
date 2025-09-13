let myImgs = [];
let picPath = "./img/pics/";
let currentIndex = 0;
let arrLengthOutput = 0;

// Funktion zum Laden der JSON-Daten
function loadImagesFromJSON() {
    const jsonUrl = 'https://raw.githubusercontent.com/StefanKaelin90/CatFlap/main/images.json';
    return fetch('./images.json')  // Pfad zur JSON-Datei
        .then(response => response.json())       // JSON parsen
        .then(data => {
            myImgs = data.images;                // Array 'images' aus JSON extrahieren
            arrLengthOutput = myImgs.length;     // Array-Länge setzen
            render();                             // Nach dem Laden die Bilder rendern
        })
        .catch(error => console.error("Fehler beim Laden des JSON:", error));
}

// Funktion, um die Bilder zu rendern
function render() {
    let singlePic = document.getElementById('content');
    singlePic.innerHTML = '';  // Vor dem Hinzufügen leeren, um doppelte Einträge zu vermeiden

    // Alle Bilder im myImgs-Array durchgehen und anzeigen
    for (let index = 0; index < myImgs.length; index++) {
        let currentSrc = picPath + myImgs[index];
        addImgToHTML(currentSrc, index, singlePic);
    }
}

// Bilder zum HTML hinzufügen
function addImgToHTML(src, i, pic) {
    pic.innerHTML += `
    <img onclick="toggleOverlaySet(${i})" id="${i}" class="single_pic" src="${src}" alt="pic ${i}">
    `;
}

// Overlay zurücksetzen
function toggleOverlayReset() {
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
}

// Overlay öffnen und Bild anzeigen
function toggleOverlaySet(i) {
    currentIndex = i;
    let overlayRef = document.getElementById('overlay');
    overlayRef.classList.toggle('d_none');
    let largePicSrc = picPath + myImgs[i];
    let largePicDiv = document.getElementById('large_pic');
    let buttonDiv = document.getElementById('button_section');

    setLargePicSrcToOverlay(largePicSrc, largePicDiv);
    addButtonsSection(buttonDiv);
    setIndexOfPicToOverlay(currentIndex);
    addDescription(currentIndex);
}

// Großes Bild ins Overlay setzen
function setLargePicSrcToOverlay(src, pic) {
    pic.innerHTML = `
    <img id="large_pic_img" class="large_pic_img" src="${src}">
    `;
}

// Bildindex ins Overlay setzen
function setIndexOfPicToOverlay(currIn) {
    let currentIndexOutput = currIn + 1;
    let indexOutput = currentIndexOutput + " / " + arrLengthOutput;
    let indexText = document.getElementById('overlay_text');
    indexText.innerText = indexOutput;
}

// Buttons im Overlay hinzufügen
function addButtonsSection(buttonDiv) {
    buttonDiv.innerHTML = `
    <img onclick="stopPropa(event); jumpBack()" class="buttons" src="./img/arrow_left.png">
    <p id="overlay_text" class="overlay_text"></p>
    <img onclick="stopPropa(event); jumpNext()" class="buttons" src="./img/arrow_right.png">
    `;
}

// Event Propagation stoppen
function stopPropa(event) {
    event.stopPropagation();
}

// Zum vorherigen Bild springen
function jumpBack() {
    let priorIndex = currentIndex - 1;
    if (priorIndex < 0) {
        priorIndex = myImgs.length - 1;
    }
    currentIndex = priorIndex;
    let priorPic = picPath + myImgs[priorIndex];
    changePicSrc(priorPic);
    setIndexOfPicToOverlay(currentIndex);
    addDescription(currentIndex);
}

// Zum nächsten Bild springen
function jumpNext() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= myImgs.length) {
        nextIndex = 0;
    }
    currentIndex = nextIndex;
    let nextPic = picPath + myImgs[nextIndex];
    changePicSrc(nextPic);
    setIndexOfPicToOverlay(currentIndex);
    addDescription(currentIndex);
}

// Bildquelle ändern
function changePicSrc(picId) {
    let changeSrc = document.getElementById('large_pic_img');
    changeSrc.src = picId;
}

// Beschreibung des Bildes hinzufügen
function addDescription(currIn) {
    let description = document.getElementById('description');
    let descriptionText = myImgs[currIn];
    descriptionText = descriptionText.replace('.jpg', '');
    description.innerHTML = descriptionText;
}

// Beim Laden der Seite das JSON laden und das Rendering starten
window.onload = function() {
    loadImagesFromJSON();  // Lade die Bilder beim Laden der Seite
}
