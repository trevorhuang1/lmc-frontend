---
comments: True
layout: base
title: Let m Cook
description: cooking
courses: {'compsci': {'week': 4}}
type: hacks
permalink: /bakesuccess
---
<style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            text-align: center;
        }
        @keyframes shake {
            0% { transform: translate(0, 0) rotate(0); }
            10% { transform: translate(-10px, 0) rotate(-5deg); }
            20% { transform: translate(10px, 0) rotate(5deg); }
            30% { transform: translate(-10px, 0) rotate(-5deg); }
            40% { transform: translate(10px, 0) rotate(5deg); }
            50% { transform: translate(-10px, 0) rotate(-5deg); }
            60% { transform: translate(10px, 0) rotate(5deg); }
            70% { transform: translate(-10px, 0) rotate(-5deg); }
            80% { transform: translate(10px, 0) rotate(5deg); }
            90% { transform: translate(-10px, 0) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0); }
        }

        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        .shaking-element {
            animation: shake 3s 1, fadeOut 3s forwards 3s;
        }

        .hidden {
            display: none;
        }

        .fadeIn {
            animation: fadeIn 3s forwards 6s;
        }
    </style>

<h1 id = "header"></h1>
<img src="{{site.baseurl}}/images/oven.png" class="shaking-element" alt="Shaking Oven">
<img id = "image" src = "" class="hidden fadeIn">
    <script>
        var header = document.getElementById("header");
        header.textContent = "Congrats! You made a " + localStorage.getItem("bakedgood") + "!";
        var name = "{{site.baseurl}}/images/" + localStorage.getItem("bakedgood") + ".png";
        console.log(name);
        var image = document.getElementById("image");
        image.setAttribute("src", name);
        console.log(image);
        // After 6 seconds, remove the hidden class from the Danish image to make it visible
        setTimeout(function() {
            document.querySelector('.hidden').classList.remove('hidden');
        }, 6000);
        setTimeout(function() {
            window.location.href = "{{site.baseurl}}/cook";
        }, 9000);
    </script>

