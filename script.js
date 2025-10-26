import { podcasts } from "./data.js";

const main = document.querySelector("main");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalGenres = document.getElementById("modalGenres");
const modalSeasonsList = document.getElementById("modalSeasonsList");

/**
 * Display all podcasts as cards on the main page.
 * Each card shows the podcast image, title, number of seasons, and last updated date.
 */
function displayPodcasts() {
  main.innerHTML = ""; // Clear existing content

  podcasts.forEach((podcast) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${podcast.image}" alt="${podcast.title}" class="podcastCover" />
      <div class="cardDetails">
        <h3 class="podcastTitleCard">${podcast.title}</h3>
        <p class="seasonNumber">${podcast.seasons} Seasons</p>
        <p class="dateUpdated">Updated: ${new Date(
          podcast.updated
        ).toLocaleDateString()}</p>
      </div>
    `;

    // Open modal with podcast details when card is clicked
    card.addEventListener("click", () => openModal(podcast));
    main.appendChild(card);
  });
}

// Show all podcasts when page loads
displayPodcasts();

/**
 * Open the modal to show detailed information about a podcast.
 * @param {Object} podcast - The podcast object to display in the modal.
 */
function openModal(podcast) {
  modalTitle.textContent = podcast.title;
  modalImage.src = podcast.image;
  modalDescription.textContent = podcast.description;

  // Display podcast genres as tags
  modalGenres.innerHTML = "";
  podcast.genres.forEach((genre) => {
    const span = document.createElement("span");
    span.classList.add("tag");
    span.textContent = `Genre ${genre}`;
    modalGenres.appendChild(span);
  });

  // Display each season as a separate item
  modalSeasonsList.innerHTML = "";
  for (let i = 1; i <= podcast.seasons; i++) {
    const div = document.createElement("div");
    div.classList.add("seasonItem");
    div.textContent = `Season ${i}`;
    modalSeasonsList.appendChild(div);
  }

  // Show the modal
  modal.classList.remove("hidden");
}

/**
 * Close the modal when the close button is clicked
 */
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

/**
 * Close the modal if the user clicks outside the modal content
 */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
