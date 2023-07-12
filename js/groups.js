document.addEventListener('DOMContentLoaded', function() {    
  var groupsTitleElement = document.querySelector('.groups-title');
  var groupsTitleText = groupsTitleElement.textContent.toLowerCase();
  var groupsPageElement = document.querySelector('.groups-page');
  groupsPageElement.classList.add(groupsTitleText);
  var grouspIconElement = document.querySelector('.grousp-icon');

  if (groupsTitleText === 'staff') {
    grouspIconElement.innerHTML = '<i class="cp cp-beehive"></i>';
  } else if (groupsTitleText === 'vortex') {
    grouspIconElement.innerHTML = '<em class="far fa-bullseye"></em>';
  } else if (groupsTitleText === 'watchmen') {
    grouspIconElement.innerHTML = '<i class="cp cp-helm-o"></i>';
  } else if (groupsTitleText === 'pacers') {
    grouspIconElement.innerHTML = '<i class="cp cp-galactic-republic"></i>';
  } else if (groupsTitleText === 'menders') {
    grouspIconElement.innerHTML = '<i class="far fa-atom"></i>';
  } else if (groupsTitleText === 'inactivos') {
    grouspIconElement.innerHTML = '<i class="fas fa-tombstone-alt"></i>';
  }
  });