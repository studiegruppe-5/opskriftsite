// const recipeId = new URLSearchParams(window.location.search).get("id");
let recipeContainer = document.querySelector("main");

const recipeId = 1;

fetch(`https://dummyjson.com/recipes?limit=0`)
  .then((response) => response.json())
  .then((data) => {
    const recipe = data.recipes.find((r) => r.id == recipeId);

    recipeContainer.innerHTML = `
        <h1>${recipe.name}</h1>
        <img src="${recipe.image}" alt="Image of the specific recipe" />
        <section class="recipe">    
            <h2>${recipe.name}</h2>
            <p><b>Prep:</b> ${recipe.prepTimeMinutes} mins </p>
            <p><b>Cook:</b> ${recipe.cookTimeMinutes} mins</p>
            <p>${recipe.difficulty}</p>
            <p>${recipe.servings}</p>

            <h3>ingredients</h3>
            <div>
                <ul class="ingredient_list">
                ${recipe.ingredients
                  .map((ingredient, index) => {
                    let checkboxId = `ingredient_${index}`;
                    return `
                    <li>
                      ${ingredient} 
                      </li>
                      <li>
                      <input type="checkbox" id="${checkboxId}" />
                      <label for="${checkboxId}"></label>
                      </li>
                  `;
                  })
                  .join("")}
                </ul>
            </div>
            <!-- knap til at springe op og ned på siden -->
            <h3>instructions</h3>
            <div>
                <!-- knap til at holde skærmen tændt -->
                <ol class="instruction_list">
      ${recipe.instructions
        .map((step, index) => {
          let checkboxId = `instruction-${index}`;
          return `
          <li>
            <span class="step-text">${step}</span>
            <input type="checkbox" id="${checkboxId}" />
            <label for="${checkboxId}"></label>
          </li>
        `;
        })
        .join("")}
    </ol>
                </div>
                </section>
                `;
  });

//   <ul class="ingredient-list">
//                 ${recipe.ingredients.map((ingredient) => `<li>${ingredient} <input type="checkbox" /></li>`).join("")}
//                 </ul>

//<ol class="instruction_list">${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>;
