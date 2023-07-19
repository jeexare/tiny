document.addEventListener("DOMContentLoaded", function () {
    // Call the function to update the widths of 'bar-st' elements
    updateStBarsWidth();
    });
          
          function updateStBarsWidth() {
      // Get the elements with the class name 'bar-st'
      const stBars = document.getElementsByClassName("bar-st");
      if (stBars) {
        // Iterate through each element
        Array.from(stBars).forEach((stBar) => {
          const max = parseInt(stBar.getAttribute("max"));
          const act = parseInt(stBar.getAttribute("act"));
    
          // Calculate the width as a percentage
          const width = (act / max) * 100;
    
          // Set the width of the ':after' pseudo-element
          stBar.style.setProperty("--width", `${width}%`);
        });
      }
    }