// get data from API
// populate HTML elements in the menu

// View more - get more items?
const somePosts = fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        let output = ''
        data.forEach((post) => {
            output += `
        <div>
            <h3>Post ID: ${post.id}</h3>
            <p>Post: ${post.title}</p>
        </div>
        `
        })
        document.body.innerHTML = output;
    });

console.log(somePosts);
console.log(typeof (somePosts));

// const userKey = 'd477e4b5e5c20788dada4c06d202a840';
// const cityId = 1;
// const lot = lat = 0;
// const someFood = fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityId}`)
//     .then(response => response.json()
//         .then(data => console.log(response.data)));

// console.log(someFood);

// d477e4b5e5c20788dada4c06d202a840

const Zomato = require('zomato.js');
const z = new Zomato(userKey);

z.cuisines()
    .then()
    .catch()

console.log(z);
