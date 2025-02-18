let listContainer = document.querySelector(".carousel");
let listContainer1 = document.querySelector(".pink_grid");

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
      showPopular(recipes);
      showOneCategory(recipes.slice(0, 1));
    });
}

function showPopular(data) {
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

// function showOneCategory(data) {
//   const limit = 1; // Begræns til én opskrift
//   const selectedRecipe = data.find((recipe) => recipe.tags.includes("Mexican")); // Vælg opskriften med tagget 'easy'

//   if (selectedRecipe) {
//     const markup = `
//       <img src="${selectedRecipe.image}" alt="${selectedRecipe.name}" />
//         <div class="text_flex">
//           <h2>Are you busy?</h2>
//           <p>Få inspiration til retter med kort tilberedelsestid og et eller andet andet blaaaaaaaaaaaaaaaaa</p>
//           <a href="#">
//             <button>Udforsk</button>
//           </a>
//         </div>
//       `;
//     listContainer1.innerHTML = markup;
//   } else {
//     console.log("Ingen opskrift fundet med det valgte tag.");
//   }
// }

function showOneCategory(data) {
  const limit = 1;
  const markup = data
    .map(
      (recipe) =>
        `
         <img src="${recipe.image}" alt="${recipe.name}" />
          <div class="text_flex">
            <div class="text_flex">
            <h2>Are you busy?</h2>
            <p>Få inspiration til retter med kort tilberedelsestid og et eller andet andet blaaaaaaaaaaaaaaaaa</p>
            <a href="#">
              <button>Udforsk</button>
            </a>
          </div>
            `
    )
    .join("");

  listContainer1.innerHTML = markup;
}

// Kald funktionen første gang, når siden indlæses
showRecipes();
