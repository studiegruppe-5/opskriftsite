// let listContainer = document.querySelector(".category_container");
let listContainer1 = document.querySelector(".pink_grid");
let listContainer2 = document.querySelector(".thirdBlock");
// let listContainer3 = document.querySelector(".category_container1");
let listContainer4 = document.querySelector(".lastBlock");

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
      let shuffledRecipes = data.recipes.sort(() => Math.random() - 0.5); // Bland rækkefølgen tilfældigt

      // Vælg de første 3 opskrifter til "Popular"
      let popularRecipes = shuffledRecipes.slice(0, 3);

      // Vælg de næste 3 opskrifter til "Dishes"
      let dishesRecipes = shuffledRecipes.slice(3, 6);

      // Vis opskrifter i "Popular"
      // showPopular(popularRecipes);

      // Vis én opskrift i "OneRecipe" sektionen
      showOneRecipe(popularRecipes.slice(0, 1));

      // Vis én opskrift i "OneRecipe2" sektionen
      showOneRecipe2(popularRecipes.slice(0, 1));

      // Vis de næste 3 opskrifter i "Dishes"
      // showDishes(dishesRecipes);

      showOneRecipe3(popularRecipes.slice(0, 1));
    });
}
// done nedaf
// function showPopular(recipes) {
//   const markup = recipes
//     .map(
//       (recipe) =>
//         `
//          <a class="category_box" href="https://dummyjson.com/recipes/tag/${recipe.tags[0]}">
//          <img src="${recipe.image}" alt="${recipe.name}" />
//          <h4>${recipe.tags[0]}</h4>
//          </a>
//           `
//     )
//     .join("");

//   listContainer.innerHTML = markup;
// }
// done nedaf
function showOneRecipe() {
  fetch("https://dummyjson.com/recipes/29")
    .then((res) => res.json())
    .then((data) => {
      listContainer1.innerHTML = `

      <img src="${data.image}" alt="${data.name}" />
      <div class="text_flex">   
            <h2>Are you busy?</h2>
             <p>Need meal inspiration? Sometimes, the simplest ingredients can create the most delicious dishes. You should try our mouthwatering ${data.name}</p>
             <a href="https://dummyjson.com/recipes/29">
               <button>Udforsk</button>
             </a>
        </div>
            `;
    });
}
// done nedaf
function showOneRecipe2() {
  fetch("https://dummyjson.com/recipes/21")
    .then((res) => res.json())
    .then((data) => {
      listContainer2.innerHTML = `

   <div class="grid_1_1">
          <div class="mushroom_container">
            <img src="assets/img/mushroom.webp" alt="Mushroom" />
          </div>
          <div class="img_container">
         <img src="${data.image}" alt="${data.name}" />
          </div>
          <div class="text_flex">
            <h3>Healthy options</h3>

            <div class="text_box">
              <p>Eating healthy doesn’t have to be boring. Get inspired by our delicious and nutritious ${data.name}</p>
            </div>

          <a href="https://dummyjson.com/recipes/21">
               <button>Udforsk</button>
             </a>
          </div>
        </div>
            `;
    });
}
// done nedaf
// function showDishes(recipes) {
//   const markup = recipes
//     .map(
//       (recipe) =>
//         `
//          <a class="carousel_container" href="https://dummyjson.com/recipes/tag/${recipe.tags[0]}">
//          <img src="${recipe.image}" alt="${recipe.name}" />
//          <h4>${recipe.tags[0]}</h4>
//          </a>
//           `
//     )
//     .join("");

//   listContainer3.innerHTML = markup;
// }

function showOneRecipe3() {
  fetch("https://dummyjson.com/recipes/23")
    .then((res) => res.json())
    .then((data) => {
      listContainer4.innerHTML = `

 <div class="grid_1_1">
          <div class="img_container">
         <img src="${data.image}" alt="${data.name}" />
          </div>
          <div class="text_flex ">
         <h3>${data.tags[0]}</h3>

            <div class="text_box">
              <p>Kan du rigtig meget godt lide kage og alt muligt andet og huller i tænderne så spis alt vores lækre sukkermummelum.</p>
            </div>

            <button>Udforsk</button>
          </div>
          <div class="mitt_container">
            <img src="assets/img/mitt.webp" alt="Baking mitt" />
          </div>
        </div>
            `;
    });
}

showRecipes();
