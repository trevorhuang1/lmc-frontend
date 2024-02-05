const card = document.getElementById("card");
const dropZone = document.getElementById("drop-zone-UL");
const dropZoneUR = document.getElementById("drop-zone-UR");

card.addEventListener('dragstart', function(event) {
    console.log(event);
})

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
dropZoneUR.addEventListener('dragover', function(event)
{
    event.preventDefault();
})
dropZoneUR.addEventListener('drop', function(event)
{
    dropZoneUR.prepend(card);
    card.style.width = "300px";
    card.style.height = "250px";
})