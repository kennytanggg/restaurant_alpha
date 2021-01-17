const location_card = document.getElementById('location-card');

const url = 'https://developers.zomato.com/api/v2.1/reviews?res_id=16781875&start=1&count=5';
const userKey = 'd477e4b5e5c20788dada4c06d202a840';
const res_id = '17788817';

const restaurant = fetch(url, {
    headers: {
        Accept: "application/json",
        "User-Key": "d477e4b5e5c20788dada4c06d202a840"
    }
    // }).then(response => console.log(response.json())
}).then(response => {
    return response.json();
}).then(data => {
    let reviews = data.user_reviews;
    reviews.forEach((review, index) => {
        const review_card = createReview(review.review, index);
        document.querySelector('.cards').appendChild(review_card);
    });
});


function createReview(review, index) {
    console.log(review);
    const review_card = document.createElement('div');
    review_card.className = `card ${index}`;
    review_card.innerHTML = `
        <p><u>Author</u>: ${review.user.name}</p>
        <p><u>Rating</u>: ${review.rating}</p>
        <p><u>Review</u>: ${review.rating_text}</p>
        <p><u>Likes</u>: ${review.likes}</p>
        <p>${review.review_time_friendly}</p>
    `;
    return review_card;
}