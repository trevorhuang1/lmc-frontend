const card = document.getElementById("card");
var counter = 0;
const dropZoneUL = document.getElementById("drop-zone-UL");
const dropZoneUR = document.getElementById("drop-zone-UR");
const dropZoneBL = document.getElementById("drop-zone-BL");
const dropZoneBR = document.getElementById("drop-zone-BR");

const dropZones = [dropZoneUL,dropZoneUR,dropZoneBL,dropZoneBR];
card.addEventListener('dragstart', function(event) {
    printItemsInDropZones();
    const draggedElementId = event.target.querySelector('img').id;
    // Attach the ID to the data being transferred
    event.dataTransfer.setData("text/plain", draggedElementId);
    console.log(event);
})

dropZones.forEach(function(dropZone)
{
    dropZone.addEventListener('dragover', function(event)
    {
        event.preventDefault();
    })
    dropZone.addEventListener('drop', function(event) {
        const droppedElementId = event.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);
        console.log("Dropped element ID:", droppedElementId);
        // Now you can use the droppedElement or its ID as needed
        dropZone.prepend(droppedElement);
        droppedElement.style.width = "300px";
        droppedElement.style.height = "250px";
    })
})

function openNav(x)
{
    document.getElementById("sideNav-content").style.display = "block";
    console.log(counter);
    if (counter < 1){
        document.getElementById("sideNav").style.width = "200px";
        x.classList.toggle("change");
        counter += 1;
    }
    else
    {
       closeNav();
    }        
}
function closeNav()
{
    document.getElementById("sideNav").style.width = "50px";
    document.getElementById("sideNav-content").style.display = "none";
    counter = 0;
}
function getItemsInDropZone(dropZone) {
    const items = Array.from(dropZone.children).map(item => item.innerText);
    return items;
}

function getAllItemsInDropZones() {
    const allItems = [];
    dropZones.forEach(dropZone => {
        const itemsInDropZone = getItemsInDropZone(dropZone);
        allItems.push(...itemsInDropZone);
    });
    return allItems;
}

function printItemsInDropZones() {
    const allItems = getAllItemsInDropZones();
    console.log(allItems);
}