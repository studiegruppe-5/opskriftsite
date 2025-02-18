// const recipeId = new URLSearchParams(window.location.search).get("id");
let recipeContainer = document.querySelector(".layout");

const recipeId = 5;

fetch(`https://dummyjson.com/recipes?limit=0`)
  .then((response) => response.json())
  .then((data) => {
    const recipe = data.recipes.find((r) => r.id == recipeId);

    recipeContainer.innerHTML = `
        <h1>${recipe.name}</h1>
        <div class="grid_1-1">
        <img class="recipe_img" src="${recipe.image}" alt="Image of the specific recipe" />
        <section class="recipe">
        <h2>${recipe.name}</h2>
            <div class="quick_facts">    
                <p class="icon_text"> <img src="assets/imgs/recipe_icons/time.svg" alt="Cooking time icon" class="icon"> <b>Prep:</b> ${recipe.prepTimeMinutes} mins <b>Cook:</b> ${recipe.cookTimeMinutes} mins</p>

                <p class="icon_text"> <img src="assets/imgs/recipe_icons/niveau.svg" alt="Difficulty icon" class="icon"> ${recipe.difficulty}</p>

                <p class="icon_text"> <img src="assets/imgs/recipe_icons/servings.svg" alt="Servings icon" class="icon cutlery"> ${recipe.servings}</p>
            </div>

            <h3>ingredients</h3>
            <div>
                <ul class="ingredient_list">
                ${recipe.ingredients
                  .map((ingredient, index) => {
                    let checkboxId = `ingredient_${index}`;
                    return `
                    <li>
                      ${ingredient} 
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
                <div class="wakeLockContainer">
                    <button class="preventSleepBtn">
                    <img src="assets/imgs/recipe_icons/toggle-off.svg" alt="Icon toggled off" id="icon"></button>
                    <span class="preventText">Prevent the screen from turning off</span>
                    </div>
                    <ol class="instruction_list">${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>
                </div>
            </div>
        </section>
        </div>
         
                `;

    let wakeLock = null;
    const preventSleepBtn = document.querySelector(".preventSleepBtn");
    const icon = document.getElementById("icon");

    preventSleepBtn.addEventListener("click", async () => {
      try {
        if (wakeLock !== null) {
          wakeLock.release();
          wakeLock = null;
          icon.src = "assets/imgs/recipe_icons/toggle-off.svg"; // Skift billede til "off"
        } else {
          wakeLock = await navigator.wakeLock.request("screen");
          icon.src = "assets/imgs/recipe_icons/toggle-on.svg"; // Skift billede til "on"
        }
      } catch (err) {
        console.error("Fejl ved forsøg på at forhindre skærmdvale:", err);
      }
    });

    document.querySelectorAll(".instruction_list li").forEach((item) => {
      item.addEventListener("click", function () {
        this.classList.toggle("completed");
      });
    });
  });

// <div class="watch">
// <h3 >Watch the recipe as a video</h3>
// <img class="video" src="${recipe.image}" alt="Image of the specific recipe" />
// <img class="play" src="assets/imgs/recipe_icons/play.svg" alt="Image of the specific recipe" />
// </div>
