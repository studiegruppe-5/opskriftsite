let listContainer = document.querySelector(".recipes-container");
// Opretter en variabel (listContainer), der tager fat i den div som indholdet senere skal lægges ind i
const selectElement = document.querySelector("#selectElement");
// Opretter en variabel (selectElement), der tager fat i det <select> tag, hvor koden til filtrering skal lægges ind i

const categories = {
  Dessert: ["Smoothie", "Tiramisu", "Cookies", "Mango", "Cocktail", "Matcha ice cream"],
  Vegetarian: ["Pizza", "Vegetarian", "Bruschetta", "Caprese", "Saag", "Tagine", "Elote", "Borscht", "Dosa", "Falafel"],
};
// Opretter et objekt (categories), der indeholder nøgler med arrays, som skal bruges til filtrering

let allRecipes = [];
// Opretter en variabel (allRecipes) og gemmer et tomt array, der senere skal bruges

fetch(`https://dummyjson.com/recipes`)
  // Bruger fetch til at hente data fra API'et og .then for at konvertere response til JSON

  .then((response) => response.json())
  // .then for at konvertere response til JSON

  .then((data) => {
    // Bruger .then for at gå igennem alt dataen i JSON filen

    allRecipes = data.recipes;
    // Hver enkelt opskrift gemmes i variablen allRecipes
    applyFilterFromURL(); // Kalder en funktion der filtrerer opskrifterne ud fra forskellige kategorier
  });

// Nedenfor tager funktionen showAllRecipes fat i data fra JSON filen
// Variablen markup oprettes hvori der med .map bliver gemt hver enkel opskrift i data
// Med ${recipe.xxxx} tages der fat i variablen recipe, som indeholder data for hvert enkel opskrift i JSON filen
// .join("") bruges til at samle indholdet uden ekstra mellemrum/tegn og sætter det sammen til en streng
// Til sidst bliver  markup variablens indhold puttet ind i listContainer variablen
function showAllRecipes(data) {
  const markup = data
    .map(
      (recipe) =>
        `
      <div class="recipe">
        <a href="recipe.html?id=${recipe.id}">
          <img src="${recipe.image}" alt="${recipe.name}" />
          <h4>${recipe.name}</h4>
        </a>
      </div>
      `
    )
    .join("");

  listContainer.innerHTML = markup;
}

// I funktionen nedenfor filtreres der i opskrifterne
// Funktionen tager argumentet 'value', som er værdien af vores <option> tag i vores filter (fx all, Italian, Dessert osv.)
//
function filterRecipes(value) {
  if (!value) return; // Hvis 'value' er null, undefined eller falsy, afslut funktionen tidligt

  if (value === "all") {
    // Hvis 'value' er 'all', vis alle opskrifter
    showAllRecipes(allRecipes);
    return; // Stop funktionen
  }

  let validTags = []; // Opretter en tom array til at gemme de tags der er gyldige

  if (categories[value]) {
    // Hvis 'value' findes som en kategori i 'categories' objektet
    validTags = categories[value].map((tag) => tag.toLowerCase()); // Hent tags for den kategori og lav dem om til små bogstaver
  } else if (typeof value === "string") {
    // Hvis 'value' er en streng
    validTags = [value.toLowerCase()]; // Brug 'value' som eneste gyldige tag og gør det småt
  } else {
    // Hvis 'value' ikke er en gyldig kategori eller en streng
    console.error("Filterværdi er ikke en string:", value); // Log en fejl til konsollen
    return;
  }

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (!recipe.tags || !Array.isArray(recipe.tags)) return false; // Sikrer, at opskriften har en 'tags' egenskab og at det er et array
    return recipe.tags.some((tag) => validTags.includes(tag.toLowerCase())); // Tjekker, om opskriftens tags indeholder mindst ét af de gyldige tags (ignorerer store/små bogstaver)
  });

  showAllRecipes(filteredRecipes); // Kør funktionen, der viser de filtrerede opskrifter på siden
}

// Lytter efter ændringer i select-boksen med eventlistener på "click" - event der sendes med som argument indeholder oplysninger om den hændelse der fandt sted altså klikket
selectElement.addEventListener("change", (event) => {
  // event.target henviser til det element der udløste begivenheden (selectElement, <select>) og ved at bruge .value kan man tage fat i den værdi brugeren har valgt (fx all, italian, indian osv.) - dette gemmes i en ny variabel
  const selectedValue = event.target.value;
  // Kør filterRecipes funktionen med den værdi brugeren har valgt som argument. Det vil sige: vis den side der hører til den value brugeren har valgt
  filterRecipes(selectedValue);
  // Opdaterer URL'en, så brugeren kan dele den filtrerede visning og så man kan klikke en på en specifik filtrering fra index > meu
  window.history.pushState({}, "", `?filter=${selectedValue}`);
});

// Læs URL-parametre og filtrer ved første load
function applyFilterFromURL() {
  // Opretter et URLSearchParams objekt, så man kan hente parametre fra URL'en
  const urlParams = new URLSearchParams(window.location.search);
  // Opretter ny variabel hvori filterparameteren fra URL'en bliver gemt
  let filterParam = urlParams.get("filter");

  if (filterParam) {
    // Hvis der er et filter i URL'en
    // Normaliserer værdien ved at sikre, at første bogstav er stort, og resten småt
    filterParam = filterParam.charAt(0).toUpperCase() + filterParam.slice(1).toLowerCase();

    // Opretter ny variabel der gemmer de værdier der svarer til en gyldig option i selectElement (<select>)
    // [...] bruges til at konvertere et HTMLCollection objekt (selectElement.options) om til et rigtigt array, så man kan bruge array metoder (fx .map, .filter) i dette tilfælde .some
    // .some() tjekker om mindst en af elementernes værdi matcher filterParam altså det der står i URL'en
    // I arrow funktionen tjekkes om hvert enkelt elements (opt) værdi (opt.value) matcher filterParam
    const validOption = [...selectElement.options].some((opt) => opt.value === filterParam);

    if (validOption) {
      selectElement.value = filterParam; // Hvis værdien på option matcher filterParam - kør filterRecipes funktionen med filterParam som argument
      filterRecipes(filterParam);
    } else {
      console.warn("Ugyldigt filter:", filterParam);
      selectElement.value = "all"; // Hvis filteret er ugyldigt, sæt værdien til "all"
      showAllRecipes(allRecipes); // Vis alle opskrifter
    }
  } else {
    selectElement.value = "all"; // Hvis der ikke er noget filter i URL'en, sæt værdien til "all"
    showAllRecipes(allRecipes); // Vis alle opskrifter
  }
}
