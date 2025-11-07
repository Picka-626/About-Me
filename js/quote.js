// 1. List of quotes
const poems = [
  "Even the smallest light<br>can chase away a thousand shadows.",
  "Breathe-<br>you’ve already survived every breath before this one.",
  "The stars don’t ask for permission;<br>they simply shine.",
  "What is broken can still bloom<br>if it remembers the sun.",
  "Silence is not empty;<br>it’s full of answers."
];

const choice = poems;

// 2. Function to choose a quote based on the current date
function getQuoteOfTheDay() {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // e.g. "2025-10-13"
  let hash = 0;

  for (let i = 0; i < dateString.length; i++) {
    hash += dateString.charCodeAt(i);
  }

  // 3. Pick a quote based on the hash
  const index = hash % choice.length;
  return choice[index];
}

// 4. Display it on the page
document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById("Quote");
  quoteElement.innerHTML = getQuoteOfTheDay();
  quoteElement.style.opacity = 0;
  setTimeout(() => (quoteElement.style.transition = "opacity 1s", quoteElement.style.opacity = 1), 100);
});
