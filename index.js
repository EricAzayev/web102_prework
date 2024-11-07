/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);


function populateDropdown() {
    const dropdown = document.getElementById('project');
    let underfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
    });

    underfunded.forEach(game => {
        const option = document.createElement('option');
        option.value = game.name;
        option.textContent = game.name;
        dropdown.appendChild(option);
    });
}
populateDropdown();




// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    // while (parent.firstChild) {
    //     parent.removeChild(parent.firstChild);
    // }
    document.querySelectorAll('.game-card').forEach(element => element.remove());
}

let fund = GAMES_JSON.filter ( (game) => {
    return game.pledged > game.goal;
});
let first = document.getElementById("topFunded");
let second = document.getElementById("secondFunded");
first.textContent = fund[0].name;
second.textContent = fund[1].name;



/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    let gamesContainer = document.getElementById('games-container');

    if (!gamesContainer) {
        gamesContainer = document.createElement('div');
        gamesContainer.id = 'games-container';
        gamesContainer.style.display = 'grid';
        gamesContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        document.body.appendChild(gamesContainer);
    }
    
    games.forEach(game => {
        let g = document.createElement('div');
        g.classList.add('game-card');

        g.style.backgroundColor = 'white';
        g.style.textAlign = 'center';
        g.style.borderRadius = '7px';
        g.style.boxSizing = 'border-box';

        g.innerHTML = `<h1>The game ${game.name} intends to hit ${game.goal} users by the end of the month!</h1>`;
        
        if (game.img) {
            let img = document.createElement('img');
            img.src = game.img;
            img.alt = `${game.name} image`;
            img.style.width = '90%';
            img.style.height = 'auto';
            img.style.borderRadius = '5px';
            g.appendChild(img);
        }

        gamesContainer.appendChild(g);
    });
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
let contributions = document.getElementById('contributions');
contributions.textContent = contributionsCard.toString().toLocaleString();
//console.log("Amount contributed: " + contributionsCard + "\n");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
let raised = document.getElementById("raised");
raised.textContent = "$" + raisedCard.toLocaleString();
//console.log("amount raised: " + raisedCard + "\n");

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);

let gb = GAMES_JSON.filter ( (game) => {
    return game.pledged < game.goal;
});
//console.log(gb.length + " many underFunded");
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    let unfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
    });
    //console.log(unfunded.length);
    addGamesToPage(unfunded);


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
    //console.log(funded.length);
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

function scrollToGames() {
    deleteChildElements(gamesContainer);
    
    addGamesToPage(GAMES_JSON);
    document.getElementById('games').scrollIntoView({
      behavior: 'smooth'
    });
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const showGames = document.getElementById("numGames");


unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
showGames.addEventListener("click", scrollToGames);



const descriptionContainer = document.getElementById("description-container");



const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
let topRated = document.createElement('h4');
topRated.textContent = sortedGames[0].name + "is our highest rated game!";
let firstGame = document.getElementById("first-game");
firstGame.appendChild(topRated);
let secondTop = document.createElement('h4');
secondTop.textContent = sortedGames[1].name + "is our second highest rated game!";


//Handling the donation form
const donationForm = document.getElementById('fund-project');

donationForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const donorName = document.getElementById('donor-name').value;
    const donationAmount = document.getElementById('donation-amount').value;
    const cardNumber = document.getElementById('card-number').value;
    const securityCode = document.getElementById('security-code').value;
    const gameOption = document.getElementById('project').value

    
    console.log(`Donor: ${donorName}, Amount: $${donationAmount}, Card Number: ${cardNumber}, Security Code: ${securityCode}` + "-- ready to be processed by back-end");
    alert(`Thank you for the donation! We appreciate your anticipation and hope to publish ${gameOption} soon!`);

    donationForm.reset();
});
