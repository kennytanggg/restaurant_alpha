console.log('hello hello word');
const content_primary = document.getElementById('content-primary');


// Create array of image paths
// Route the image path to the current image
// Add event handlers to change the index manually
let index = 0;

let arr_imgs = [];
const img1 = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img2 = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=882&q=80';
const img3 = 'https://images.unsplash.com/photo-1562158147-1b1bf404cba1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80';
const img4 = 'https://images.unsplash.com/photo-1599569958048-2051d3f9a3e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';
const img5 = 'https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80';
const img6 = 'https://images.unsplash.com/photo-1534971525317-ed179568e7f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';

arr_imgs.push(img1, img2, img3, img4, img5, img6);

// get all images and put them in primary content
var cards = document.createElement('div');
cards.setAttribute('id', 'cards');
cards.setAttribute('class', 'cards');

var i = 0;
arr_imgs.forEach((img) => {
    var slide = document.createElement('div');
    slide.innerHTML = `
        <div class="card" id="card${i}">
            <img src="${img}" alt="sushi image ${i}">
        </div>
    `;
    i++;
    cards.appendChild(slide)
})

// console.log(cards);
// console.log(cards.innerHTML);

// content_primary.innerHTML = cards;
content_primary.appendChild(cards);