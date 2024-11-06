/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    const h2Element = document.getElementById('games');
    
    for (let i = 0; i < games.length; i++) {
        let g = document.createElement('div');
        g.classList.add('game-card');

        let game = games[i];
        
        // Use template literals correctly with backticks and ${}
        g.innerHTML = `<h1>The game ${game.name} intends to hit ${game.goal} users by the end of the month!</h1>`;
        
        // Add the image if game.img exists
        if (game.img) {
            let img = document.createElement('img');
            img.src = game.img;
            img.alt = `${game.name} image`;
            g.appendChild(img);
        }
        
        // Insert the new game card after the h2 element
        h2Element.insertAdjacentElement('afterend', g);
    }
}
//addGamesToPage(GAMES_JSON);

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);
//console.log("Amount contributed: " + contributionsCard + "\n");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
//console.log("amount raised: " + raisedCard + "\n");

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);
//console.log(gamesCard);


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
let gb = GAMES_JSON.filter ( (game) => {
    return game.pledged < game.goal;
});
console.log(gb.length + " many underFunded");
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    let unfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
    });
    console.log(unfunded.length);
    addGamesToPage(unfunded);



    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}
let amtUnfunded = GAMES_JSON.reduce((acc, game) => {
    return game.pledged < game.goal ? acc + 1 : acc;
}, 0);

let amtGames = GAMES_JSON.length;
let totalMoney = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0).toLocaleString();

// Fix: Use backticks (`) for string interpolation
let message = `Currently, ${amtUnfunded} of our ${amtGames} games have not reached their goal for funding. We need your help to get these amazing games up and running! In total, we've raised $${totalMoney}!`;

let nP = document.createElement('p');
nP.innerHTML = message;
let dC = document.getElementById('description-container');
dC.appendChild(nP);


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let funded = GAMES_JSON.filter ( (game) => {
        return game.pledged > game.goal;
    });
    console.log(funded.length);
    addGamesToPage(funded);
    

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item