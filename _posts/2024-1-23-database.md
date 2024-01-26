---
layout: base
title: Database Get
hide: true
description: An advanced example of database CRUD (Create, Read, Update, Delete).  This articles is focussed on Read.  Each operation works asynchronously between JavaScript and a Python/Flask backend Database.  This requires a set of Python RESTful API services for Get, Put, Delete, and Update.
permalink: /data/database
---

## SQL Database Fetch

<!-- HTML table layout for page.  The table is filled by JavaScript below. 
-->
<table>
  <thead>
  <tr>
    <th>Name</th>
    <th>ID</th>
    <th>Age</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<!-- 
Below JavaScript code fetches user data from an API and displays it in a table. It uses the Fetch API to make a GET request to the '/api/users/' endpoint.   Refer to config.js to see additional options. 

The script is laid out in a sequence (no function) and will execute when page is loaded.
-->
<script type="module">
  // uri variable and options object are obtained from config.js
  import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

  // Set Users endpoint (list of users)
  const url = uri + '/api/users/';

  // prepare HTML result container for new output
  const resultContainer = document.getElementById("result");

  // fetch the API
  const authOptions = {
            ...options, // This will copy all properties from options
            method: 'GET', // Override the method property
            cache: 'no-cache', // Set the cache property
        };
  fetch(url, authOptions)
    // response is a RESTful "promise" on any successful fetch
    .then(response => {
      // check for response errors and display
      if (response.status !== 200) {
          const errorMsg = 'Database response error: ' + response.status;
          console.log(errorMsg);
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.innerHTML = errorMsg;
          tr.appendChild(td);
          resultContainer.appendChild(tr);
          return;
      }
      // valid response will contain JSON data
      response.json().then(data => {
          console.log(data);
          for (const row of data) {
            // tr and td build out for each row
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            const id = document.createElement("td");
            const age = document.createElement("td");
            // data is specific to the API
            name.innerHTML = row.name; 
            id.innerHTML = row.uid; 
            age.innerHTML = row.age; 
            // this builds td's into tr
            tr.appendChild(name);
            tr.appendChild(id);
            tr.appendChild(age);
            // append the row to table
            resultContainer.appendChild(tr);
          }
      })
  })
  // catch fetch errors (ie ACCESS to server blocked)
  .catch(err => {
    console.error(err);
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = err + ": " + url;
    tr.appendChild(td);
    resultContainer.appendChild(tr);
  });

// Edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => openEditForm(row));
    action.appendChild(editButton);

function openEditForm(userData, row) {
    // Create a form for editing
    const editForm = document.createElement("form");

    // Input fields for editing
    const nameInput = createInput("text", "name", userData.name);
    const idInput = createInput("text", "id", userData.uid);
    const ageInput = createInput("text", "age", userData.age);

    // Save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.addEventListener("click", () => saveUserData(userData.uid, row));

    // Append input fields and save button to the form
    editForm.appendChild(nameInput);
    editForm.appendChild(idInput);
    editForm.appendChild(ageInput);
    editForm.appendChild(saveButton);

    // Replace the row content with the edit form
    replaceRowContent(row, editForm);
  }

  function createInput(type, name, value) {
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;
    return input;
  }

  function replaceRowContent(row, content) {
    row.innerHTML = "";
    row.appendChild(content);
  }

  function saveUserData(userId, row) {
    // Fetch the updated data from the form
    const name = document.querySelector(`#result tr td input[name="name"]`).value;
    const id = document.querySelector(`#result tr td input[name="id"]`).value;
    const age = document.querySelector(`#result tr td input[name="age"]`).value;

    // Make a PUT request to update user information
    const putUrl = `${url}${userId}/`;
    const putOptions = {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, uid: id, age }),
    };

    fetch(putUrl, putOptions)
      .then(response => {
        if (response.status !== 200) {
          console.error('Error updating user information:', response.status);
        } else {
          // Reload the table after successful update
          location.reload();
        }
      })
      .catch(error => console.error('Error updating user information:', error));
  }
</script>