//  ${recipes.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}  mapper array inde i array

// let listContainer = document.querySelector(".favorites");
// // let listContainer1 = document.querySelector(".oneRecipe");
// // let listContainer2 = document.querySelector(".fullArray");

// // const mycategory = new URLSearchParams(window.location.search).get("id");

// fetch(`https://dummyjson.com/recipes`)
//   .then((response) => response.json())
//   .then((data) => {
//     showFavorites(data);
//     // showOneRecipe(data.recipes);
//     // showFullArray(data.recipes);
//   });

// function showFavorites(data) {
//   const markup = data
//     .map(
//       (recipe) =>
//         `
//           <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="" />
//           <h3>${recipe.name}</h3>
//           `
//     )
//     .join("");
//   listContainer.innerHTML = markup;
// }

// function showOneRecipe(data) {
//   const markup = data
//     .map(
//       (recipes) =>
//         `
//     <section class="second">

// <img src="${recipes.image}" alt="" />
// <h3>${recipes.name}</h3>
//       <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti doloremque ex dolorum incidunt neque voluptatibus ipsam laboriosam earum.</p>
//     </section>

//       `
//     )
//     .join("");
//   listContainer1.innerHTML = markup;
// }

// function showFullArray(data) {
//   let markup = `<h2>${mycategory}</h2>`;

//   // Wrapper til opskrifter
//   markup += `<div class="favorites">`;

//   // Generer HTML for hver opskrift
//   markup += data
//     .map(
//       (recipe) =>
//         `
//         <div >
//           <img src="${recipe.image}" alt="" />
//           <h3>${recipe.name}</h3>
//         </div>
//         `
//     )
//     .join("");

//   // Lukker wrapper-div'en
//   markup += `</div>`;

//   listContainer2.innerHTML = markup;
// }

// let listContainer = document.querySelector(".favorites");

// // Hent alle opskrifter
// fetch(`https://dummyjson.com/recipes/tags`)
//   .then((response) => response.json())
//   .then((data) => {
//     showFavorites(data); // Send alle opskrifter til funktionen
//   });

// function showFavorites(data) {
//   // Vælg fire specifikke opskrifter baseret på deres ID
//   const selectedIds = [1, 5, 8, 12]; // De fire ID'er du vil vise
//   const selectedRecipes = data.filter((recipe) => selectedIds.includes(recipe.id));

//   // Generér HTML
//   const markup = selectedRecipes
//     .map(
//       (recipe) => `
//         <div class="favorite-recipe">
//           <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="${recipe.name}" />
//           <h3>${recipe.name}</h3>
//         </div>
//       `
//     )
//     .join("");

//   // Indsæt i containeren
//   listContainer.innerHTML = markup;
// }

let listContainer = document.querySelector(".favorites");
let tagContainer = document.querySelector(".fullArray"); // Til tags

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => {
    showFavorites(data.recipes);
  });

fetch(`https://dummyjson.com/recipes/tags`)
  .then((response) => response.json())
  .then((tags) => {
    showTags(tags);
  });

function showFavorites(data) {
  const markup = data
    .slice(0, 4)
    .map(
      (recipe) =>
        `
      <div class="recipe">
          <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="" />
          <h3>${recipe.tags[0]}</h3>
          </div>
          `
    )
    .join("");
  listContainer.innerHTML = markup;
}

// Funktion til at vise tags i kategorier
function showTags(tags) {
  // Definer kategorier og sorter tags
  const categories = {
    Cuisine: ["Italian", "Mexican", "French", "Indian", "Asian"],
    Dishes: ["Salad", "Pasta", "Soup", "Stew", "Dessert"],
    Diet_preferences: ["Vegetarian", "Vegan", "Gluten-Free", "Keto"],
  };

  let markup = "";

  for (const category in categories) {
    let filteredTags = categories[category].filter((tag) => tags.includes(tag));

    if (filteredTags.length > 0) {
      markup += `<div class="tag-category">
                   <h3>${category}</h3>
                   <div class="tags">${filteredTags
                     .map(
                       (tag) => `
                    <h3 class="tag">${tag}</h3>`
                     )
                     .join("")}</div>
                 </div>`;
    }
  }

  tagContainer.innerHTML = markup;

  console.log(tags);
}

// let filterContainer = document.querySelector(".listcontainer");
// const mycategory = new URLSearchParams(window.location.search).get("category");
// const SelectElement = document.querySelector("#selectElement");

// function showProduct(event) {
//   console.log(event);
//   fetch("https://dummyjson.com/recipes/tags")
//     .then((response) => response.json())
//     .then(showList);

//   function showList(product) {
//     const markup = data.filter((product) => {
//       if (event) {
//         if (event.target.value == "discount") {
//           return product.discount;
//         } else if (event.target.value == "souldout") {
//           return product.souldout;
//         } else {
//           return true;
//         }
//       } else {
//         return true;
//       }
//     });
//   }
// }
