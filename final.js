function process() {
    var searchTerm = document.getElementById("findbox").value.trim(); // Trim spaces
    document.getElementById("findbox").value = ""; // Clear the search box
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;

    // Clear previous results (Rule 6)
    var container = document.getElementById("container");
    container.textContent = "";

    if (!searchTerm) {
        // Handle empty input
        container.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                display(data.meals);
            } else {
                // Handle the case when no meals are found
                container.innerHTML = "<p>No meals found. Try a different search term.</p>";
            }
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            container.innerHTML = "<p>Failed to fetch meals. Please try again later.</p>";
        });
}

function display(items) {
    var container = document.getElementById("container");
    container.textContent = ""; // Clear previous results

    var maxToShow = 5;

    // Display first 5 meals
    for (var i = 0; i < Math.min(items.length, maxToShow); i++) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = `
            Meal ID: <b>${items[i].idMeal}</b> <br> 
            Meal Title: <b>${items[i].strMeal}</b><br>
            <img src="${items[i].strMealThumb}" alt="${items[i].strMeal}" width="200"><br>
            <b>Cooking Instruction:</b> ${items[i].strInstructions}<br><br>`;
        newDiv.classList.add("innerStyle");
        container.appendChild(newDiv);
    }

    // Add "Show More" button if more than 5 meals
    if (items.length > maxToShow) {
        var showMoreButton = document.createElement("button");
        showMoreButton.textContent = "Show More";
        showMoreButton.className = "btn btn-secondary mt-3";

        // Event listener for showing the remaining meals
        showMoreButton.onclick = function () {
            for (var j = maxToShow; j < items.length; j++) {
                var newDiv = document.createElement("div");
                newDiv.innerHTML = `
                    Meal ID: <b>${items[j].idMeal}</b> <br> 
                    Meal Title: <b>${items[j].strMeal}</b><br>
                    <img src="${items[j].strMealThumb}" alt="${items[j].strMeal}" width="200"><br>
                    <b>Cooking Instruction:</b> ${items[j].strInstructions}<br><br>`;
                newDiv.classList.add("innerStyle");
                container.appendChild(newDiv);
            }
            // Hide "Show More" button after all meals are displayed
            showMoreButton.style.display = "none";
        };

        container.appendChild(showMoreButton);
    }
}
