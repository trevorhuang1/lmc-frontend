const card = document.getElementById("card");
const dropZoneUL = document.getElementById("drop-zone-UL");
const dropZoneUR = document.getElementById("drop-zone-UR");
const dropZoneBL = document.getElementById("drop-zone-BL");
const dropZoneBR = document.getElementById("drop-zone-BR");
const dropZones = [dropZoneUL,dropZoneUR,dropZoneBL,dropZoneBR];
card.addEventListener('dragstart', function(event) {
    console.log(event);
})

dropZones.forEach(function(dropZone)
{
    dropZone.addEventListener('dragover', function(event)
    {
        event.preventDefault();
    })
    dropZone.addEventListener('drop', function(event)
    {
        dropZone.prepend(card);
        card.style.width = "300px";
        card.style.height = "250px";
    })
})
