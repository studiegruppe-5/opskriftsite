let listContainer = document.querySelector(".recipes-container");
const selectElement = document.querySelector("#selectElement");

function showRecipes(event) {
  fetch(`https://dummyjson.com/recipes`)
    .then((response) => response.json())
    .then((data) => {
      showAllRecipes(data.recipes);
    });

  function showAllRecipes(data) {
    const markup = data
      .filter((recipe) => {
        if (event) {
          if (event.target.value == "cuisine") {
            return recipe.cuisine;
          } else if (event.target.value == "dessert") {
            recipe.dessert;
          }
        }
      })
      .map(
        (recipe) =>
          `
      <div class="recipe">
      <a href="recipe.html?id=${recipe.id}"><img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      </a>
      </div>
      `
      )
      .join("");

    listContainer.innerHTML = markup;
  }
}

selectElement.addEventListener("change", showRecipes);

showRecipes();

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
