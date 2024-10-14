const API_KEY = "916d4c55472044eb9c6262e6726541db";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");
        
        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";

        const recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerHTML = recipe.title;

        const recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `
            <strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}
        `;

        const recipeLinkEl = document.createElement("a"); // Assuming you want a link
        // Set attributes for the link if needed
        recipeLinkEl.href = recipe.sourceUrl; // Example link
        recipeLinkEl.innerText = "View Recipe"; // Open in a new tab

        recipeLinkEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);
        recipeListEl.appendChild(recipeItemEl);
    });
}

async function getRecipes() {
    const response = await fetch(
        `https://api.spooncular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );

    const data = await response.json();

    return data.recipes;
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();