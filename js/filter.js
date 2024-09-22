const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
const filter3 = document.querySelector(".filter3");
const visiblefilter1 = document.querySelector(".f1-visiblepart");
const visiblefilter2 = document.querySelector(".f2-visiblepart");
const visiblefilter3 = document.querySelector(".f3-visiblepart");
const filterArrow1 = document.getElementById("filterArrow1");
const filterArrow2 = document.getElementById("filterArrow2");
const filterArrow3 = document.getElementById("filterArrow3");

visiblefilter1.addEventListener("click", function () {
  filterArrow1.classList.toggle("rotate180");
  filter1.classList.toggle("open");
});

visiblefilter2.addEventListener("click", function () {
  filterArrow2.classList.toggle("rotate180");
  filter2.classList.toggle("open");
});

visiblefilter3.addEventListener("click", function () {
  filterArrow3.classList.toggle("rotate180");
  filter3.classList.toggle("open");
});

/* Recherche de recettes */
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector(".search-icon");
const searchClose = document.querySelector("#search-close");
const noResultsMessage = document.getElementById("no-results-message");

searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();
  if (value.length < 3) {
    recipesNumber(recipes);
    return;
  }

  if (value.length >= 3) {
    // Vérifie si l'utilisateur a entré au moins 3 caractères
    searchClose.style.display = "block";
    const searchRecipes = searchRecipesWithFunctional(value, recipes);

    if (searchRecipes.length === 0) {
      noResultsMessage.textContent = `Aucune recette ne contient '${searchInput.value}'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
      noResultsMessage.style.display = "block";
      recipesNumber([]);
      showCards([]);
    } else {
      showCards(searchRecipes);
      recipesNumber(searchRecipes);
    }
  } else if (value.length < 3) {
    searchClose.style.display = "none";
    showCards(recipes);
    recipesNumber(recipes);
  } else {
    showCards(recipes);
  }
  const searchRecipes = searchRecipesWithFunctional(value, recipes);
  const { allIngredients, allAppliances, allUstensils } =
    showAllFilters(searchRecipes);
  addIngredientsFiltersDOM(allIngredients);
  addAppliancesFiltersDOM(allAppliances);
  addUstensilsFiltersDOM(allUstensils);

  recipesNumber(searchRecipes);
  showCards(searchRecipes);
  updateAdvancedFilters(searchRecipes);
});

/* Fermer la recherche */
searchClose.addEventListener("click", function () {
  searchInput.value = "";
  searchClose.style.display = "none";
  showCards(recipes);
  recipesNumber(recipes);
  const { allIngredients, allAppliances, allUstensils } =
    showAllFilters(recipes);
  addIngredientsFiltersDOM(allIngredients);
  addAppliancesFiltersDOM(allAppliances);
  addUstensilsFiltersDOM(allUstensils);
});

/* Algorithme de recherche */
function searchRecipesWithFunctional(value, recipes) {
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(value)
      ) ||
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(value)
      ) ||
      recipe.appliance.toLowerCase().includes(value)
  );
}

/* Nombre de recettes */
function recipesNumber(recipes) {
  const recipesNumber = recipes.length;
  const recipesNumberText = document.querySelector("#number-recipes");
  recipesNumberText.textContent = `${recipesNumber} recettes`;
}

/* Filtrage de recettes */
const ingredientsFilter = document.querySelector(".f1-input");
const appliancesFilter = document.querySelector(".f2-input");
const ustensilsFilter = document.querySelector(".f3-input");

const ingredientsDiv = document.querySelector(".f1-list");
const appliancesDiv = document.querySelector(".f2-list");
const ustensilsDiv = document.querySelector(".f3-list");

/* Récupération de tous les filtres */
function showAllFilters(recipes) {
  const allIngredients = [];
  const allAppliances = [];
  const allUstensils = [];

  /* Récupération de tous les ingrédients, appareils et ustensiles */
  recipes.map((recipe) => {
    recipe.ingredients.map((ingredient) => {
      if (!allIngredients.includes(ingredient.ingredient)) {
        allIngredients.push(ingredient.ingredient);
      }
    });

    if (!allAppliances.includes(recipe.appliance)) {
      allAppliances.push(recipe.appliance);
    }

    if (recipe.ustensils) {
      recipe.ustensils.map((ustensil) => {
        if (!allUstensils.includes(ustensil)) {
          allUstensils.push(ustensil);
        }
      });
    }
  });

  return { allIngredients, allAppliances, allUstensils };
}

/* Filtres actifs */
const activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

/* Ajout des choix de filtrage dans le DOM */
function addIngredientsFiltersDOM(allIngredients) {
  const ingredientsList = document.createElement("ul");
  ingredientsList.classList.add("filter-list");

  allIngredients.map((ingredient) => {
    const ingredientLi = document.createElement("li");
    ingredientLi.textContent =
      ingredient.charAt(0).toUpperCase() + ingredient.slice(1);

    if (activeFilters.ingredients.includes(ingredient)) {
      ingredientLi.classList.add("active");
    }

    ingredientLi.addEventListener("click", function () {
      if (ingredientLi.classList.contains("active")) {
        ingredientLi.classList.remove("active");
      } else {
        ingredientLi.classList.add("active");
      }

      toggleFilter("ingredients", ingredient);
    });

    ingredientsList.appendChild(ingredientLi);
  });

  ingredientsDiv.innerHTML = "";
  ingredientsDiv.appendChild(ingredientsList);
}

function addAppliancesFiltersDOM(allAppliances) {
  const appliancesList = document.createElement("ul");
  appliancesList.classList.add("filter-list");

  allAppliances.map((appliance) => {
    const applianceLi = document.createElement("li");
    applianceLi.textContent =
      appliance.charAt(0).toUpperCase() + appliance.slice(1);
    if (activeFilters.appliances.includes(appliance)) {
      applianceLi.classList.add("active");
    }

    applianceLi.addEventListener("click", function () {
      applianceLi.classList.toggle("active");
      toggleFilter("appliances", appliance);
    });

    appliancesList.appendChild(applianceLi);
  });

  appliancesDiv.innerHTML = "";
  appliancesDiv.appendChild(appliancesList);
}

function addUstensilsFiltersDOM(allUstensils) {
  const ustensilsList = document.createElement("ul");
  ustensilsList.classList.add("filter-list");

  allUstensils.map((ustensil) => {
    const ustensilLi = document.createElement("li");
    ustensilLi.textContent =
      ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

    if (activeFilters.ustensils.includes(ustensil)) {
      ustensilLi.classList.add("active");
    }
    ustensilLi.addEventListener("click", function () {
      ustensilLi.classList.toggle("active");
      toggleFilter("ustensils", ustensil);
    });

    ustensilsList.appendChild(ustensilLi);
  });

  ustensilsDiv.innerHTML = "";
  ustensilsDiv.appendChild(ustensilsList);
}

function showActiveFilters() {
  const activeFiltersDiv = document.querySelector(".active-filters");
  activeFiltersDiv.innerHTML = "";

  for (const type in activeFilters) {
    activeFilters[type].map((filter) => {
      const filterDiv = document.createElement("div");
      filterDiv.classList.add("active-filter");
      filterDiv.textContent = filter;

      const closeIcon = document.createElement("i");
      closeIcon.textContent = "x";

      closeIcon.addEventListener("click", function () {
        // Retirer le filtre actif
        filterDiv.remove();

        // Retirer la classe .active de l'élément dans la liste des filtres
        const filterListItems = document.querySelectorAll(
          `.f${
            type === "ingredients" ? 1 : type === "appliances" ? 2 : 3
          }-list li`
        );

        // Retirer la classe .active de l'élément dans la liste des filtres
        filterListItems.forEach((item) => {
          if (item.textContent.toLowerCase() === filter.toLowerCase()) {
            item.classList.remove("active");
          }
        });

        toggleFilter(type, filter);
      });

      filterDiv.appendChild(closeIcon);
      activeFiltersDiv.appendChild(filterDiv);
    });
  }
}

/* Fonction pour ajouter ou retirer un filtre */
function toggleFilter(type, value) {
  const index = activeFilters[type].indexOf(value);

  if (index > -1) {
    // Si le filtre est déjà actif, on le retire
    activeFilters[type].splice(index, 1);
  } else {
    // Sinon, on l'ajoute
    activeFilters[type].push(value);
  }

  applyFilters();
}

/* Fonction pour appliquer les filtres actifs */
function applyFilters() {
  let filteredRecipes = searchRecipesWithFunctional(
    searchInput.value.toLowerCase(),
    recipes
  );

  if (activeFilters.ingredients.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      activeFilters.ingredients.every((ingredient) =>
        recipe.ingredients.some(
          (ing) => ing.ingredient.toLowerCase() === ingredient.toLowerCase()
        )
      )
    );
  }

  if (activeFilters.appliances.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      activeFilters.appliances.includes(recipe.appliance)
    );
  }

  if (activeFilters.ustensils.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      activeFilters.ustensils.every((ustensil) =>
        recipe.ustensils.includes(ustensil)
      )
    );
  }
  const { allIngredients, allAppliances, allUstensils } =
    showAllFilters(filteredRecipes);
  addIngredientsFiltersDOM(allIngredients);
  addAppliancesFiltersDOM(allAppliances);
  addUstensilsFiltersDOM(allUstensils);

  showCards(filteredRecipes);
  recipesNumber(filteredRecipes);
  showActiveFilters();
}

ingredientsFilter.addEventListener("input", function () {
  const value = ingredientsFilter.value.toLowerCase();

  const { allIngredients } = showAllFilters(recipes);

  const filteredIngredients = allIngredients.filter((ingredient) => {
    return ingredient.toLowerCase().includes(value);
  });

  addIngredientsFiltersDOM(filteredIngredients);
});

appliancesFilter.addEventListener("input", function () {
  const value = appliancesFilter.value.toLowerCase();

  const { allAppliances } = showAllFilters(recipes);

  const filteredAppliances = allAppliances.filter((appliance) => {
    return appliance.toLowerCase().includes(value);
  });

  addAppliancesFiltersDOM(filteredAppliances);
});

ustensilsFilter.addEventListener("input", function () {
  const value = ustensilsFilter.value.toLowerCase();

  const { allUstensils } = showAllFilters(recipes);

  const filteredUstensils = allUstensils.filter((ustensil) => {
    return ustensil.toLowerCase().includes(value);
  });

  addUstensilsFiltersDOM(filteredUstensils);
});

/* Supprimer le contenu dans le champ de recherche */
const filterClose = document.querySelector("#filter-close");

function setupFilterClear(inputElement, closeElement, filterFunction) {
  inputElement.addEventListener("input", function () {
    if (inputElement.value.length > 0) {
      closeElement.style.display = "block";
    } else {
      closeElement.style.display = "none";
    }
  });

  closeElement.addEventListener("click", function () {
    inputElement.value = "";
    closeElement.style.display = "none";
    filterFunction();
  });
}

function refreshIngredientsFilter() {
  const { allIngredients } = showAllFilters(recipes);
  addIngredientsFiltersDOM(allIngredients);
}

function refreshAppliancesFilter() {
  const { allAppliances } = showAllFilters(recipes);
  addAppliancesFiltersDOM(allAppliances);
}

function refreshUstensilsFilter() {
  const { allUstensils } = showAllFilters(recipes);
  addUstensilsFiltersDOM(allUstensils);
}

setupFilterClear(
  ingredientsFilter,
  document.querySelector("#ingredients-filter-close"),
  refreshIngredientsFilter
);
setupFilterClear(
  appliancesFilter,
  document.querySelector("#appliances-filter-close"),
  refreshAppliancesFilter
);
setupFilterClear(
  ustensilsFilter,
  document.querySelector("#ustensils-filter-close"),
  refreshUstensilsFilter
);

document.addEventListener("DOMContentLoaded", function () {
  recipesNumber(recipes);

  const { allIngredients, allAppliances, allUstensils } =
    showAllFilters(recipes);
  addIngredientsFiltersDOM(allIngredients);
  addAppliancesFiltersDOM(allAppliances);
  addUstensilsFiltersDOM(allUstensils);
  showCards(recipes);
});
