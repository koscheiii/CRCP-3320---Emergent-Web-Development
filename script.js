let activities = [];
let currentActivity = "";

// Load activities.json
fetch("activities.json")
  .then(res => res.json())
  .then(data => activities = data);

const activityText = document.getElementById("activity");
const moveButton = document.getElementById("moveButton");
const saveButton = document.getElementById("saveButton");
const favoritesList = document.getElementById("favoritesList");

// Button handler
moveButton.addEventListener("click", (event) => {
  event.preventDefault();

  const mood = document.getElementById("mood").value;
  const group = document.getElementById("group").value;
  const location = (document.getElementById("location") && document.getElementById("location").value) || "any";

  let filtered = activities;

  if (mood !== "any") filtered = filtered.filter(a => a.mood === mood);
  if (group !== "any") filtered = filtered.filter(a => a.group === group);
  if (location !== "any") filtered = filtered.filter(a => a.location === location);

  if (filtered.length === 0) {
    activityText.textContent = "No activities match your filters 😢";
    return;
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  currentActivity = random.activity;

  // animate in/out
  activityText.style.opacity = 0;
  activityText.style.transform = "translateY(10px)";

  setTimeout(() => {
    activityText.textContent = currentActivity;
    activityText.style.opacity = 1;
    activityText.style.transform = "translateY(0)";
  }, 200);

  saveButton.style.display = "inline-block";
});

// Save to favorites
saveButton.addEventListener("click", () => {
  if (!currentActivity) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(currentActivity)) {
    favorites.push(currentActivity);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    addFavoriteItem(currentActivity); // animate just the new item
  }
});

// Add one favorite item with animation
function addFavoriteItem(activity) {
  const li = document.createElement("li");
  li.textContent = activity;

  const removeBtn = document.createElement("span");
  removeBtn.textContent = "✖";
  removeBtn.classList.add("removeBtn");
  removeBtn.onclick = () => removeFavorite(activity);

  li.appendChild(removeBtn);

  // Set initial animation state (fade & slide in)
  li.style.opacity = 0;
  li.style.transform = "translateY(10px)";
  li.style.transition = "opacity 0.6s ease, transform 0.4s ease";

  favoritesList.appendChild(li);

  // Force reflow to trigger transition
  li.getBoundingClientRect();

  // Animate to final state
  li.style.opacity = 1;
  li.style.transform = "translateY(0)";
}

function removeFavorite(activity) {
  const li = [...favoritesList.children].find(li => li.dataset.activity === activity);
  if (!li) return;

  li.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  li.style.transform = "scale(0)";
  li.style.opacity = "0";

  li.addEventListener("transitionend", () => {
    li.remove();

    // Update localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(f => f !== activity);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, { once: true });
}

// Load favorites on page load
renderFavorites();