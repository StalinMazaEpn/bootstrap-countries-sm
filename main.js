const getCountries = async () => {
  const response = await fetch(`./countries.json`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Unable to get countries");
  }
};

/**
 * Sort an array of data by a single property and return data ordered ascending [ASC (A-Z ó 0-9)].
 * If you need the order to be descending [DESC (Z-A ó 9-0)] add a dash at the start of the word.
 * @param {string} property - property to use to sort data
 */
function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (paramA, paramB) {
    let sortResult = null;
    let valueOne = paramA[property];
    let valueTwo = paramB[property];

    if (valueOne == null && valueTwo != null) {
      sortResult = -1;
    } else if (valueOne != null && valueTwo == null) {
      sortResult = 1;
    } else if (valueOne == null && valueTwo == null) {
      sortResult = 0;
    } else if (typeof valueOne === "string" && typeof valueTwo === "string") {
      sortResult = valueOne.localeCompare(valueTwo);
    } else {
      sortResult = valueOne < valueTwo ? -1 : valueOne > valueTwo ? 1 : 0;
    }

    return sortResult * sortOrder;
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  const countriesListFlags = document.getElementById("countriesListFlags");
  let countries = await getCountries();

  if (countries.length > 0) {
    countries = countries.sort(dynamicSort("nameES"));
  }
  for (var i = 0; i < countries.length; i++) {
    const country = countries[i];
    var col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 countryFlagIconWrapper";

    var blockEl = document.createElement("span");
    blockEl.className = "countryFlagIcon " + country.flatCode;

    var blockText = document.createElement("span");
    blockText.textContent = country.nameES;

    col.appendChild(blockEl);
    col.appendChild(blockText);
    countriesListFlags.appendChild(col);
  }
});
