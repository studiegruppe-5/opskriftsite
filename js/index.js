let listContainer = document.querySelector(".carousel");
const mycategory = new URLSearchParams(window.location.search).get("tag");

function getLimit() {
  return window.innerWidth < 500 ? 2 : 3; // 2 opskrifter på mobil, 3 på desktop
}

// Opdater limit, når skærmstørrelsen ændrer sig
window.addEventListener("resize", () => {
  showRecipes();
});

function showRecipes() {
  const limit = getLimit(); // Bestem limit dynamisk
  fetch(`https://dummyjson.com/recipes`)
    .then((response) => response.json())
    .then((data) => {
      let recipes = data.recipes.slice(0, limit); // Begræns antallet af opskrifter
      showFavorites(recipes);
    })
    .catch((error) => console.error("Fejl ved hentning af data:", error));
}

function showFavorites(data) {
  const markup = data
    .map(
      (recipe) =>
        `

         <a class="carousel_container" href="https://dummyjson.com/recipes/tag/${recipe.tags[0]}">
         <img src="${recipe.image}" alt="${recipe.name}" />
         <h4>${recipe.tags[0]}</h4>
         </a>
          `
    )
    .join("");

  listContainer.innerHTML = markup;
}

// Kald funktionen første gang, når siden indlæses
showRecipes();
