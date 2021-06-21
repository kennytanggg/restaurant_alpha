const contentPrimary = document.getElementById('content-primary');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const downBtn = document.getElementById('down-button');
const contentSecondary = document.getElementById('content-secondary');
const navbarPrimary = document.getElementById('navbar-primary');
const orderBtn = navbarPrimary.lastElementChild.lastElementChild.lastElementChild;
const closeBtn = document.querySelector('.close-btn');
const cartOverlay = document.querySelector('.cart-overlay');
const cartContainter = document.querySelector('.cart');

let cart = [];

orderBtn.addEventListener('click', () => {
	cartOverlay.style.visibility = 'visible';
	cartContainter.style.visibility = 'visible';
});

closeBtn.addEventListener('click', () => {
	cartOverlay.style.visibility = 'hidden';
	cartContainter.style.visibility = 'hidden';
});

// KT: I wanted to simulate getting images from somewhere else, not the local machine.
let arr_imgs = [];
const img1 =
	'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img2 =
	'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80';
const img3 =
	'https://images.unsplash.com/photo-1553621042-f6e147245754?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80';
const img4 =
	'https://images.unsplash.com/photo-1562158074-d49fbeffcc91?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
('https://images.unsplash.com/photo-1575872058841-955be84be5e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
const img5 =
	'https://images.unsplash.com/photo-1575872058841-955be84be5e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const img6 =
	'https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80';

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
		image.style.backgroundSize = 'cover';
		image.style.backgroundPosition = 'center';
		image.style.backgroundRepeat = 'no-repeat';
		image.style.display = 'inline-block';
		i++;
		cards.appendChild(image);
	});
	//#endregion
}

// initialization variables
let index = 0;
let prevCard = document.getElementById(`card-${index}`);
let nextCard = document.getElementById(`card-${index}`);
let size;

function cycleCards() {
	setInterval(() => {
		if (index < arr_imgs.length - 1) {
			index = ++index;
			nextCard = document.getElementById(`card-${index}`);
			nextCard.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			});
		} else if (index == arr_imgs.length - 1) {
			index = 0;
			firstCard.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			});
		}
	}, 3500);
}

createCards();
contentPrimary.appendChild(cards);
// cycleCards();

// Event Listeners
prevBtn.addEventListener('click', () => {
	//#region Attempt 1: scrollIntoView
	// if (index == 0) {
	//     index = arr_imgs.length - 1;

	//     // prevCard = document.getElementById(`card-${index}`);
	//     // prevCard.scrollIntoView({
	//     //     behavior: "smooth",
	//     //     block: "end",
	//     //     inline: "nearest"
	//     // });

	// } else if (index != 0) {
	//     if (index <= arr_imgs.length - 1) {
	//         index = --index;
	//         console.log(index);
	//         prevCard = document.getElementById(`card-${index}`);
	//         prevCard.scrollIntoView({
	//             behavior: "smooth",
	//             block: "end",
	//             inline: "nearest"
	//         });
	//     }
	// }
	//#endregion

	//#region Attempt 2: transform/translate
	cards.style.transition = 'transform 0.4s ease-in-out';
	size = document.getElementById(`card-0`).clientWidth;
	if (index == 0) {
		index = arr_imgs.length - 1;
		cards.style.transform = 'translateX(' + -size * (arr_imgs.length - 1) + 'px)';
	} else if (index <= arr_imgs.length - 1) {
		index = --index;
		cards.style.transform = 'translateX(' + -size * index + 'px)';
	}
	//#endregion
});

nextBtn.addEventListener('click', () => {
	//#region Attempt 1: scrollIntoView
	// if (index < arr_imgs.length - 1) {
	//     index = ++index;
	//     nextCard = document.getElementById(`card-${index}`);
	//     nextCard.scrollIntoView({
	//         behavior: "smooth",
	//         block: "end",
	//         inline: "nearest"
	//     });
	// } else if (index == arr_imgs.length - 1) {
	//     index = 0;
	//     firstCard.scrollIntoView({
	//         behavior: "smooth",
	//         block: "end",
	//         inline: "nearest"
	//     });
	// }
	//#endregion

	//#region Attempt 2: transform/translate
	cards.style.transition = 'transform 0.4s ease-in-out';
	size = document.getElementById(`card-0`).clientWidth;
	if (index == arr_imgs.length - 1) {
		index = 0;
		cards.style.transform = 'translateX(0px)';
	} else if (index >= 0) {
		index = ++index;
		cards.style.transform = 'translateX(' + -size * index + 'px)';
	}
	//#endregion
});

downBtn.addEventListener('click', () => {
	contentSecondary.scrollIntoView({
		behavior: 'smooth',
		block: 'end',
		inline: 'nearest',
	});
});

//Make the navigation buttons disappear if the user has scrolled past a certain point
document.addEventListener('scroll', () => {
	if (document.documentElement.scrollTop > window.innerWidth / 2) {
		nextBtn.style.display = 'none';
		prevBtn.style.display = 'none';
	} else {
		nextBtn.style.display = 'inline';
		prevBtn.style.display = 'inline';
	}
});

// Get the Data
class Order {
	async getItems() {
		// You're using the fetch method to access a static file
		try {
			let result = await fetch('order.json');
			let data = await result.json();
			let order = data.items;
			order = order.map((item) => {
				// DESCTRUCTURING
				// const { id, name, description, price, quantity, category } = item;
				const { ...properties } = item;
				// return { id, name, description, price, quantity, category };
				return { ...properties };
			});
			return order;
		} catch (err) {
			console.log(err);
		}
	}
}

// Display / Render it to the user
class UI {
	// add to cart - KT: is this adding to cart?  Or rendering the item on the page?
	displayItems(cart) {
		// KT: Break this up into different categories
		cart.forEach((item) => {
			let { category, name } = item;
			if (category == 'Soups' || category == 'Salads') {
				console.log('you have a soup or salad');
				this.displaySoupOrSalad(item);
			} else if (category == 'Omakase') {
				console.log('you have Omakase');
			} else if (category == 'a la carte') {
				console.log('youve ordered a la carte');
			}
		});
	}

	displaySoupOrSalad(item) {
		// should i use destructuring here?
		const menu_item = `<div class="menu-category ${item.category.toLowerCase()}">
			    <div class="item">
			        <h1 class="name">${item.name}</h1>
			        <p class="description">${item.description}</p>
			        <p class="price">$${item.price}</p>
			    </div>
			</div>`;
	}

	getBagButtons() {}
	showCart(cart) {}
	setCartValues(cart) {}
	populateCart(cart) {}
	setupApp() {}
}

// Allow user to modify the data
class Cart {
	addItem(item) {}
	removeItem(id) {}
	incrementItem(item) {}
	decrementItem(item) {}
}

// Persist the data
class Storage {
	saveCart() {
		localStorage.setItem('cart', cart);
	}
	getCart() {
		cart = localStorage.getItem('cart');
	}
	clearCart() {
		localStorage.removeItem('cart');
	}
}

//
document.addEventListener('DOMContentLoaded', () => {
	const ui = new UI();
	const order = new Order();

	// When do i have access to the elements on the page, now, or later?
	cart = order.getItems().then((data) => {
		console.log(data);
		ui.displayItems(data);
	});

	// Now to RENDER THE DATA
});
// get all products
