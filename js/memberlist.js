document.addEventListener('DOMContentLoaded', function() {
    var mlUsers = document.querySelectorAll('.ml-user');
  
    var rootVars = {};
  
    var rootStyles = getComputedStyle(document.documentElement);
    var colorProperties = [
      "--staff",
      "--vortex",
      "--watchmen",
      "--pacers",
      "--menders",
      "--inactivos"
    ];
  
    // Iterate through the color properties and populate the rootVars object
    colorProperties.forEach(function(property) {
      var colorValue = rootStyles.getPropertyValue(property).trim();
      var groupName = property.slice(2); // Extract the group name from the property name
      rootVars[colorValue] = groupName;
    });
  
    var sortPorNivel = {
      "I": 'nivel1',
      "II": 'nivel2',
      "III": 'nivel3',
      "IV": 'nivel4',
      "V": 'nivel5',
    };
  
    for (var k = 0; k < mlUsers.length; k++) {
      (function(mlUser) {
        // GRUPO
        var postuserElement = mlUser.querySelector(".ml-info strong");
        var newSpanElement = postuserElement.querySelector('span');
        if (newSpanElement !== null) {
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
        var userLink = mlUser.querySelector('.ml-links a').getAttribute('href');
        console.log(userLink);
        fetch(userLink)
          .then(response => response.text())
          .then(html => {
            var newDiv = document.createElement('div');
            newDiv.innerHTML = html;
  
            var simpLabels = newDiv.querySelectorAll('.simpfield .simplabel span');
            simpLabels.forEach(function(label) {
              var parentField = label.closest('.simpfield');
              var labelText = label.textContent.trim();
              var className = labelText.split(" ")[0].toLowerCase().replace(/'/g, "").replace(/\(|\)/g, "");
              parentField.classList.add(className);
            });
  
            var nivelContent = newDiv.querySelector('.nivel .simpcontent .field_uneditable').textContent;
            console.log(nivelContent);
            if (nivelContent !== null) {
              for (var nivel in sortPorNivel) {
                if (nivel.toLowerCase() === nivelContent.toLowerCase()) {
                  mlUser.classList.add(sortPorNivel[nivel]);
                  console.log(mlUser + " " + nivel);
                  break;
                }
              }
            }
          })
          .catch(error => {
            console.log('Error:', error);
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
      })(mlUsers[k]);
    }
  });
  
  
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