document.addEventListener('DOMContentLoaded', function() {

    const scenesCat = document.querySelector('.scene');
    if (!scenesCat) return;

    console.log("Hey!");

    const topicList = scenesCat.querySelector('.topiclist.forums');
    if (!topicList) return;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('scenes-list');
    
    const foroRegElements = topicList.querySelectorAll('.foro-reg');
    foroRegElements.forEach((foroRegElement, index) => {
        const foroTit = foroRegElement.querySelector('.foro-tit');
        const foroTitName = foroTit.textContent;
        const foroTitHref = foroTit.getAttribute('href');
        
        const newButton = document.createElement('a');
        newButton.classList.add('scene-button');
        newButton.textContent = foroTitName;
        newButton.setAttribute('href', foroTitHref);
        newButton.setAttribute('data-name', foroTitName);
        buttonsDiv.appendChild(newButton);
    
        foroRegElement.setAttribute('data-name', foroTitName);

        if (index === 0) {
            newButton.setAttribute('id', 'onscene');
        }
    });
  
    topicList.appendChild(buttonsDiv);

    const mainScene = document.createElement('div');
    mainScene.classList.add('main-scene');

    foroRegElements.forEach(foroRegElement => {
        mainScene.appendChild(foroRegElement);
    });

    topicList.appendChild(mainScene);

    setupClickEvent();
});

function setupClickEvent() {
document.addEventListener("mouseover", (e) => {
	const sceneButton = e.target.closest(".scene-button");

	if (!sceneButton) return;

	const sceneName = sceneButton.getAttribute("data-name");

	if (!sceneName) return;

	const scene = document.querySelector(
		`.foro-reg[data-name="${sceneName}"]`
	);

	if (!scene) return;

	const activeScene = document.querySelector(
		`.scene-button[data-name="${sceneName}"]`
	);

	if (!activeScene) return;

	document
		.querySelectorAll(".foro-reg")
		.forEach((scene) => scene.classList.remove("active"));

	scene.classList.add("active");

	document
		.querySelectorAll(".scene-button")
		.forEach((activeScene) => activeScene.classList.remove("active"));

	activeScene.classList.add("active");

    
});

console.log("???");

  const onsceneButton = document.getElementById("onscene");
  if (onsceneButton) {
    onsceneButton.dispatchEvent(new Event("mouseover"));
  }
}