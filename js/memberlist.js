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
  
    // Populate the rootVars object with color properties
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
  
    mlUsers.forEach(function(mlUser) {
      // GRUPO
      var postuserElement = mlUser.querySelector(".ml-info strong");
      var newSpanElement = postuserElement.querySelector('span');
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
      var userLink = mlUser.querySelector('.ml-links a').getAttribute('href');
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
          if (nivelContent !== null) {
            for (var nivel in sortPorNivel) {
              if (nivel.toLowerCase() === nivelContent.toLowerCase()) {
                mlUser.classList.add(sortPorNivel[nivel]);
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
    });
  
    document.addEventListener("click", function(e) {
      var filterButton = e.target.closest(".sort-pad span");
      if (!filterButton) return;
  
      var groupName = filterButton.getAttribute("data-group");
      if (!groupName) return;
  
      var groupNameItems = document.querySelectorAll(`.sort-pad span[data-group="${groupName}"]`);
      if (!groupNameItems) return;
  
      var items = document.querySelectorAll(".ml-user");
      if (!items) return;
  
      groupNameItems.forEach(function(button) {
        if (button.classList.contains("active") && button === filterButton) return;
        else if (button.classList.contains("active")) button.classList.remove("active");
        else if (!button.classList.contains("active") && button === filterButton) {
          button.classList.add("active");
        }
      });
  
      var activeFilters = document.querySelectorAll(".sort-pad span.active");
      if (!activeFilters) return;
  
      var activeList = Array.from(activeFilters, function(filter) {
        var filterValue = filter.getAttribute("data-filter");
        if (filterValue === groupNameItems[0].getAttribute("data-filter")) {
          return undefined;
        } else {
          return filterValue;
        }
      }).filter(function(value) {
        return value !== undefined;
      });
  
      if (!activeList) return;
  
      items.forEach(function(item) {
        activeList.forEach(function(name) {
          if (item.classList.contains(name)) removeClass(item, "hide");
          else addClass(item, "hide");
        });
      });
  
      if (activeList.length === 0) {
        items.forEach(function(item) {
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
  