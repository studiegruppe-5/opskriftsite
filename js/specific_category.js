let listContainer = document.querySelector(".recipes-container");
const selectElement = document.querySelector("#selectElement");

// Definer egne kategorier med tilhørende tags
const categories = {
  Dessert: ["Smoothie", "Tiramisu", "Cookies", "Mango", "Cocktail", "Matcha ice cream"],
  Vegetarian: ["Pizza", "Vegetarian", "Bruschetta", "Caprese", "Saag", "Tagine", "Elote", "Borscht", "Dosa", "Falafel"],
};

// Hent alle opskrifter én gang og gem dem
let allRecipes = [];

// Hent data og vis alle opskrifter ved første load
fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => {
    allRecipes = data.recipes; // Gem alle opskrifter
    showAllRecipes(allRecipes); // Vis dem
  });

function showAllRecipes(data) {
  const markup = data
    .map(
      (recipe) =>
        `
    <div class="recipe">
      <a href="recipe.html?id=${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.name}" />
        <h3>${recipe.name}</h3>
      </a>
    </div>
    `
    )
    .join("");

  listContainer.innerHTML = markup;
}

// Funktion til at filtrere opskrifter baseret på valgte kategori eller tag
function filterRecipes(event) {
  const selectedValue = event.target.value;

  if (selectedValue === "all") {
    showAllRecipes(allRecipes);
    return;
  }

  let validTags = [];

  // Hvis det valgte filter er en kategori, brug dens tags
  if (categories[selectedValue]) {
    validTags = categories[selectedValue].map((tag) => tag.toLowerCase());
  } else {
    validTags = [selectedValue.toLowerCase()]; // Ellers brug det direkte som et tag
  }

  const filteredRecipes = allRecipes.filter((recipe) => recipe.tags.some((tag) => validTags.includes(tag.toLowerCase())));

  console.log("Filtrerede opskrifter:", filteredRecipes);
  showAllRecipes(filteredRecipes);
}

// Lyt efter ændringer i select-boksen
selectElement.addEventListener("change", filterRecipes);
