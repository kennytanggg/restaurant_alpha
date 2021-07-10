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
const arr_native_words = ['sashimi', 'miso', 'nameko', 'wakame', 'jako', 'negitoro', 'sushi', 'ikura', 'ugo, tokasa'];
let arr_subheaders = [];

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
		let menu_categories = [];
		// iterate through each category, create a header and a wrapper div
		cart.forEach(({ category, subheader }) => {
			if (!menu_categories.includes(category) && category != 'à la carte') {
				menu_categories.push(category);

				const menu_category_header = document.createElement('p');
				menu_category_header.className = 'header';
				menu_category_header.innerText = category;

				const menu_category = document.createElement('div');
				menu_category.className = `menu-category ${category.toLowerCase()}`;
				if (category == 'Hand Rolls') {
					const hand_rolls_container = document.createElement('div');
					hand_rolls_container.classList.add('hand-rolls-container');
					menu_category.append(hand_rolls_container);
				}

				contentPrimary.append(menu_category_header, menu_category);
			}
			if (category == 'à la carte') {
				if (subheader && !arr_subheaders.includes(subheader)) {
					arr_subheaders.push(subheader);

					const menu_category_header = document.createElement('p');
					menu_category_header.className = 'header';
					menu_category_header.innerText = category;

					const sub_header = document.createElement('p');
					sub_header.classList.add('subheader');
					sub_header.innerText = subheader;

					const menu_category = document.createElement('div');
					menu_category.className = `menu-category ${category.toLowerCase()}`;
					sub_header.append(menu_category);

					menu_category_header.append(sub_header);
					contentPrimary.append(menu_category_header);
				}
			}
		});

		// KT: Break this up into different categories
		cart.forEach((item) => {
			let { category, name, subheader } = item;
			if (category == 'Soups' || category == 'Salads' || category == 'Omakase') {
				this.displaySoupOrSaladOrOmakase(item);
			} else if (category == 'Hand Rolls') {
				this.displayHandRolls(item);
			} else if (category == 'à la carte') {
				this.displayALaCarte(item);
			}
		});
	}

	displaySoupOrSaladOrOmakase(item) {
		// should i use destructuring here?

		// Why add the menu items 'dynamically' through JS?  Why is this intermediate step necessary before creating the cart?
		// All the additional styling (spans, emphasizing elements which are not english and native elements, is kind of tedious, but necessary)
		// The 'dynamic styles' are added within the HTML file is done using JS - seems too complicated for a menu?  Or am i just being lazy right now?
		const menu_category = document.getElementsByClassName(`menu-category ${item.category.toLowerCase()}`)[0];

		let newMenuItem = document.createElement('div');
		newMenuItem.classList.add('item');

		let newMenuItemName = document.createElement('h1');
		newMenuItemName.classList.add('name');
		newMenuItemName.innerText = `${item.name}`;

		let newMenuItemDesc = document.createElement('p');
		newMenuItemDesc.classList.add('description');

		// newMenuItemDesc.innerHTML = new_arr.join(' '); // KT: is there a way to do this without using innerHTML?  I've heard this isn't the most secure method
		// I should probably iterate through the description, and append the elements as i go through
		let arr_description = item.description.split(' ');

		arr_description.forEach((word) => {
			if (arr_native_words.includes(word)) {
				let span = document.createElement('span');
				span.classList.add('native-name');
				span.innerText = word;
				newMenuItemDesc.append(span, ' '); //KT: Is there a better way of doing this?
			} else {
				let new_word = document.createTextNode(word);
				newMenuItemDesc.append(new_word, ' '); //KT: Is there a better way of doing this?
			}
		});

		let newMenuItemPrice = document.createElement('p');
		newMenuItemPrice.classList.add('price');
		newMenuItemPrice.innerText = `$${item.price.toFixed(2)}`;

		newMenuItem.append(newMenuItemName, newMenuItemDesc, newMenuItemPrice);
		menu_category.append(newMenuItem);
	}

	displayHandRolls(item) {
		const menu_category = document.getElementsByClassName(`menu-category ${item.category.toLowerCase()}`)[0];

		let handRollSetContainer = document.createElement('div');
		handRollSetContainer.classList.add('hand-roll-set');

		let handRollHeaderCtnr = document.createElement('div');
		handRollHeaderCtnr.classList.add('hand-roll-header');

		let handRollHeader = document.createElement('h1');
		handRollHeader.innerText = `${item.name}`;
		let handRollPrice = document.createElement('p');
		handRollPrice.classList.add('price');
		handRollPrice.innerText = `$${item.price.toFixed(2)}`;
		handRollHeaderCtnr.append(handRollHeader, handRollPrice);

		handRollSetContainer.append(handRollHeaderCtnr);

		const arr_handRollItems = item.description.split(' ');
		arr_handRollItems.forEach((word) => {
			const p = document.createElement('p');
			p.classList.add('roll-item');
			p.innerText = word;
			handRollSetContainer.append(p);
		});

		const handRollsContainer = document.querySelector('.hand-rolls-container');
		handRollsContainer.append(handRollSetContainer);
	}

	displayALaCarte(item) {
		let newMenuItem = document.createElement('div');
		newMenuItem.classList.add('item');

		let newMenuItemName = document.createElement('h1');
		newMenuItemName.classList.add('name');
		newMenuItemName.innerText = `${item.name}`;

		let newMenuItemDesc = document.createElement('p');
		newMenuItemDesc.classList.add('description');

		let arr_description = item.description.split(' ');

		arr_description.forEach((word) => {
			if (arr_native_words.includes(word)) {
				let span = document.createElement('span');
				span.classList.add('native-name');
				span.innerText = word;
				newMenuItemDesc.append(span, ' '); //KT: Is there a better way of doing this?
			} else {
				let new_word = document.createTextNode(word);
				newMenuItemDesc.append(new_word, ' '); //KT: Is there a better way of doing this?
			}
		});

		let newMenuItemPrice = document.createElement('p');
		newMenuItemPrice.classList.add('price');
		newMenuItemPrice.innerText = `$${item.price.toFixed(2)}`;

		newMenuItem.append(newMenuItemName, newMenuItemDesc, newMenuItemPrice);
		const alacartenodes = [...document.querySelectorAll('.carte')];

		console.log(alacartenodes);
		// Cross reference 2 lists
		arr_subheaders.forEach((subheader) => {
			alacartenodes.forEach((node) => {
				if (node.contains(subheader)) {
					console.log('eureka');
				}
			});
		});
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

document.addEventListener('DOMContentLoaded', () => {
	const ui = new UI();
	const order = new Order();

	// When do i have access to the elements on the page, now, or later?
	cart = order.getItems().then((data) => {
		// console.log(data);
		ui.displayItems(data);
	});

	// Now to RENDER THE DATA
});
// get all products
