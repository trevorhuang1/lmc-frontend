---
comments: True
layout: base
title: LMC Login page
description: cooking
courses: {'compsci': {'week': 4}}
type: hacks
---
<style>
    .container{
        padding-bottom: 10px;
        text-align: center;
    }
    .userInput
    {
        background: transparent;
        border: none;
        border-bottom: 1px solid #d3d3d3;
    }
    #username
    {
        padding: 20px;
    }
    #password
    {
        padding: 5px;
    }
    form{
        height: 520px;
        width: 400px;
        background-color: rgba(255,255,255,0.13);
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,255,255,0.1);
        box-shadow: 0 0 40px rgba(8,7,16,0.6);
        padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}
    button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 7px 22px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 12px;
    }
    #rectangle{
        width:200px;
        height:300px;
        background:gray;
        position: fixed;
    }   
    .background{
        width: 430px;
        height: 520px;
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
        top: 50%;
    }
    #title
    {
        color: white;
        font-size: 100px;
    }
    #titleContainer
    {
        
    }

    
</style>
<!-- 
A simple HTML login form with a Login action when button is pressed.  

The form triggers the login_user function defined in the JavaScript below when the Login button is pressed.
-->
<div id="titleContainer">
    <h1 id="title">Let-M-Cook</h1>
</div>

<div class="background">

</div>

<div class="container">
    <form id="username" action="javascript:login_user()">
        <p><label>
            User ID:
            <input class="userInput" type="text" name="uid" id="uid" required>
        </label></p>
        <p id="password"><label>
            Password:
            <input class="userInput" type="password" name="password" id="password" required>
        </label></p>
        <p>
            <button onclick="login_user()">Login</button>
        </p>
    </form>
</div>

<!-- <form action="javascript:login_user()">
    <p><label>
        User ID:
        <input type="text" name="uid" id="uid" required>
    </label></p>
    <p><label>
        Password:
        <input type="password" name="password" id="password" required>
    </label></p>
    <p>
        <button>Login</button>
    </p>
</form> -->
<form action = "javascript:createUser()">
    <!-- Add input fields for user details -->
    <label ><input type="text" id="new_name" required></label>
    <label><input type="text" id="new_uid" required></label>
    <label>    <input type="password" id="new_password" required></label>
    <label><input type="text" id="new_dob" required></label>
    <button type="button">Create User</button>
</form>
<!-- 
Below JavaScript code is designed to handle user authentication in a web application. It's written to work with a backend server that uses JWT (JSON Web Tokens) for authentication.

The script defines a function when the page loads. This function is triggered when the Login button in the HTML form above is pressed. 
 -->
<script type="module">
    // uri variable and options object are obtained from config.js
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

    function login_user(){
        // Set Authenticate endpoint
        const url = uri + '/api/users/authenticate';
        console.log(url);
        // Set body of request to include login data from DOM
        const body = {
            uid: document.getElementById("uid").value,
            password: document.getElementById("password").value,
        };

        // Change options according to Authentication requirements
        const authOptions = {
            ...options, // This will copy all properties from options
            method: 'POST', // Override the method property
            cache: 'no-cache', // Set the cache property
            body: JSON.stringify(body)
        };

        // Fetch JWT
        fetch(url, authOptions)
        .then(response => {
            // handle error response from Web API
            if (!response.ok) {
                const errorMsg = 'Login error: ' + response.status;
                console.log(errorMsg);
                return;
            }
            // Success!!!
            // Redirect to the database page
            window.location.href = "{{site.baseurl}}/data/database";
        })
        // catch fetch errors (ie ACCESS to server blocked)
        .catch(err => {
            console.error(err);
        });
    }

    // Attach login_user to the window object, allowing access to form action
    window.login_user = login_user;
</script>
<script type = "module">
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
    function createUser() {
        // Get user input from the form
        const name = document.getElementById("new_name").value;
        const uid = document.getElementById("new_uid").value;
        const password = document.getElementById("new_password").value;
        const dob = document.getElementById("new_dob").value;

        // Create an object with user data
        const userData = {
            name: name,
            uid: uid,
            password: password,
            dob: dob
        };

        // Make a POST request to the server endpoint for user creation
        fetch('http://127.0.0.1:8086/api/users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the successful response from the server
            console.log('User created successfully:', data);
            // Optionally, you can redirect to another page or update the UI
        })
        .catch(error => {
            // Handle errors, log or display an error message
            console.error('Error creating user:', error.message);
        });
    }
    </script>