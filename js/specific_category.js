let listContainer = document.querySelector(".listcontainer");
// const mycategory = new URLSearchParams(window.location.search).get("tag");

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => {
    showList(data.recipes);
  });

function showList(data) {
  const markup = data
    .map(
      (recipe) =>
        ` <section class="first">
        <div class="center"><</div>
        <div class="favorites">
          <h2>Favoritter</h2>

        ${recipe.tag === "italian" ? ` <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp"" alt="" />` : ""}


          <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp"" alt="" />
          <img src="https://cdn.dummyjson.com/recipe-images/${recipe.id}.webp"" alt="" />
          <h3>${recipe.name}</h3>
          <h3>${recipe.name}</h3>
        </div>
        <div class="center">></div>
      </section>`
    )
    .join("");
  console.log(markup);

  listContainer.innerHTML = markup;
}

// fetch(`https://dummyjson.com/recipes`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // Tjek strukturen af data
//     showList(data.recipes); // Vi sender kun opskrifterne videre til showList
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//     listContainer.innerHTML = "Der opstod en fejl under indlæsning af opskrifter.";
//   });

// document.querySelector(".listcontainer").innerHTML = mycategory;
