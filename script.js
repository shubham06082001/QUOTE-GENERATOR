const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Show new quotes
function newQuote() {
  showLoadingSpinner();
  // pick a random quote from
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author is empty
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // check the quote length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get quote from API

async function getQuotes() {
  showLoadingSpinner();
  const proxyURL = "https://cor-s.herokuapp.com/";
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(proxyURL + apiURL);
    apiQuotes = await response.json();
    newQuote();
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quotetext.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    console.log("whoops, no quote", error);
  }
}

// tweet quotes
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterURL, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// on Load
getQuotes();
