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
      // Grab all skilltrees
      skillTrees();
      
      function skillTrees() {
      const skillTrees = document.querySelectorAll(".skilltree");
    if (!skillTrees) return;
      // Loop each skill tree
      skillTrees.forEach((element) => {
        // Get skills
        const skills = element.querySelectorAll(".skill");
        // Loop each skill
        skills.forEach((skill) => {
          // Add clicker to each skill
          skill.addEventListener("click", handleSkill);
        });
      });
    }
    
      function handleSkill(event) {
        // Get clicked element
        const pathElement = event.target.closest(".skill");
        if (!pathElement) return;
        // console.log(pathElement);
    
        // Get skilltree of clicked element
        const skilltree = event.target.closest(".skilltree");
        if (!skilltree) return;
    
        // Get clicked element data-path
        const pathPath = pathElement.getAttribute("data-path");
        if (!pathElement.classList.contains("pass")) if (!pathPath) return;
        // console.log(pathPath);
    
        // Get minors with data-path
        const pathMinors = skilltree.querySelectorAll(
          `.minor[data-path="${pathPath}"]`
        );
        if (!pathElement.classList.contains("pass")) if (!pathMinors) return;
        // console.log(pathMinors);
    
        // Get main with data-path
        const pathMain = skilltree.querySelector(`.main[data-path="${pathPath}"]`);
        if (!pathElement.classList.contains("pass")) if (!pathMain) return;
        // console.log(pathMain);
    
        // Get clicked element data-skill
        const pathSkill = pathElement.getAttribute("data-skill");
        if (!pathSkill) return;
        // console.log(pathSkill);
    
        // Get tab with data-skill
        const pathTab = skilltree.querySelector(
          `.skilltree-tab[data-skill="${pathSkill}"]`
        );
        if (!pathTab) return;
        // console.log(pathTab);
    
        // If the skill pressed is a passive, remove .sel and .active from everything except it
        if (pathElement.classList.contains("pass")) {
          skilltree
            .querySelectorAll(".minor")
            .forEach((minor) => minor.classList.remove("active"));
    
          skilltree
            .querySelectorAll(".main")
            .forEach((main) => main.classList.remove("active"));
          console.log("hey");
        }
    
        // Remove ".sel" to skills not pressed and add ".sel" to pressed one
        skilltree
          .querySelectorAll(".skill")
          .forEach((skill) => skill.classList.remove("sel"));
        pathElement.classList.add("sel");
    
        // Remove ".sel" to tab without data-skill and add ".sel" to tab with data-skill
        skilltree
          .querySelectorAll(".skilltree-tab")
          .forEach((tab) => tab.classList.remove("sel"));
        pathTab.classList.add("sel");
    
        // Remove ".active" from minor without data-path and add ".active" to minor with data-path
        if (!pathElement.classList.contains("pass")) {
          skilltree
            .querySelectorAll(".minor")
            .forEach((minor) => minor.classList.remove("active"));
          pathMinors.forEach((minor) => {
            minor.classList.add("active");
          });
    
          // Remove ".active" from main without data-path and add ".active" to main with data-path
          skilltree
            .querySelectorAll(".main")
            .forEach((main) => main.classList.remove("active"));
          pathMain.classList.add("active");
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
  