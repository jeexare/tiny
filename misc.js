document.addEventListener("DOMContentLoaded", function () {
  /******************************
           BARRAS DE STATS
    *******************************/

  // Get the elements with the class name 'bar-st'
  const st_bars = document.getElementsByClassName("bar-st");
  if (st_bars) {
    // Iterate through each element
    Array.from(st_bars).forEach((st_bar) => {
      const max = parseInt(st_bar.getAttribute("max"));
      const act = parseInt(st_bar.getAttribute("act"));

      // Calculate the width as a percentage
      const width = (act / max) * 100;

      // Set the width of the ':after' pseudo-element
      st_bar.style.setProperty("--width", `${width}%`);
    });
  }
});

/******************************
           MEMBERLIST
    *******************************/
document.addEventListener("click", (e) => {
  // Filter button only
  const filterButton = e.target.closest(".sort-pad span");
  if (!filterButton) return; // If it's null/empty return

  // Group of filter button only
  const groupName = filterButton.getAttribute("data-group");
  if (!groupName) return; // If it's null/empty return

  // Items with groupName
  const groupNameItems = document.querySelectorAll(
    `.sort-pad span[data-group="${groupName}"]`
  );
  if (!groupNameItems) return; // If it's null/empty return

  // List of items
  const items = document.querySelectorAll(".ml-user");
  if (!items) return; // If it's null/empty return

  // Loop through all button with groupName
  for (let i = 0; i < groupNameItems.length; i++) {
    // If current button contains "active" and is the filterButton return
    if (
      groupNameItems[i].classList.contains("active") &&
      groupNameItems[i] === filterButton
    )
      return;
    // If current button contains "active" remove it
    else if (groupNameItems[i].classList.contains("active"))
      groupNameItems[i].classList.remove("active");
    // If current button doesn't contain active and is the filterButton, add it
    else if (
      !groupNameItems[i].classList.contains("active") &&
      groupNameItems[i] === filterButton
    ) {
      groupNameItems[i].classList.add("active");
    }
  }

  // List of filters with "active"
  const activeFilters = document.querySelectorAll(".sort-pad span.active");
  if (!activeFilters) return; // If it's null/empty return

  // List of active buttons data-filter
  const activeList = Array.from(activeFilters, (filter) => {
    const filterValue = filter.getAttribute("data-filter");
    if (filterValue === groupNameItems[0].getAttribute("data-filter")) {
      return undefined;
    } else {
      return filterValue;
    }
  }).filter((value) => value !== undefined);

  if (!activeList) return; // If it's null/empty return

  // Remove "hide" from items that are in activeList
  for (let i = 0; i < items.length; i++) {
    activeList.forEach((name) => {
      if (items[i].classList.contains(name)) removeClass(items[i], "hide");
    });
  }
  // Add "hide" to items that's not in activeList
  for (let i = 0; i < items.length; i++) {
    activeList.forEach((name) => {
      if (!items[i].classList.contains(name)) addClass(items[i], "hide");
    });
  }

  // If activeList is empty, remove hide from everything
  if (activeList.length === 0)
    for (let i = 0; i < items.length; i++) {
      removeClass(items[i], "hide");
    }

  console.log(activeList);
});

// Show filtered elements
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

/******************************
           GUIDEBOOK
*******************************/
document.addEventListener("click", (e) => {
      const tabButton = e.target.closest(".data-tab"); // Fetches the closest ancestor element with the class "scene-button" to the mouseover target
      if (!tabButton) return; // If sceneButton does not exist, return
  
      const tabName = tabButton.getAttribute("data-tab"); // Fetches the data-name attribute value of the sceneButton
  
      if (!tabName) return; // If sceneName does not exist, return
  
      const tab = document.querySelector(`.gb-tab[data-tab="${tabName}"]`); // Fetches the scene element with the corresponding data-name attribute value
  
      if (!tab) return; // If scene does not exist, return
  
      const activeTab = document.querySelector(
        `.data-tab[data-tab="${tabName}"]`
      ); // Fetches the active scene button element with the corresponding data-name attribute value
  
      if (!activeTab) return; // If activeScene does not exist, return
  
      document
        .querySelectorAll(".gb-tab")
        .forEach((tab) => tab.classList.remove("active")); // Removes the "active" class from all scene elements
  
      tab.classList.add("active"); // Adds the "active" class to the scene element
  
      document
        .querySelectorAll(".data-tab")
        .forEach((activeTab) => activeTab.classList.remove("active")); // Removes the "active" class from all scene buttons
  
      activeTab.classList.add("active"); // Adds the "active" class to the activeScene button
});
  
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ontab").click();
});