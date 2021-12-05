const location_card = document.getElementById('location-card');

const url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=';
const userKey = 'd477e4b5e5c20788dada4c06d202a840';
const res_id = '17788817';

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
		// console.log(data);
		location_card.innerHTML = data.location.address;
	});
