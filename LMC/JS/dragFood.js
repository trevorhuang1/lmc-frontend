const card = document.getElementById("card");
var counter = 0;
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