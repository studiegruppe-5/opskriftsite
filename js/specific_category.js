// //  ${recipes.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}  mapper array inde i array

let listContainer = document.querySelector(".listcontainer");
const mycategory = new URLSearchParams(window.location.search).get("tag");

fetch(`https://dummyjson.com/recipes?tag=Italian`)
  .then((response) => response.json())
  .then((data) => {
    showFavorites(data.recipes);
  });

function showFavorites(data) {
  // const filteredRecipes = data.filter((recipes) => recipes.tags.includes(mycategory));

  const markup = data
    .map(
      (recipes) =>
        `
        <div class="favorites">
          <h2>Favoritter</h2>
          <img src="${recipes.image}" alt="" />
          <img src="${recipes.image}" alt="" />
          <h3>${recipes.name}</h3>
          <h3>${recipes.name}</h3>
        </div>
      `
    )
    .join("");
  console.log(markup);

  listContainer.innerHTML = markup;
}
document.querySelector(".listcontainer").innerHTML = mycategory;

// let listContainer = document.querySelector(".listcontainer");
// const mycategory = new URLSearchParams(window.location.search).get("tag");

// fetch(`https://dummyjson.com/recipes/tags?tag=${mycategory}`) // Hent opskrifter baseret på tag
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("API Response:", data.recipes); // Debugging
//     showFavorites(data.recipes); // Kald funktionen med opskrifter
//   });

// function showFavorites(data) {
//   // Filtrér opskrifterne baseret på `mycategory`
//   const filteredRecipes = data.filter((recipe) => recipe.tags.includes(mycategory));

//   console.log("Filtered Recipes:", filteredRecipes); // Debugging

//   // Hvis ingen opskrifter findes, vis besked
//   if (filteredRecipes.length === 0) {
//     listContainer.innerHTML = `<p>Ingen opskrifter fundet for kategorien: ${mycategory}</p>`;
//     return;
//   }

//   // Begræns til kun at vise 2 opskrifter
//   const limitedRecipes = filteredRecipes.slice(0, 2);

//   // Generér HTML
//   const markup = limitedRecipes
//     .map(
//       (recipe) => `
//         <div class="favorites">
//           <h2>${mycategory}</h2>
//           <img src="${recipe.image}" alt="${recipe.name}" />
//           <h3>${recipe.name}</h3>
//         </div>
//       `
//     )
//     .join("");

//   // Opdater HTML-indholdet
//   listContainer.innerHTML = markup;
// }

// // Vis kategoriens navn i `listContainer`
// document.querySelector(".listcontainer").innerHTML = `<h1>${mycategory}</h1>`;

// console.log("Valgt kategori:", mycategory);
// console.log("URL search params:", window.location.search);
// console.log("API Response:", data);
