const contentPrimary = document.getElementById('content-primary');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');

// Create array of image paths
// Route the image path to the current image
// Add event handlers to change the index manually

// KT: I wanted to simulate getting images from somewhere else, not the local machine.
let arr_imgs = [];
const img1 = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img2 = 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=882&q=80';
const img3 = 'https://images.unsplash.com/photo-1562158147-1b1bf404cba1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80';
const img4 = 'https://images.unsplash.com/photo-1599569958048-2051d3f9a3e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';
const img5 = 'https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80';
const img6 = 'https://images.unsplash.com/photo-1534971525317-ed179568e7f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';

arr_imgs.push(img1, img2, img3, img4, img5, img6);

// get all images and put them in primary content
let cards = document.createElement('div');
cards.id = 'cards';
cards.className = 'cards';

function createCards() {
    var i = 0;
    //#region 
    // Method: 1 - Simulating getting images from internet? (not from local machine)
    // arr_imgs.forEach((img) => {
    //     var div = document.createElement('div');
    //     div.className = "card";
    //     div.id = `card-${i}`;
    //     div.style.background = `url(${img})`;
    //     div.style.backgroundSize = "cover";
    //     div.style.backgroundPosition = "center";
    //     div.style.backgroundRepeat = "no-repeat";
    //     i++;
    //     cards.appendChild(div)
    // });
    //#endregion

    //#region 
    // Method 2: Using i tags.
    arr_imgs.forEach((img) => {
        var image = document.createElement('img');
        image.className = 'card';
        image.id = `card-${i}`;
        image.src = `${img}`;
        image.style.backgroundSize = "cover";
        image.style.backgroundPosition = "center";
        image.style.backgroundRepeat = "no-repeat";
        image.style.display = "inline-block";
        i++;
        cards.appendChild(image);
    });
    //#endregion
};

// Global card index -- Should these be var if they're intended to be global?
let index = 0;
const firstCard = document.getElementById('card-0');
function cycleCards() {
    setInterval(() => {
        if (index < arr_imgs.length - 1) {
            let nextCardIndex = ++index;
            let nextCard = document.getElementById(`card-${nextCardIndex}`);
            nextCard.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        } else if (index == arr_imgs.length - 1) {
            index = 0;
            firstCard.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    }, 3500)
}


createCards();
contentPrimary.appendChild(cards);
// cycleCards();


// Event Listeners
prevBtn.addEventListener('click', () => {
    if (index == 0) {
        let prevCardIndex = arr_imgs.length - 1;
        let prevCard = document.getElementById(`card-${prevCardIndex}`);
        prevCard.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });
    } else if (index != 0) {
        if (index < arr_imgs.length - 1) { //DO WE NEED THIS?
            prevCardIndex = arr_imgs.length - 1;
            prevCard = document.getElementById(`card-${prevCardIndex}`);
            prevCard.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }
    }
});

nextBtn.addEventListener('click', () => {
    if (index < arr_imgs.length - 1) {
        let nextCardIndex = ++index;
        let nextCard = document.getElementById(`card-${nextCardIndex}`);
        nextCard.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });
    } else if (index == arr_imgs.length - 1) {
        index = 0;
        firstCard.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });
    }
});