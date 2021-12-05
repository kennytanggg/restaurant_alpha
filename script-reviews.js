const url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=';
// const url = 'https://developers.zomato.com/api/v2.1/reviews?res_id=16781875&start=1&count=5';
const userKey = 'd477e4b5e5c20788dada4c06d202a840';
const res_id = '17788817'; //Ani Ramen - 17788817, Ippudo - 16781875
const navbarPrimary = document.getElementById('navbar-primary');
const closeBtn = document.querySelector('.close-btn');
const orderBtn = navbarPrimary.lastElementChild.lastElementChild.lastElementChild;

const restaurant = fetch(`${url}${res_id}`, {
	headers: {
		Accept: 'application/json',
		'User-Key': 'd477e4b5e5c20788dada4c06d202a840',
	},
	// }).then(response => console.log(response.json())
})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data.user_rating);
		try {
			if (data) {
				let rating = data.user_rating;
				createRating(rating, data);

				// let reviews = data.all_reviews.reviews;
				// reviews.forEach((review, index) => {
				// 	const review_card = createReview(review.review, index);
				// 	document.querySelector('.cards').appendChild(review_card);
				// });
			}
		} catch (error) {
			console.log(error);
			console.log('something went wrong with accessing data from the server/Zomato API');
		}
	});

function createRating(rating, data) {
	const rating_card = document.createElement('div');
	rating_card.className = 'rating';
	rating_card.innerHTML = `
        <h1>${data.name}</h1>
        <p><u>Rating</u>: ${rating.aggregate_rating}</p>
        <p><u>Review</u>: ${rating.rating_text}</p>
        <p><u>votes</u>: ${rating.votes}</p>
    `;
	document.querySelector('.cards').appendChild(rating_card);
}

// function createReview(review, index) {
// 	const review_card = document.createElement('div');
// 	review_card.className = `card ${index}`;
// 	review_card.innerHTML = `
//         <p><u>Author</u>: ${review.user.name}</p>
//         <p><u>Rating</u>: ${review.rating}</p>
//         <p><u>Review</u>: ${review.rating_text}</p>
//         <p><u>Likes</u>: ${review.likes}</p>
//         <p>${review.review_time_friendly}</p>
//     `;
// 	return review_card;
// }

orderBtn.addEventListener('click', () => {
	console.log(cartOverlay.getBoundingClientRect().left);
	cartOverlay.style.transform = 'translateX(calc(-1540px)';
	cartContainer.style.transform = 'translateX(00px)';
	console.log(cartOverlay.getBoundingClientRect().left);
	cartOverlay.style.zIndex = '15';
	cartContainer.style.zIndex = '15';
	console.log(cartOverlay.style.zIndex);
	console.log(cartContainer.style.zIndex);
	// cartOverlay.style.visibility = 'visible';
	// cartContainer.style.visibility = 'visible';
});

closeBtn.addEventListener('click', () => {
	cartOverlay.style.transform = 'translateX(-3600px)';
	cartContainer.style.transform = 'translateX(400px)';
	cartOverlay.style.zIndex = '-1';
	cartContainer.style.zIndex = '-1';
	// cartOverlay.style.visibility = 'hidden';
	// cartContainer.style.visibility = 'hidden';
});
