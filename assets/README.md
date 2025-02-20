# Teknisk dokumentation for Tema 7 gruppeprojekt

Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:

Beslut, hvordan I vil organisere jeres projekt – struktur for mapper og filer.

- Hvordan organiserer I billeder, fonte og andre ressourcer?
- Vi organiserer i mapper. Fonte, billeder, logo osv. Ligger inde i assets-mappen. Så vores sti ender med at hedde: assets/fonts/--- eller assets/imgs/---

- Hvor placerer I boilerplate?(fx CSS- og JavaScript-filer, der bruges på tværs af projektet)

  - I assets, de hedder base.css og base.js

- Hvor placerer I HTML, CSS- og JavaScript-filer til fx detaljevisning og listevisning?
  - HTML filerne ligger i roden. CSS/JS får hver deres mappe, med en fil der hører til hver HTML fil.

## Navngivning:

Beslutte hvordan i vil navngive filer og mapper for at sikre en ensartet struktur og undgå forvirring.

- Hvordan navngiver I filnavne? (fx små bogstaver, ingen mellemrum, brug af - eller \_)

  - små bogstaver
  - index.html - korte og kontante navne til de andre sider
  - vi navngiver ALT på engelsk, css klasser, funktionsnavne, og html filer
  - vi bruger \_ som mellemrum

- Hvordan sikre I at det er til at forstå hvilke HTML-, CSS- og JavaScript-filer der høre sammen?
  - navnene er gennemgående i de tre filtyper f.eks. Opskriftside.html, opskriftside.css, opskriftside.js

## Link til scripts:

- Hvor placerer I script referencer i HTML'en? (fx i <head> med defer attribute, eller sidst i <body>)
  - vi placerer den i head, HUSK ‘defer’!

## Git branches:

- Hvordan navngiver I branches, så alle kan forstår hvem der arbejder i branchen og på hvad?(fx feature-lotte-formular)
  - feature_xxxx_navn
  - xxxx = den specifikke detalje du arbejder på f.eks. Nyhedsbrev, fremgangsmåde, kategori

## Arbejdsflow:

- Hvordan fordeler I arbejdet, så I undgår at flere arbejder i de samme filer samtidigt?

  - alle får en individuel html side + tilhørende css og js
  - der SKAL kommunikeres inden man går ind i de andres OG hvis man ændrer i base !VIGTIGT!!

- Hvordan sikrer I, at commit-beskeder er beskrivende?

  - vi skriver i nutid
  - f.eks. “Adds xx element to the header”

- Hvordan kommunikerer i om ændringer i main branchen når feature merges?
  - vi merger aldrig alene
  - vi skal være sikre på at vi merger det rigtige, så derfor skal vi snakke sammen, inden vi merger

## Kode:

- Hvordan skriver i funktioner i JavaScript?(fx med function keyword eller som arrow functions)

  - arrow functions (spørg chat om simpel forklaring, hvis man ikke kan huske hvordan)

- Beslut hvilken CSS selector i benyttes til referener i henholdsvis CSS og JavaScript(fx. id'er til JavaScript og Classes til CSS)

  - vi bruger classes udover når Id er nødvendigt

- Skal filer have korte forklaringer som kommentarer?
  - der hvor det er nødvendigt, så en ny bruger vil kunne forstå koden

# Funktionalitet

Dette afsnit skal forklare, hvad I konkret har arbejdet med, for at udvikle websitet. Tænk over hvilke interaktioner brugeren kan foretage på sitet? Eller hvordan websitet håndterer og præsenterer data? Eksempler på funktionalitet, der kan beskrives:

- Hentning af produkter fra API.
  Vi bruger fetch til at hente data fra API'et og .then for at konvertere Response til JSON. Derefter bruger vi .then igen for at gå igennem alt dataen i JSON filen. Hver enkelt opskrift gemmes i en variabel som bliver brugt til at tilgå de forskellige nøgler og værdier i opskriften.

- Filtrering af produkter baseret på brugerens valg
  For at få styr på filtering har vi brugt en funktion der tager value som argument. Value er værdien af det <option> tag der ligger i vores drop down menu. Inde i menuen er der en masse if-sætninger der gør, at det kun er bestemte ting der vises når value har en bestemt værdi. Eksempler på if-sætninger: - En der siger, at hvis value er “all” skal den køre vores funktion, der viser alle opskrifter. - En af de andre siger at den skal kigge i en en variabel vi har oprettet med kategorier og se om den value den har, findes som en kategori. Dette gemmes i en variabel, som bliver brugt længere ned i en anden funktion. Den funktion filtrerer alle opskrifter og sørger for, at det kun er opskrifter, der indeholder et gyldigt tag der bliver vist på siden.

Udover det har vi også tilføjet en eventlistener på vores <select> tag (.selectElement), som lytter på når der bliver klikket og dermed skiftet kategori. Ud fra dette skal den kører den funktion der filtrerer, med den valgte kategori som argument.

- Dynamisk visning af produkter i HTML.
  Ved at tage fat i API'et og konvertere til JSON kan vi med ${} tage fat i den variabel vi har gemt alle opskrifter i og bruge "." til at fange de forskellige nøgler der er i hvert objekt så f.eks. ${recipe.name}. På den måde får man det navn der passer til en specifik
  opskrift

- Formular til at tilføje et element til hjemmesiden
  Formularen har vi lavet med <form> tag og inde i den har vi lavet forskellige labels der har noget at gøre med opskrift. F.eks. recipe name, cooking time, servings, ingredients og instructions.

# API endpoints

Dette afsnit skal liste de endpoints fra API'et i har benyttet:

- (`https://dummyjson.com/recipes?limit=50`)

# Dokumentation af Funktion

Dette afsnit skal beskrive en funktion I selv har udviklet. Det kunne eksempelvis være en funktion der generere en listen over fx. produkter:

- Beskrivelse: Hvad gør funktionen? Hvordan spiller den sammen med resten af koden?
- Parametre: Hvilke input forventes (fx en værdi fra en dropdown eller URL'en)?
- Returnerer: Beskriv, om funktionen returnerer en værdi eller blot manipulerer DOM’en.
- Eksempel på brug: Indsæt funktions-koden herunder(der hvor koden er i eksemplet) og vis, hvordan funktionen kaldes:

  Nedenfor tager funktionen showAllRecipes fat i data fra JSON filen. Variablen markup oprettes hvori der med .map bliver gemt hver enkel opskrift i data. Med ${recipe.xxxx} tages der fat i variablen recipe, som indeholder data for hvert enkel opskrift i JSON filen. .join("") bruges til at samle indholdet uden ekstra mellemrum/tegn og sætter det sammen til en streng. Til sidst bliver markup variablens indhold puttet ind i listContainer variablen

```javascript
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
```
