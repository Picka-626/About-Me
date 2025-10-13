// 1. List of quotes
const quotes_credits = [
  "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
  "What you do today can improve all your tomorrows. — Ralph Marston",
  "The secret of getting ahead is getting started. — Mark Twain",
  "It always seems impossible until it's done. — Nelson Mandela",
  "Act as if what you do makes a difference. It does. — William James",
  "Do what you can, with what you have, where you are. — Theodore Roosevelt",
  "In the middle of every difficulty lies opportunity. — Albert Einstein",
  "In life, all good things come hard, but wisdom is the hardest to come by. — Lucille Ball",
  "Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
  "It is never too late to be what you might have been. — George Eliot",
  "The only one who can tell you ‘you can’t win’ is you, and you don’t have to listen. — Jessica Ennis",
  "Don’t look at your feet to see if you are doing it right. Just dance. — Anne Lamott"
];

const quotes_nocredits = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "What you do today can improve all your tomorrows.",
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Act as if what you do makes a difference. It does.",
  "Do what you can, with what you have, where you are.",
  "In the middle of every difficulty lies opportunity.",
  "In life, all good things come hard, but wisdom is the hardest to come by.",
  "Success is not final; failure is not fatal: It is the courage to continue that counts.",
  "It is never too late to be what you might have been.",
  "The only one who can tell you ‘you can’t win’ is you, and you don’t have to listen.",
  "Don’t look at your feet to see if you are doing it right. Just dance."
];

const quotes = quotes_nocredits;

// 2. Function to choose a quote based on the current date
function getQuoteOfTheDay() {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // e.g. "2025-10-13"
  let hash = 0;

  for (let i = 0; i < dateString.length; i++) {
    hash += dateString.charCodeAt(i);
  }

  // 3. Pick a quote based on the hash
  const index = hash % quotes.length;
  return quotes[index];
}

// 4. Display it on the page
document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById("Quote");
  quoteElement.textContent = getQuoteOfTheDay();
  quoteElement.style.opacity = 0;
  setTimeout(() => (quoteElement.style.transition = "opacity 1s", quoteElement.style.opacity = 1), 100);
});