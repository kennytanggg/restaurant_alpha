const contentPrimary = document.getElementById('content-primary');
const prevBtn = document.getElementById('prev-button');
const nextBtn = document.getElementById('next-button');
const downBtn = document.getElementById('down-button');
const contentSecondary = document.getElementById('content-secondary');
const navbarPrimary = document.getElementById('navbar-primary');
const orderBtn = navbarPrimary.lastElementChild.lastElementChild.lastElementChild;
const closeBtn = document.querySelector('.close-btn');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const cartOverlay = document.querySelector('.cart-overlay');
const cartContainer = document.querySelector('.cart');
const cartContent = document.querySelector('.cart-content');

let cart = [];

const arr_native_words = ['sashimi', 'miso', 'nameko', 'wakame', 'jako', 'negitoro', 'sushi', 'ikura', 'ugo, tokasa'];
let arr_subheaders = [];
let buttonsDOM = [];

// Get the Data
class Order {
	async getItems() {
		// You're using the fetch method to access a static file
		try {
			let result = await fetch('items.json');
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

				contentPrimary.append(menu_category_header);
				contentPrimary.append(menu_category);
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

					contentPrimary.append(menu_category_header, sub_header, menu_category);
				}
			}
		});

		// KT: Break this up into different categories
		cart.forEach((item) => {
			let { id, category, name, subheader } = item;
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

		const addToCartBtn = document.createElement('button');
		addToCartBtn.dataset.id = `${item.id}`; // Is this different from data-id?
		addToCartBtn.classList.add('buy-Btn');
		addToCartBtn.innerText = 'Add to Cart';

		newMenuItem.append(newMenuItemName, newMenuItemDesc, newMenuItemPrice, addToCartBtn);
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

		const addToCartBtn = document.createElement('button');
		addToCartBtn.dataset.id = `${item.id}`; // Is this different from data-id?
		addToCartBtn.classList.add('buy-Btn');
		addToCartBtn.innerText = 'Add to Cart';

		handRollHeaderCtnr.append(handRollHeader, handRollPrice, addToCartBtn);

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

		const addToCartBtn = document.createElement('button');
		addToCartBtn.dataset.id = `${item.id}`; // Is this different from data-id?
		addToCartBtn.classList.add('buy-Btn');
		addToCartBtn.innerText = 'Add to Cart';

		newMenuItem.append(newMenuItemName, newMenuItemDesc, newMenuItemPrice, addToCartBtn);

		// Look thru subheaders, find the sibling div, and append the Item
		const subheaders = [...document.querySelectorAll('.subheader')];
		subheaders.forEach((subheader) => {
			if (item.subheader == subheader.innerText) {
				subheader.nextSibling.append(newMenuItem);
			}
		});
	}

	// This function is a way to get information about the item from the directory/dataset and extract it to put into the cart
	// The button can have a dataset attribute, which can have an ID attached upon its creation
	// You can use this ID to query the dataset for its info
	// Add the item to the cart content
	createAddToCartBtns() {
		const items = [...document.querySelectorAll('.item')];
		items.forEach((item) => {
			const addToCartBtn = item.lastChild;
			item.addEventListener('mouseenter', () => {
				addToCartBtn.classList.add('active');
			});
			item.addEventListener('mouseleave', () => {
				addToCartBtn.classList.remove('active');
			});
			addToCartBtn.addEventListener('click', () => {
				this.addItemToCart(addToCartBtn.dataset.id);
			});
		});
	}

	addOrderFunctionality() {
		orderBtn.addEventListener('click', () => {
			cartOverlay.style.visibility = 'visible';
			cartContainer.style.visibility = 'visible';
		});

		closeBtn.addEventListener('click', () => {
			cartOverlay.style.visibility = 'hidden';
			cartContainer.style.visibility = 'hidden';
		});

		clearCartBtn.addEventListener('click', () => {
			Storage.clearCart();
			this.updateCartValues(cart); // This is what's causing me to use a static method
		});
	}

	addItemToCart(id) {
		// console.log(id);
		let inCart = cart.find((menu_item) => {
			return menu_item.id == id;
		});
		// console.log(inCart);

		let isInStartup = inCart && cartContent.childElementCount == 0;
		if (!inCart) {
			// REFERENCE
			// GET PRODUCT FROM PRODUCTS
			// ADD PRODUCT TO CART
			// SAVE CART IN LOCALSTORAGE
			// SET CART VALUES
			// DISPLAY CART ITEM
			console.log(inCart, 'not in the cart');
			let cartItem = Storage.getItem(id);
			console.log(cartItem);

			// Add Attribute for quantity
			cartItem['quantity'] = Number('1');
			cart.push(cartItem);

			// Create wrapper class
			let itemContainer = document.createElement('article');
			itemContainer.classList.add('item-container');
			itemContainer.id = cartItem.id;

			let itemQtyContainer = document.createElement('div');
			itemQtyContainer.classList.add('item-quantity');
			let incBtn = document.createElement('button');
			incBtn.classList.add('increment-item-btn');

			let incIcon = document.createElement('i');
			incIcon.classList = 'fas fa-chevron-up';
			incBtn.append(incIcon);
			let itemQty = document.createElement('p');
			itemQty.classList.add('quantity');
			itemQty.innerText = cartItem.quantity;
			itemQty.dataset.id = cartItem.id;

			incBtn.addEventListener('click', () => {
				cartItem['quantity']++;
				itemQty.innerText = cartItem['quantity'];
				this.updateCartValues(cart);
				Storage.saveCart(cart);
			});

			let decBtn = document.createElement('button');
			decBtn.classList.add('decrement-item-btn');
			let decIcon = document.createElement('i');
			decIcon.classList = 'fas fa-chevron-down';
			decBtn.append(decIcon);

			decBtn.addEventListener('click', () => {
				cartItem['quantity']--;
				itemQty.innerText = cartItem['quantity'];
				this.updateCartValues(cart);
				Storage.saveCart(cart);
			});

			itemQtyContainer.append(incBtn, itemQty, decBtn);

			let descContainer = document.createElement('div');
			descContainer.classList.add('item-description');
			let itemName = document.createElement('p');
			itemName.classList.add('item-name');
			itemName.innerText = cartItem.name;
			let removeBtn = document.createElement('button');
			removeBtn.classList.add('remove-item-btn');
			removeBtn.innerText = 'Remove From Cart';
			removeBtn.addEventListener('click', () => {
				let localCartItemIndex = cart.indexOf(cartItem);
				if (localCartItemIndex > -1) {
					cart.splice(localCartItemIndex, 1);
					Storage.saveCart(cart);
				}

				itemContainer.remove();
				this.updateCartValues(cart);
			});
			descContainer.append(itemName, removeBtn);

			let priceContainer = document.createElement('div');
			priceContainer.classList.add('item-price');
			let price = document.createElement('p');
			price.classList.add('price');
			price.innerText = `$${cartItem.price.toFixed(2)}`;
			priceContainer.append(price);

			itemContainer.append(itemQtyContainer, descContainer, priceContainer);
			cartContent.append(itemContainer);
			// save cart in local storage
			// console.log(cart);
		} else if (inCart) {
			console.log(inCart, 'already in the cart');
			// If the item is already in the cart...
			// Update Cart Quantity
			inCart.quantity++;
			// // Update UI Quantity
			let uiEls = [...document.querySelectorAll('.quantity')];
			console.log(uiEls);
			let inCart_ui = uiEls.find((uiEl) => uiEl.getAttribute('data-id') == inCart.id);
			console.log(inCart_ui);
			inCart_ui.innerText = inCart.quantity;
		}
		Storage.saveCart(cart);

		// set cart values
		this.updateCartValues(cart);
	}

	showCart() {
		cartOverlay.style.visibility = 'visible';
		cartContainer.style.visibility = 'visible';
	}
	hideCart() {
		cartOverlay.style.visibility = 'hidden';
		cartContainer.style.visibility = 'hidden';
	}
	updateCartValues(cart) {
		//KT: should this be a static method?
		// iterate through each item, multiply the qty and price, add to the total
		let priceContainer = document.querySelector('.total-amount');
		let totalPrice = 0;
		let totalQtyItems = 0;
		if (priceContainer) {
			cart.forEach((item) => {
				totalPrice += item.price * item.quantity;
				totalQtyItems += item.quantity;
				priceContainer.innerText = `$${totalPrice.toFixed(2)}`;

				if (item.quantity == 0) {
					console.log('no moreof this elemen');
					// Remove item from Cart (data)
					let index = cart.indexOf(item);
					cart.splice(index, 1);

					// Remove item from the Cart Visually
					let itemElement = document.getElementById(item.id).remove();

					//#region
					// Option 2 (without inserting id)
					// let elementArr = document.querySelectorAll(`[data-id='${item.id}']`);
					// let elementArr = document.querySelectorAll('.quantity');
					// elementArr.forEach((arrItem) => {
					// 	if (arrItem.id == item.id) {
					// 		console.log(arrItem.parentElement);
					// 		// console.log(arrItem.parentElement.parentElement);
					// 		// arrItem.parentElement.parentElement.remove();
					// 	}
					// });
					//#endregion
				}
			});
		}

		let orderDiv = document.querySelector('.total-items-qty');
		if (cart.length > 0) {
			// orderDiv.style.display = 'auto';
			orderDiv.style.visibility = 'visible';
			orderDiv.innerText = totalQtyItems;
		} else if (cart.length == 0) {
			orderDiv.style.visibility = 'hidden';
			priceContainer.innerText = `$${totalPrice.toFixed(2)}`;
		}

		Storage.saveCart(cart);
	}

	populateCart(cart) {
		cart.forEach((item) => {
			this.addItemToCart(item.id);
		});
	}

	setupApp() {
		cart = Storage.getCart();
		this.updateCartValues(cart);
		this.populateCart(cart);
		this.addOrderFunctionality();
	}
}

// KT: Is this class needed?
// Allow user to modify the data, who is responsible for getting the cart?
// class Cart {
// 	addItem(item) {}
// 	removeItem(id) {}
// 	incrementItem(item) {}
// 	decrementItem(item) {}
// }

// Persist the data
class Storage {
	static getItem(id) {
		console.log(id);
		let items = JSON.parse(localStorage.getItem('items'));
		return items.find((item) => item.id == id); // why not triple === vs double ==?  double references values, while triple references types and values
	}
	static getCart() {
		return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	}
	static saveItems(items) {
		localStorage.setItem('items', JSON.stringify(items));
	}
	static saveCart(cart) {
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	static clearCart() {
		localStorage.removeItem('cart');
		cartContent.textContent = '';
		cart = [];
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const ui = new UI();
	const order = new Order();

	// Setup App
	ui.setupApp();

	// Get all items
	order
		.getItems()
		.then((data) => {
			ui.displayItems(data);
			Storage.saveItems(data);
		})
		.then(() => {
			// wow this line was cool
			ui.createAddToCartBtns();
		});
});
