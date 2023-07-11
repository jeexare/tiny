document.addEventListener("DOMContentLoaded", function () {
  /******************************
       ZONA DE PERSONAJES
*******************************/
  /*Fetches the category*/
  const forabgCharac = document.querySelector("#c2.forabg");
  /*If the category exists*/
  if (forabgCharac) {
    /*Fetches the first subforum*/
    const foroReg = forabgCharac.querySelector(".foro-reg");
    /*If the first subforum exists*/
    if (foroReg)
      /*Adds the class .ffichas to it*/
      foroReg.classList.add("ffichas");
    /*Reorders the subforum*/
    reorderFichas();
  }

  console.log("Zona de personajes cargada!");

  /******************************
       ZONA DE ROL
*******************************/
  const scenesCat = document.querySelector("#c4");
  /* Fetches the category element */

  if (scenesCat) {
    /* If the category element exists */
    const topicList = scenesCat.querySelector(".topiclist.forums");
    /* Fetches the list of subforums */

    if (topicList) {
      /* If the list of subforums exists */
      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("scenes-list");
      /* Creates a new div element for the scene buttons and adds the "scenes-list" class */

      const foroRegElements = topicList.querySelectorAll(".foro-reg");
      /* Fetches all subforum elements */

      foroRegElements.forEach((foroRegElement, index) => {
        /* Iterates over each subforum element */
        const foroTit = foroRegElement.querySelector(".foro-tit");
        const foroTitName = foroTit.textContent;
        const foroTitHref = foroTit.getAttribute("href");
        /* Fetches the title, name, and href attributes of the subforum */

        const newButton = document.createElement("a");
        newButton.classList.add("scene-button");
        newButton.textContent = foroTitName;
        newButton.setAttribute("href", foroTitHref);
        newButton.setAttribute("data-name", foroTitName);
        /* Creates a new button element for the subforum, sets its attributes and content */

        const foroStats = foroRegElement.querySelector(".foro-stats");
        if (foroStats) {
          newButton.appendChild(foroStats);
        }
        /* Appends the foroStats element to the new button if it exists */

        buttonsDiv.appendChild(newButton);
        /* Appends the new button to the buttonsDiv element */

        foroRegElement.setAttribute("data-name", foroTitName);
        /* Sets the data-name attribute of the subforum element */

        if (index === 0) {
          newButton.setAttribute("id", "onscene");
        }
        /* Sets the ID attribute of the new button to "onscene" for the first subforum element */

        const sceneInfo = document.createElement("div");
        sceneInfo.classList.add("scene-info");
        /* Creates a new div element for the scene information and adds the "scene-info" class */

        const foroMain = foroRegElement.querySelector(".foro-main");
        const foroSide = foroRegElement.querySelector(".foro-side");
        const foroFondo = foroMain.querySelector(".foro-fondo");
        if (foroFondo) {
          foroMain.removeChild(foroFondo);
          foroRegElement.appendChild(foroFondo);
        }
        /* Moves the foro-fondo element from the foro-main element to the foro-reg element */

        sceneInfo.appendChild(foroMain);
        sceneInfo.appendChild(foroSide);
        /* Appends the foro-main and foro-side elements to the sceneInfo element */

        foroRegElement.appendChild(sceneInfo);
        /* Appends the sceneInfo element to the subforum element */
      });

      topicList.appendChild(buttonsDiv);
      /* Appends the buttonsDiv element to the topicList element */

      const mainScene = document.createElement("div");
      mainScene.classList.add("main-scene");
      /* Creates a new div element for the main scene and adds the "main-scene" class */

      foroRegElements.forEach((foroRegElement) => {
        /* Iterates over each subforum element again */
        mainScene.appendChild(foroRegElement);
        /* Appends each subforum element to the mainScene element */
      });

      topicList.appendChild(mainScene);
      /* Appends the mainScene element to the topicList element */

      setupClickEvent();
      /* Calls the setupClickEvent() function */
    }
  }
});

/******************************
 *   REORGANIZA ESTRUCTURA DEL SUBFORO DE FICHAS
 *******************************/
function reorderFichas() {
  const subforoFichas = document.querySelector(".foro-reg.ffichas"); // Fetches the subforoFichas element with the class ".foro-reg.ffichas"
  const descFichas = subforoFichas.querySelector(".foro-main2"); // Fetches the main content element within the subforoFichas
  const gruposFichas = subforoFichas.querySelector(".foro-gruposs"); // Fetches the grupos content element within the subforoFichas
  const sideContent = subforoFichas.querySelector(".foro-side"); // Fetches the side content element within the subforoFichas
  const mainSection = subforoFichas.querySelector(".foro-main"); // Fetches the main section element within the subforoFichas

  subforoFichas.appendChild(descFichas); // Appends the main content element to the subforoFichas
  subforoFichas.appendChild(gruposFichas); // Appends the grupos content element to the subforoFichas
  subforoFichas.appendChild(sideContent); // Appends the side content element to the subforoFichas
  subforoFichas.appendChild(mainSection); // Appends the main section element to the subforoFichas
}

/******************************
      PARA QUE LAS TABS FUNCIONES EN LA ZONA DE ROL
*******************************/
function setupClickEvent() {
  const onsceneButton = document.getElementById("onscene"); // Fetches the button element with the ID "onscene"
  if (onsceneButton) {
    const sceneName = onsceneButton.getAttribute("data-name"); // Fetches the data-name attribute value of the onsceneButton
    const scene = document.querySelector(`.foro-reg[data-name="${sceneName}"]`); // Fetches the scene element with the corresponding data-name attribute value

    if (scene) {
      onsceneButton.classList.add("active"); // Adds the "active" class to the onsceneButton
      scene.classList.add("active"); // Adds the "active" class to the scene element
    }
  }

  document.addEventListener("mouseover", (e) => {
    const sceneButton = e.target.closest(".scene-button"); // Fetches the closest ancestor element with the class "scene-button" to the mouseover target

    if (!sceneButton) return; // If sceneButton does not exist, return

    const sceneName = sceneButton.getAttribute("data-name"); // Fetches the data-name attribute value of the sceneButton

    if (!sceneName) return; // If sceneName does not exist, return

    const scene = document.querySelector(`.foro-reg[data-name="${sceneName}"]`); // Fetches the scene element with the corresponding data-name attribute value

    if (!scene) return; // If scene does not exist, return

    const activeScene = document.querySelector(
      `.scene-button[data-name="${sceneName}"]`
    ); // Fetches the active scene button element with the corresponding data-name attribute value

    if (!activeScene) return; // If activeScene does not exist, return

    document
      .querySelectorAll(".foro-reg")
      .forEach((scene) => scene.classList.remove("active")); // Removes the "active" class from all scene elements

    scene.classList.add("active"); // Adds the "active" class to the scene element

    document
      .querySelectorAll(".scene-button")
      .forEach((activeScene) => activeScene.classList.remove("active")); // Removes the "active" class from all scene buttons

    activeScene.classList.add("active"); // Adds the "active" class to the activeScene button
  });
}
