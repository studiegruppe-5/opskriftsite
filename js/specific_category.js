document.addEventListener("DOMContentLoaded", () => {
  let listContainer = document.querySelector(".recipes-container");
  const selectElement = document.querySelector("#selectElement");

  const categories = {
    Dessert: ["Smoothie", "Tiramisu", "Cookies", "Mango", "Cocktail", "Matcha ice cream"],
    Vegetarian: ["Pizza", "Vegetarian", "Bruschetta", "Caprese", "Saag", "Tagine", "Elote", "Borscht", "Dosa", "Falafel"],
  };

  let allRecipes = [];

  // Hent data og filtrer ved første load
  fetch(`https://dummyjson.com/recipes`)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      applyFilterFromURL(); // Filtrer baseret på URL
    });

  function showAllRecipes(data) {
    const markup = data
      .map(
        (recipe) =>
          `
      <div class="recipe">
        <a href="recipe.html?id=${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.name}" />
          <h4>${recipe.name}</h4>
        </a>
      </div>
      `
      )
      .join("");

    listContainer.innerHTML = markup;
  }

  function filterRecipes(value) {
    if (!value) return; // Undgå fejl, hvis `value` er `null` eller `undefined`

    if (value === "all") {
      showAllRecipes(allRecipes);
      return;
    }

    let validTags = [];

    if (categories[value]) {
      validTags = categories[value].map((tag) => tag.toLowerCase());
    } else if (typeof value === "string") {
      console.log("Filter værdi:", value, "Type:", typeof value);
      validTags = [value.toLowerCase()];
    } else {
      console.error("Filterværdi er ikke en string:", value);
      return;
    }

    const filteredRecipes = allRecipes.filter((recipe) => {
      if (!recipe.tags || !Array.isArray(recipe.tags)) return false; // Sikrer, at tags findes og er et array
      return recipe.tags.some((tag) => validTags.includes(tag.toLowerCase()));
    });

    console.log("Filtrerede opskrifter:", filteredRecipes);
    showAllRecipes(filteredRecipes);
  }

  // Lyt efter ændringer i select-boksen
  selectElement.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    filterRecipes(selectedValue);
    // Opdater URL'en, så brugeren kan dele den filtrerede visning
    window.history.pushState({}, "", `?filter=${selectedValue}`);
  });

  // Læs URL-parametre og filtrer ved første load
  function applyFilterFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let filterParam = urlParams.get("filter");

    if (filterParam) {
      console.log("URL Filter:", filterParam);

      // Normaliser værdien (store/små bogstaver)
      filterParam = filterParam.charAt(0).toUpperCase() + filterParam.slice(1).toLowerCase();

      // Tjek om værdien findes i select-options
      const validOption = [...selectElement.options].some((opt) => opt.value === filterParam);

      if (validOption) {
        selectElement.value = filterParam; // Sæt dropdown til den valgte kategori
        filterRecipes(filterParam);
      } else {
        console.warn("Ugyldigt filter:", filterParam);
        selectElement.value = "all"; // Default til "all", hvis værdien ikke findes
        showAllRecipes(allRecipes);
      }
    } else {
      selectElement.value = "all";
      showAllRecipes(allRecipes);
    }
  }
});
