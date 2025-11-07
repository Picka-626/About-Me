// 1. List of poems
const poems = [
  "Even the smallest light<br>can chase away a thousand shadows.",
  "Breathe-<br>you’ve already survived every breath before this one.",
  "The stars don’t ask for permission;<br>they simply shine.",
  "What is broken can still bloom<br>if it remembers the sun.",
  "Silence is not empty;<br>it’s full of answers.",
  "Fall seven times,<br>stand up eight.",
  "The moon whispers secrets<br>only the night can hear.",
  "Courage doesn’t roar;<br>sometimes it’s a quiet voice within.",
  "Leaves fall to remind us<br>that letting go is beautiful.",
  "Dreams grow<br>where hope is planted.",
  "A single step forward<br>can change everything.",
  "Stars shine brighter<br>after the darkest nights.",
  "The ocean doesn’t ask for applause;<br>it just keeps moving.",
  "Sunlight always finds a way<br>through the clouds.",
  "Even mountains<br>start as tiny stones.",
  "Hope is a candle<br>in the darkest room.",
  "Rivers carve valleys<br>by simply flowing.",
  "Your heart knows the way<br>even when your mind is lost.",
  "Every sunrise<br>is a new beginning.",
  "Kindness is a seed<br>that blooms in every soul.",
  "Time heals<br>even the deepest scars.",
  "The wind teaches<br>us to let go.",
  "Even the tiniest star<br>can light the sky.",
  "Patience grows<br>where trust is planted.",
  "Your voice matters<br>even if it trembles.",
  "Clouds may cover the sun,<br>but it still shines above.",
  "A smile<br>can start a revolution.",
  "The journey matters<br>more than the destination.",
  "Shadows fade<br>when you move toward the light.",
  "Courage is quiet,<br>but unstoppable.",
  "Dreams whisper<br>to those who listen.",
  "Mountains rise<br>one stone at a time.",
  "Even broken wings<br>can learn to fly again.",
  "The smallest act<br>can ripple through the world.",
  "Stars are proof<br>that beauty exists in the dark.",
  "Those who stay<br>see the beauty in the mess."
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
