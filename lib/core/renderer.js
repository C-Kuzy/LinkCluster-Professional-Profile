/*
 Core Rendering Module
 Handles link generation and DOM manipulation with jet-away transitions
*/

import { links } from "../data/links.js";
import { transitionToExternalLink } from "../effects/transitions.js";

const linkContainer = document.getElementById("links");

function addLink(name, link, image) 
{
    return `
  <a href="${link}" class="link" data-href="${link}" target="blank">
    <img src="${image}" alt="Professional Icon"/>
    <span><strong> ${name} </strong></span>
  </a>
  `;
}

let allLinks = "";

links.forEach((ele) => {
    let link = ele.link;
    let name = ele.name;
    let image = ele.image;
    allLinks += addLink(name, link, image);
});

linkContainer.innerHTML = allLinks;

// Add click handlers for jet-away transitions
document.addEventListener('DOMContentLoaded', () => {
    const linkElements = document.querySelectorAll('.link');
    
    linkElements.forEach(linkEl => {
        linkEl.addEventListener('click', (e) => {
            e.preventDefault();
            const url = linkEl.getAttribute('data-href');
            transitionToExternalLink(url, e);
        });
    });
});