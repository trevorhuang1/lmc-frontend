---
comments: True
layout: base
title: LMC Login page
description: cooking
courses: {'compsci': {'week': 4}}
type: hacks
permalink: /lmc-CreateUser
---
<style>

</style>
<form onsubmit="submitForm(event)">
	<label for="username">GitHub Username:</label>
	<input type="text" id="username" name="username" required /><br /><br />
	<label for="fullName">Full Name:</label>
	<input type="text" id="fullName" name="fullName" required /><br /><br />
	<label for="password">Password:</label>
	<input type="password" id="password" name="password" required /><br /><br />
    <label for="dob">DOB:</label>
	<input type="dob" id="dob" name="dob" required /><br /><br />
	<input type="submit" value="Submit" />
</form>

<script type = "module">
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';
	let users = [];
    const url = uri + '/api/users/authenticate';
	function submitForm(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const name = formData.get("fullName");
		const uid = formData.get("username");
		const password = formData.get("password");
        const dob = formData.get("dob");

		const payload = {
			name,
			uid,
			password,
            dob
		};

		const authOptions = {
            ...options, // This will copy all properties from options
            method: 'POST', // Override the method property
            cache: 'no-cache', // Set the cache property
            body: JSON.stringify(body)
        };
        fetch(uri, authOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					alert("server error");
					throw new Error("server");
				}
			})
			// .then((data) => {
			// 	const table = document.getElementById("userTable");
			// 	const row = table.insertRow();
			// 	row.setAttribute("data-id", data.id);
			// 	[
			// 		data.name,
			// 		data.uid
			// 	].forEach((value) => {
			// 		const cell = row.insertCell();
			// 		cell.innerText = value;
			// 	});

			// 	const editCell = row.insertCell();
			// 	const editButton = document.createElement("button");
			// 	editButton.innerHTML = "Edit";
			// 	editButton.addEventListener("click", editUser);
			// 	editCell.appendChild(editButton);

			// 	const deleteCell = row.insertCell();
			// 	const deleteButton = document.createElement("button");
			// 	deleteButton.innerText = "Delete";
			// 	deleteButton.addEventListener("click", () => deleteUser(user.id, row));
			// 	deleteCell.appendChild(deleteButton);

			// 	users.push(data);
			// 	alert("Created sucessfully!");
			// })
			.catch((error) => console.error("Error:", error));
	}

	function editUser(event) {
		const id = event.currentTarget.parentElement.parentElement.getAttribute("data-id");
		document.getElementById("editId").value = id;

		const form = document.getElementById("editForm");
		const user = users.find((u) => u.id == id);

		form.querySelector("#editusername").value = user.uid;
		form.querySelector("#editFullName").value = user.name;

		document.getElementById("editModalBackdrop").style.display = "block";
	}

	// Fetch users and ensure close modal interaction
	// document.addEventListener("DOMContentLoaded", function () {
	// 	document.getElementById("closeModal").addEventListener("click", function () {
	// 		document.getElementById("editModalBackdrop").style.display = "none";
	// 	});
	// });

	function submitEdit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const id = formData.get("editId");
		const name = formData.get("editFullName");
		const uid = formData.get("editusername");
        const dob = formData.get("editdob");

		const payload = {
			id,
			name,
			uid,
            dob
		};

		fetch(`${apiUrl}${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}).then((response) => {
			if (response.ok) {
				// Update the corresponding row in the table
				const row = document.querySelector(`tr[data-id='${id}']`);
				row.cells[0].innerText = name;
				row.cells[1].innerText = uid;
				row.cells[2].innerText = dob;


				// Show an alert indicating success
				alert("User information updated successfully.");
			}
		});

		document.getElementById("editModalBackdrop").style.display = "none";
	}

	function deleteUser(id, row) {
		const confirmation = prompt('Type "DELETE" to confirm.');
		if (confirmation === "DELETE") {
			fetch(`${apiUrl}${id}`, {
				method: "DELETE",
			})
				.then(() => {
					row.remove();
					alert("User deleted successfully");
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}
</script>

<style>
	.modal-backdrop {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 1;
	}

	.modal-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #272726;
		padding: 40px;
		z-index: 2;
	}

	.close-modal {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		background: none;
		border: none;
		font-size: 24px;
		color: white;
	}

	.wrapper,
	section {
		max-width: 900px;
	}
</style>