document.addEventListener("DOMContentLoaded", function () {
  var mlUsers = document.querySelectorAll(".ml-user");

  var rootVars = {};
  var rootStyles = getComputedStyle(document.documentElement);
  var colorProperties = [
    "--staff",
    "--vortex",
    "--watchmen",
    "--pacers",
    "--menders",
    "--inactivos",
  ];
  // Populate the rootVars object with color properties
  colorProperties.forEach(function (property) {
    var colorValue = rootStyles.getPropertyValue(property).trim();
    var groupName = property.slice(2); // Extract the group name from the property name
    rootVars[colorValue] = groupName;
  });

  var sortPorNivel = {
    I: "nivel1",
    II: "nivel2",
    III: "nivel3",
    IV: "nivel4",
    V: "nivel5",
  };

  mlUsers.forEach(function (mlUser) {
    // GRUPO
    var postuserElement = mlUser.querySelector(".ml-info strong");
    var newSpanElement = postuserElement.querySelector("span");
    if (newSpanElement) {
      var newSpanStyle = newSpanElement.getAttribute("style");
      var newSpanColor = newSpanStyle.split(":")[1].trim().toLowerCase();

      for (var color in rootVars) {
        if (color.toLowerCase() === newSpanColor) {
          mlUser.classList.add(rootVars[color]);
          break;
        }
      }
    }

    // NIVEL
    var userLink = mlUser.querySelector(".ml-links a").getAttribute("href");
    fetch(userLink)
      .then((response) => response.text())
      .then((html) => {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = html;

        var simpLabels = newDiv.querySelectorAll(".simpfield .simplabel span");
        simpLabels.forEach(function (label) {
          var parentField = label.closest(".simpfield");
          var labelText = label.textContent.trim();
          var className = labelText
            .split(" ")[0]
            .toLowerCase()
            .replace(/'/g, "")
            .replace(/\(|\)/g, "");
          parentField.classList.add(className);
        });

        var nivelContent = newDiv.querySelector(
          ".stage .simpcontent .field_uneditable"
        ).textContent;
        if (nivelContent !== null) {
          for (var nivel in sortPorNivel) {
            if (nivel.toLowerCase() === nivelContent.toLowerCase()) {
              mlUser.classList.add(sortPorNivel[nivel]);
              break;
            }
          }
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    // MP
    var imgMP = mlUser.querySelector('img[src*="icon_contact_pm.png"]');
    if (imgMP) {
      var linkMP = imgMP.parentNode;
      linkMP.innerHTML = '<i class="fas fa-inbox"></i>';
    }

    // Ficha
    var imgFicha = mlUser.querySelector('img[src*="icon_contact_www.gif"]');
    if (imgFicha) {
      var linkFicha = imgFicha.parentNode;
      linkFicha.innerHTML = '<i class="fas fa-id-card"></i>';
    }
  });

  document.addEventListener("click", function (e) {
    // Grabs the current Button pressed
    var filterButton = e.target.closest(".sort-pad span");
    if (!filterButton) return;

    // Grabs the Button's data-group atrribute
    var groupName = filterButton.getAttribute("data-group");
    if (!groupName) return;

    // Grabs all the buttons with the same data-group as Button
    var groupNameItems = document.querySelectorAll(
      `.sort-pad span[data-group="${groupName}"]`
    );
    if (!groupNameItems) return;

    // Grabs all the users
    var items = document.querySelectorAll(".ml-user");
    if (!items) return;

    // Goes through all the buttons with the same data-group as Button
    groupNameItems.forEach(function (button) {
      if (button.classList.contains("active") && button === filterButton)
        return; //  If the button is active and is Button, go to the next iteration of the loop
      else if (button.classList.contains("active"))
        button.classList.remove(
          "active"
        ); // If the button is active and is not Button, remove .active from it
      else if (
        !button.classList.contains("active") &&
        button === filterButton
      ) {
        // If the  button is not active and is Button, add .active to it
        button.classList.add("active");
      }
    });

    // Grabs all the buttons with .active
    var activeFilters = document.querySelectorAll(".sort-pad span.active");
    if (!activeFilters) return;

    // Makes a list of all the buttons that are currently active
    var activeList = Array.from(activeFilters, function (filter) {
      var filterValue = filter.getAttribute("data-filter"); // Grabs the data-filter of the button
      if (filterValue === groupNameItems[0].getAttribute("data-filter")) {
        // Checks if the data-filter is the same as the one of the first element in the group ('todos')
        return undefined; // If  it is, return undefined
      } else {
        return filterValue; // If it isn't then return the filterValue
      }
    }).filter(function (value) {
      // When the  list is done making, only return the values that are not undefined
      return value !== undefined;
    });

    // If the list is not created, do nothing
    if (!activeList) return;

    // Log the list to the console
    console.log(activeList);

    items.forEach(function (item) {
      activeList.forEach(function (name) {
        if (item.classList.contains(name))
          removeClass(
            item,
            "hide"
          ); //  If the member has a filter on the list, remove hide
        else addClass(item, "hide"); //  If the member doesn't have a filter on the list, remove hide
      });
    });

    // For each member
    items.forEach(function (item) {
      if (
        activeList.every(function (name) {
          // If every active filter is present in the item's class list
          return item.classList.contains(name);
        })
      ) {
        removeClass(item, "hide"); // Remove the "hide" class
      } else {
        addClass(item, "hide"); // Add the "hide" class
      }
    });

    // If the list is empty, show  all items
    if (activeList.length === 0) {
      items.forEach(function (item) {
        removeClass(item, "hide");
      });
    }
  });

  function addClass(element, name) {
    var classes = element.className.split(" ");
    if (classes.indexOf(name) === -1) {
      element.className += " " + name;
    }
  }

  function removeClass(element, name) {
    var classes = element.className.split(" ");
    while (classes.indexOf(name) !== -1) {
      classes.splice(classes.indexOf(name), 1);
    }
    element.className = classes.join(" ");
  }
});
