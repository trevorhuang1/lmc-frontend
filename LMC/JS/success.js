var header = document.getElementById("header");
header.textContent = "Congrats! You made a " + localStorage.getItem("bakedgood") + "!";
var name = "/lmc-frontend/images/" + localStorage.getItem("bakedgood") + ".png";
console.log(name);
var image = document.getElementById("image");
image.style.width = '200px';
image.style.width = '200px';
image.style.objectFit = 'contain';
image.setAttribute("src", name);
console.log(image);
var points = 0;
// After 6 seconds, remove the hidden class from the Danish image to make it visible
setTimeout(function() {
    document.querySelector('.hidden').classList.remove('hidden');
}, 6000);
setTimeout(function() {
    window.location.href = "/lmc-frontend/cook";
}, 9000);
//
//
const url = "http://127.0.0.1:8028/api/users/";
const options = {
method: 'GET',
mode: 'cors',
cache: 'default',
credentials: 'include',
headers: {
    'Content-Type': 'application/json',
},
};
//
function success()
{
fetch(url, options)
.then(response => response.json())
.then(data => {
    // Handle successful response here
    let currentItems = '';
    for (const row of data) {
        if (row.uid == localStorage.getItem('uid')) {
            currentItems = row.items;
            currentPoints = row.points;
        }
    }
    console.log(currentItems); // Logging the retrieved items
    // Manipulate and update the items here
    const body = {
        uid: localStorage.getItem('uid'),
        points: currentPoints + 5,
        items: currentItems
    };
    const authoptions = {
        method: 'PUT',
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };
fetch(url, authoptions);
})
.catch(error => {
    // Handle error
    console.error('Error fetching user data:', error);
});
}
success();
