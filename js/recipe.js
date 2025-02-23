const recipeId = new URLSearchParams(window.location.search).get("id");
// Opretter en variabel (recipeID), der tager fat i det id, der bliver givet med i URL'en

let recipeContainer = document.querySelector(".layout");
// Opretter en variabel (recipeContainer), der tager fat i den div som indholdet senere skal lægges ind i

fetch(`https://dummyjson.com/recipes?limit=50`)
  // Bruger fetch til at hente data fra API'et
  .then((response) => response.json())
  // .then for at konvertere response til JSON
  .then((data) => {
    // Bruger .then for at gå igennem alt dataen i JSON filen
    const recipe = data.recipes.find((r) => r.id == recipeId);
    // Opretter en variabel (recipe), hvori den opskrift der matcher det id der bliver givet med i URL'en bliver lagt ind

    // Nedenfor bliver der taget fat i variablen recipeContainer og med .innerHTML bliver alt tekst indenfor `` lagt ind i HTML
    // Med ${recipe.xxxx} tages der fat i variablen recipe, som indeholder data for hvert enkel opskrift i JSON filen.
    recipeContainer.innerHTML = `
    <h1>${recipe.name}</h1>
    <div class="grid_1-1">
    <img class="recipe_img" src="${recipe.image}" alt="Image of the specific recipe" />
      <section class="recipe">
        <h2>${recipe.name}</h2>
        <div class="quick_facts">
          <p class="icon_text"><img src="assets/imgs/recipe_icons/time.svg" alt="Cooking time icon" class="icon" /> <b>Prep:</b> ${recipe.prepTimeMinutes} mins <b>Cook:</b> ${recipe.cookTimeMinutes} mins</p>
    
          <p class="icon_text"><img src="assets/imgs/recipe_icons/niveau.svg" alt="Difficulty icon" class="icon" /> ${recipe.difficulty}</p>
    
          <p class="icon_text"><img src="assets/imgs/recipe_icons/servings.svg" alt="Servings icon" class="icon cutlery" /> ${recipe.servings}</p>
        </div>

        <h3>ingredients</h3>
        <div>
          <ul class="ingredient_list">

          
            ${recipe.ingredients
              // Her bruges nøglen .ingredients i JSON-dataen
              .map((ingredient, index) => {
                // Med .map() gennemløber den hver ingrediens og for hvert element oprettes et unikt ID ved hjælp af index
                let checkboxId = `ingredient_${index}`;
                // Inde i arrow-funktionen oprettes variablen checkboxId, som indeholder ID’et til den specifikke ingrediens.Denne variabel bruges til at lave checkboxene i ingrediens listen
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
    
        <h3>instructions</h3>
        <div>
          <div class="wakeLockContainer">
            <button class="preventSleepBtn">
              <img src="assets/imgs/recipe_icons/toggle-off.svg" alt="Icon toggled off" id="icon" />
            </button>
            <span class="preventText">Prevent the screen from turning off</span>
          </div>


          <ol class="instruction_list">
            ${recipe.instructions
              // Her tager man fat i instructions nøglen i recipe og med .map gennemgår den hver enkelt step i instruktionslisten og ligger det ind i et <li> tag for at lave en liste
              .map(
                (step) => `
            <li>${step}</li>
            `
              )
              .join("")}
          </ol>
        </div>
      </section>
        <div class="watch">
          <h3>Watch the recipe as a video</h3>
          <img src="assets/imgs/fakevideo.webp" alt="Image that's supposed to look like a video of the recipe" />
        </div>
    </div>
                `;

    let wakeLock = null;
    // Opretter variablen wakeLock og sætter den til null for at kunne gemme en wake lock senere
    const preventSleepBtn = document.querySelector(".preventSleepBtn");
    // Opretter variablen preventSleepBtn og gemmer det <button> tag indholdet skal lægges ind i
    const icon = document.getElementById("icon");
    // Opretter variablen icon og gemmer billeder med id="icon" så det kan ændres dynamisk

    // Nedenfor tilføjes en eventlistener til knappen, der lytter på "click" og kører en asykron funktion
    // async gør, at man kan bruge await, så man kan vente på wake lock uden at blokere koden.
    // I if sætningerne kigger den på om wakeLock allerede er aktiv, hvis den er frigives den, og billedet ændres til "off"
    // 'Else' aktiveres wake lock, og billedet ændres til "on".
    // Try-catch bruges, hvis wake lock ikke kan aktiveres, for at finde fejlen
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
      // Tager fat i <li> tags inde i den div hvor instructions er gemt
      item.addEventListener("click", function () {
        // For hvert item tilføjes en eventlistener og en anonym funktion, da den kun skal bruges et sted
        this.classList.toggle("completed");
        // Når der bliver klikket på <li> element bliver klassen completed toggled on/off
        // Den gør at teksten bliver overstreget
      });
    });
  });
