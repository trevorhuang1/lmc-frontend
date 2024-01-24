---
comments: True
layout: base
title: LMC Login page
description: cooking
courses: {'compsci': {'week': 4}}
type: hacks
---
<!-- 
A simple HTML login form with a Login action when button is pressed.  

The form triggers the login_user function defined in the JavaScript below when the Login button is pressed.
-->
<form action="javascript:login_user()">
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
</form>
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