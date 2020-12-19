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
cards.id = 'cards';
cards.className = 'cards';

function createCards() {
    var i = 0;
    arr_imgs.forEach((img) => {
        var div = document.createElement('div');
        div.className = "card";
        div.id = `card-${i}`;
        div.style.background = `url(${img})`;
        div.style.backgroundSize = "cover";
        div.style.backgroundPosition = "center";
        div.style.backgroundRepeat = "no-repeat";
        i++;
        cards.appendChild(div)

        // <img src="${img}" alt="sushi image ${i}">
    })
};

// Global card index
let i = 0;
function cycleCards() {
    setInterval(() => {
        if (i < arr_imgs.length - 1) {
            var next_card_index = ++i;
            var next_card = document.getElementById(`card-${next_card_index}`);
            next_card.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        } else if (i == arr_imgs.length - 1) {
            i = 0;
            var first_card = document.getElementById('card-0');
            first_card.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    }, 3500)
}


createCards();
content_primary.appendChild(cards);
// cycleCards();