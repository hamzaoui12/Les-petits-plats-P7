function showCards(recipes) {
  const cardsContainer = document.getElementById("cards-container");
  const noResultsMessage = document.getElementById("no-results-message");
  cardsContainer.innerHTML = "";
  noResultsMessage.style.display = "none";

  if (recipes.length === 0) {
    noResultsMessage.textContent = `Aucune recette ne contient << ${searchInput.value} >>.Vous pouvez chercher << tarte aux pommes >>, << poisson >>, etc.`;
    noResultsMessage.style.display = "block";
  } else {
    recipes.forEach((recipe, index) => {
      cardsContainer.appendChild(makeCard(recipe, index));
    });
  }
}

function makeCard(recipe, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = `card-${index + 1}`;

  const article = document.createElement("article");
  article.classList.add("card-article");

  const time = document.createElement("div");
  time.classList.add("card-time");
  time.textContent = `${recipe.time}min`;

  const img = document.createElement("img");
  img.src = `./images/Recettes/${recipe.image}`;
  img.alt = recipe.name;
  img.classList.add("card-img");

  const cardText = document.createElement("div");
  cardText.classList.add("card-text");

  const name = document.createElement("h1");
  name.textContent = recipe.name;

  const recipeTitle = document.createElement("h2");
  recipeTitle.textContent = "Recette";

  const description = document.createElement("div");
  description.classList.add("card-description");
  description.textContent = recipe.description;

  const ingredientsTitle = document.createElement("h2");
  ingredientsTitle.textContent = "Ingrédients";

  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("card-ingredients");

  recipe.ingredients.forEach((ingredient, i) => {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add(`ingredient${i + 1}`);

    const ingredientName = document.createElement("p");
    ingredientName.classList.add("ingredient-name");
    ingredientName.textContent = ingredient.ingredient;

    const ingredientQty = document.createElement("p");
    ingredientQty.classList.add("ingredient-qty");
    ingredientQty.textContent = `${ingredient.quantity || "-"} ${
      ingredient.unit || ""
    }`;

    ingredientDiv.appendChild(ingredientName);
    ingredientDiv.appendChild(ingredientQty);
    ingredientsList.appendChild(ingredientDiv);
  });

  cardText.append(
    name,
    recipeTitle,
    description,
    ingredientsTitle,
    ingredientsList
  );

  article.append(img, time, cardText);
  card.appendChild(article);

  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  const { allIngredients, allAppliances, allUstensils } =
    showAllFilters(recipes);
  addIngredientsFiltersDOM(allIngredients);
  addAppliancesFiltersDOM(allAppliances);
  addUstensilsFiltersDOM(allUstensils);
  showCards(recipes);
  recipesNumber(recipes);
});
