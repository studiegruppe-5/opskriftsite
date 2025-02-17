// //  ${recipes.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}  mapper array inde i array

let listContainer = document.querySelector(".favorites");
let listContainer1 = document.querySelector(".oneRecipe");
let listContainer2 = document.querySelector(".fullArray");

const mycategory = new URLSearchParams(window.location.search).get("tag");

console.log(mycategory);

fetch(`https://dummyjson.com/recipes/tag/${mycategory}`)
  .then((response) => response.json())
  .then((data) => {
    showFavorites(data.recipes);
    showOneRecipe(data.recipes);
    showFullArray(data.recipes);
  });

function showFavorites(data) {
  const markup = data
    .map(
      (recipes) =>
        `
          <div>          
          <img src="${recipes.image}" alt="" />
          <h3>${recipes.name}</h3>
          </div>
          `
    )
    .join("");
  listContainer.innerHTML = markup;
}

function showOneRecipe(data) {
  const markup = data
    .map(
      (recipes) =>
        `
    <section class="second">
    
<img src="${recipes.image}" alt="" />
<h3>${recipes.name}</h3>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti doloremque ex dolorum incidunt neque voluptatibus ipsam laboriosam earum.</p>
    </section>

      `
    )
    .join("");
  listContainer1.innerHTML = markup;
}

function showFullArray(data) {
  let markup = `<h2>${mycategory}</h2>`;

  // Wrapper til opskrifter
  markup += `<div class="favorites">`;

  // Generer HTML for hver opskrift
  markup += data
    .map(
      (recipe) =>
        `
        <div >
          <img src="${recipe.image}" alt="" />
          <h3>${recipe.name}</h3>
        </div>
        `
    )
    .join("");

  // Lukker wrapper-div'en
  markup += `</div>`;

  listContainer2.innerHTML = markup;
}
