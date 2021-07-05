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
		cart.forEach(({ category }) => {
			if (!menu_categories.includes(category)) {
				menu_categories.push(category);
				const menu_category_header = document.createElement('p');
				menu_category_header.className = 'header';
				menu_category_header.innerText = category;
				contentPrimary.appendChild(menu_category_header);
				const menu_category = document.createElement('div');
				menu_category.className = `menu-category ${category.toLowerCase()}`;
				contentPrimary.appendChild(menu_category);
			}
		});

		// KT: Break this up into different categories
		cart.forEach((item) => {
			let { category, name } = item;
			if (category == 'Soups' || category == 'Salads') {
				this.displaySoupOrSalad(item);
			}
			// else if (category == 'Omakase') {
			// 	console.log('you have Omakase');
			// } else if (category == 'a la carte') {
			// 	console.log('youve ordered a la carte');
			// }
		});
	}

	displaySoupOrSalad(item) {
		// should i use destructuring here?
		// console.log(item);

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
		// newMenuItemDesc.innerText = `${item.description}`;
		// ToDo: add all styling for native words
		// Option 1: Iterate through each word, and if any of the words is one of the words in the array, wrap the word in a span tag
		const arr_native_words = [
			'sashimi',
			'miso',
			'nameko',
			'wakame',
			'jako',
			'negitoro',
			'sushi',
			'ikura',
			'ugo, tokasa',
		];
		// console.log(new_arr.join(' '));
		// newMenuItemDesc.innerHTML = new_arr.join(' '); // KT: is there a way to do this without using innerHTML?  I've heard this isn't the most secure method

		// I should probably iterate through the description, and append the elements as i go through
		let arr_description = item.description.split(' ');

		arr_description.forEach((word) => {
			if (arr_native_words.includes(word)) {
				let span = document.createElement('span');
				span.classList.add('native-name');
				span.innerText = word;
				newMenuItemDesc.append(span, ' '); //KT: Is there a better way of doing this?
				console.log(newMenuItemDesc);
			} else {
				let new_word = document.createTextNode(word);
				newMenuItemDesc.append(new_word, ' '); //KT: Is there a better way of doing this?
			}
		});

		let newMenuItemPrice = document.createElement('p');
		newMenuItemPrice.classList.add('price');
		newMenuItemPrice.innerText = `$${item.price}`;

		newMenuItem.append(newMenuItemName, newMenuItemDesc, newMenuItemPrice);
		menu_category.append(newMenuItem);
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
