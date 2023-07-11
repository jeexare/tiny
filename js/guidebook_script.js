/******************************
           GUIDEBOOK
*******************************/
document.addEventListener("DOMContentLoaded", () => {
    // Get the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tabButtonId = urlParams.get("tabButtonId");
  
    // If the URL parameter exists
    if (tabButtonId) {
      // Find the corresponding tab button element based on the href value
      const tabButton = document.querySelector(`.data-tab[href="${tabButtonId}"]`);
  
      // If the tab button element exists, trigger a click event on it
      if (tabButton) {
        tabButton.click();
      }
    }
  });
  
  document.addEventListener("click", (e) => {
    const tabButton = e.target.closest(".data-tab");
    if (!tabButton) return;
  
    const tabName = tabButton.getAttribute("data-tab");
    const tab = document.querySelector(`.gb-tab[data-tab="${tabName}"]`);
    const activeTab = document.querySelector(`.data-tab[data-tab="${tabName}"]`);
  
    if (!tab || !activeTab) return;
  
    document
      .querySelectorAll(".gb-tab")
      .forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
  
    document
      .querySelectorAll(".data-tab")
      .forEach((activeTab) => activeTab.classList.remove("active"));
    activeTab.classList.add("active");
  
    var titleElement = document.querySelector('.gb-titt');
    titleElement.textContent = tabName;
  
    // Get the href value of the tab button
    const hrefValue = tabButton.getAttribute("href");
  
    // Update the URL with the tabButtonId parameter
    history.replaceState(null, null, `?tabButtonId=${hrefValue}`);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const modeSwitch = document.getElementById("gb-hide");
    const myGuidebook = document.querySelector(".guide-book");
  
    modeSwitch.addEventListener("click", (e) => {
      if (myGuidebook.classList.contains("hidden")) {
        myGuidebook.classList.remove("hidden");
      } else {
        myGuidebook.classList.add("hidden");
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const buttonLeft = document.getElementById("gb-left");
    const buttonRight = document.getElementById("gb-right");
  
    // Add click event listener to gb-left
    buttonLeft.addEventListener('click', function() {
      let activeTab = document.querySelector('.data-tab.active');
    let prevTab = activeTab.previousElementSibling;
    if (prevTab && prevTab.classList.contains('data-tab')) {
      prevTab.click();
    }
  });
  
  // Add click event listener to gb-right
  buttonRight.addEventListener('click', function() {
    let activeTab = document.querySelector('.data-tab.active');
    let nextTab = activeTab.nextElementSibling;
    if (nextTab && nextTab.classList.contains('data-tab')) {
      nextTab.click();
    }
  });
  
  });