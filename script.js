import { podcasts, genres, seasons } from "./data.js";

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
 * Each card shows the podcast image, title, genre names, number of seasons, and last updated date.
 */
function displayPodcasts() {
  main.innerHTML = ""; // Clear existing content

  podcasts.forEach((podcast) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Get genre names from data.js
    const genreNames = podcast.genres
      .map((id) => {
        const genreObj = genres.find((g) => g.id === id);
        return genreObj ? genreObj.title : `Genre ${id}`;
      })
      .join(", ");

    card.innerHTML = `
      <img src="${podcast.image}" alt="${podcast.title}" class="podcastCover" />
      <div class="cardDetails">
        <h3 class="podcastTitleCard">${podcast.title}</h3>
        <p class="genreNames">${genreNames}</p>
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

  // === Handle long descriptions with "Read more" ===
  const maxLength = 180;
  if (podcast.description.length > maxLength) {
    const shortDesc = podcast.description.slice(0, maxLength) + "...";
    modalDescription.innerHTML = `
      <span id="shortDesc">${shortDesc}</span>
      <span id="fullDesc" class="hidden">${podcast.description}</span>
      <button id="readMoreBtn" class="read-more">Read more</button>
    `;
    const readMoreBtn = document.getElementById("readMoreBtn");
    readMoreBtn.addEventListener("click", () => {
      document.getElementById("shortDesc").classList.toggle("hidden");
      document.getElementById("fullDesc").classList.toggle("hidden");
      readMoreBtn.textContent =
        readMoreBtn.textContent === "Read more" ? "Show less" : "Read more";
    });
  } else {
    modalDescription.textContent = podcast.description;
  }

  // === Display genre tags ===
  modalGenres.innerHTML = "";
  podcast.genres.forEach((id) => {
    const genreObj = genres.find((g) => g.id === id);
    const tag = document.createElement("span");
    tag.classList.add("genre-tag");
    tag.textContent = genreObj ? genreObj.title : `Genre ${id}`;
    modalGenres.appendChild(tag);
  });

  // === Display seasons and episode counts ===
  modalSeasonsList.innerHTML = "";
  const seasonData = seasons.find((s) => s.id === podcast.id);
  if (seasonData) {
    seasonData.seasonDetails.forEach((season) => {
      const div = document.createElement("div");
      div.classList.add("seasonItem");
      div.textContent = `${season.title} - ${season.episodes} episodes`;
      modalSeasonsList.appendChild(div);
    });
  } else {
    modalSeasonsList.innerHTML = "<p>No seasons available</p>";
  }

  // === Add last updated date ===
  let updatedElement = document.getElementById("modalUpdated");
  if (!updatedElement) {
    updatedElement = document.createElement("p");
    updatedElement.id = "modalUpdated";
    modal.querySelector(".modal-content").appendChild(updatedElement);
  }
  updatedElement.textContent = `Last updated: ${new Date(
    podcast.updated
  ).toLocaleDateString()}`;

  // === Prevent background scroll ===
  document.body.style.overflow = "hidden";

  // === Show the modal ===
  modal.classList.remove("hidden");
}

/**
 * Close the modal when the close button is clicked
 */
function closeModalWindow() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto"; // Restore scrolling
}

closeModal.addEventListener("click", closeModalWindow);

/**
 * Close the modal if the user clicks outside the modal content
 */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalWindow();
  }
});
