document.addEventListener("DOMContentLoaded", function() {
  var notifButton2 = document.querySelector('.alerts');
if (document.querySelector('li.unread')) {
  var bellIcon = notifButton2.querySelector('.fas.fa-bell');
  bellIcon.style.color = '#074a63';
}
  
  // Remove elements
  var elementsToRemove = document.querySelectorAll('p.right.rightside, p');
  elementsToRemove.forEach(function(element) {
    if (element.classList.contains('rightside') || element.textContent.includes('Fecha y hora actual:')) {
      element.remove();
    }
  });

  var ggUidebookElement = document.querySelector('.gg-uidebook');
  var catg = document.querySelector('#c1.forabg');
  if (!catg) ggUidebookElement.remove();

  console.log("Guidebook cargado!");
  
  // Remove specific phrases
  var fechaActual = Array.from(document.querySelectorAll('.wrapper > p')).find(function(el) {
    return el.textContent.includes('Fecha y hora actual');
  });
  var ultimaVisita = Array.from(document.querySelectorAll('.wrapper > p')).find(function(el) {
    return el.textContent.includes('Tu última visita fue');
  });
  fechaActual?.remove();
  ultimaVisita?.remove();

  // Add class to body for new messages
  var nuevoMensaje = document.querySelectorAll('.new-message');
  nuevoMensaje.forEach(function(element) {
    element.closest('body').classList.add('nuevomp');
    var element2 = document.querySelector('a[href="/privmsg?folder=inbox"]');
    element2.style.color = '#074a63';
    element2.style.fontWeight = '900';

  });

  // Remove links
  var removeelements = document.querySelectorAll('li');
var matchingElements = Array.from(removeelements).filter(function(element) {
  return element.querySelector('a.mainmenu[href*="/calendar"]') ||
         element.querySelector('a.mainmenu[href*="/faq"]') ||
         element.querySelector('a.mainmenu[href*="/search"]') ||
         element.querySelector('a.mainmenu[href*="/groups"]') ||
         element.querySelector('a.mainmenu[href*="/images"]');
});

  matchingElements.forEach(function(link) {
    link.parentNode.removeChild(link);
  });

  // Remove &nbsp; characters inside .right in navbar
  var rightElements = document.querySelectorAll('nav .navs');
  rightElements.forEach(function(element) {
    element.innerHTML = element.innerHTML.replace(/&nbsp;/g, '');
  });

  // Modify links with "/login?logout=1" href
  var logoutLinks = document.querySelectorAll('a.mainmenu[href^="/login?logout=1"]');
  logoutLinks.forEach(function(link) {
    link.innerHTML = 'Desconectarse';
  });

  // Modify links with "/privmsg?folder=inbox" href
  var inboxLinks = document.querySelectorAll('a.mainmenu[href^="/privmsg?folder=inbox"]');
  inboxLinks.forEach(function(link) {
    link.innerHTML = 'Mensajes';
  });

  // Remove &nbsp; characters in nav-tree
  var navTree = document.querySelector('.nav-tree');
  navTree.innerHTML = navTree.innerHTML.replace(/&nbsp;::&nbsp;/g, '');

  // Link to baúl
  var perfilContainer = document.querySelector('.avs a');
  var perfilHref = perfilContainer.getAttribute('href');
  
fetch(perfilHref)
  .then(response => response.text())
  .then(html => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    
        var simpLabels = tempElement.querySelectorAll('.simpfield .simplabel span');
         simpLabels.forEach(function(label) {
            var parentField = label.closest('.simpfield');
            var labelText = label.textContent.trim();
            var className = labelText.split(" ")[0].toLowerCase().replace(/'/g, "").replace(/\(|\)/g, "");
            parentField.classList.add(className);
          });
    
    
    const baulContainer = tempElement.querySelector('.baul .simpcontent .field_uneditable a');
    const baulContainerOG = document.querySelector('li.linkbaul');
    if (baulContainer) {
    const baulHref = baulContainer.getAttribute('href');
    const baulLinkOG = baulContainerOG.querySelector('li a');
        baulLinkOG.setAttribute('href', baulHref);
      }
    else baulContainerOG.remove();

  })
  .catch(error => {
    console.log('Error:', error);
  });

    
  // Add notifications to the navbar
  var faMenulist = document.querySelector('#notif_list');
  if (faMenulist) {
  var alerts = document.querySelector('.nav-alerts');
  alerts.appendChild(faMenulist);
  faMenulist.style.display = 'block';
  var notifButton = document.querySelector(".alerts");
  }

  document.addEventListener("click", function(e) {
    if (e.target.closest(".alerts")) {
    if (notifButton) {
    console.log("Hi");
      if (notifButton.classList.contains("alerts-on")) {
        notifButton.classList.remove("alerts-on");
      } else {
        notifButton.classList.add("alerts-on");
      }
  }
    }
  });
  
    // Put widgets on the board
   var board = document.querySelector('.th-1');
  var mainBoard = document.querySelector('.main-board');
  var mainFechas = document.querySelector('.main-fechas');
  var thStaff = document.querySelector('.th-staff');
    
  var thCrono = document.querySelector('.th-crono');
  var thAnuncio = document.querySelector('.th-anuncio');
   var thLinks = document.querySelector('.th-links');
  var thRt = document.querySelector('.th-rt');
  var thEventos = document.querySelector('.th-eventos');
var thStaff2 = document.querySelector('.staff-img');
    
    mainFechas.appendChild(thCrono);
    mainFechas.appendChild(thAnuncio);
    thStaff.appendChild(thStaff2);
    mainBoard.appendChild(thLinks); 
    mainBoard.appendChild(thRt); 
    board.appendChild(thEventos);
  
// Stadistics everywhere
  const index = '/';
  
  fetch(index)
    .then(response => response.text())
    .then(html => {
      const div = document.createElement('div');
      div.innerHTML = html;
      
      // Copy the content of '.stadisticas'
      const statsIndex = div.querySelector('.stadisticas');
      document.querySelector('.stadisticas').innerHTML = statsIndex.innerHTML;

      // Update total users count
      const totalUsers = document.querySelector('.total-us strong').textContent;
      document.querySelector('.total-us span').textContent = totalUsers;
      document.querySelector('.total-ps span').textContent = document.querySelector('.total-ps strong').textContent;

      // Update 's-nuevoo' element
      const bElement = document.querySelector('.s-nuevoo strong');
      bElement.innerHTML = bElement.querySelector('strong').innerHTML;

      // Parse and update connected numbers
      const conectadosTotal = document.querySelector('.onlinetodo').textContent;
      const conectadosNumbers = conectadosTotal.match(/\d+/g).map(Number);

      document.querySelector('.membernumber strong').textContent = conectadosNumbers[1];
      document.querySelector('.hiddennumber strong').textContent = conectadosNumbers[2];
      document.querySelector('.guestnumber strong').textContent = conectadosNumbers[3];

      // Update 'pad-online' and 'pad-horas' elements
      const connected = document.querySelector('.pad-online');
      connected.innerHTML = connected.innerHTML.replace('Usuarios registrados: ', '');
      connected.removeChild(connected.lastChild);

      const hoursconnected = document.querySelector('.pad-horas');
      hoursconnected.innerHTML = hoursconnected.innerHTML.replace('Miembros conectados en las últimas 24 horas:', '');

      // Update 's-grupos' element
const sGruposElement = document.querySelector('.s-grupos');
const tempElement = document.createElement('div');
tempElement.innerHTML = sGruposElement.innerHTML;

// Replace [] and &nbsp;
tempElement.innerHTML = tempElement.innerHTML.replace(/\[|\]|&nbsp;/g, '');

// Modify the <a> elements
const aElements = tempElement.querySelectorAll('a');
const strongHTMLs = [
  '<strong><i class="STAFF"></i></strong>',
  '<strong><i class="VORTEX"></i></strong>',
  '<strong><i class="WATCHMEN"></i></strong>',
  '<strong><i class="PACERS"></i></strong>',
  '<strong><i class="MENDERS"></i></strong>',
  '<strong><i class="INACTIVOS"></i></strong>'
];

aElements.forEach(function(aElement, index) {
  const color = getComputedStyle(aElement).color;
  const name = aElement.textContent.trim();
  const clase = name.replace(/\s/g, '').toLowerCase().replace(/'/g, '').replace(/\(|\)/g, '').slice(0, 10);

  aElement.setAttribute('class', 'ggrupo ' + 'gr' + clase);
  aElement.innerHTML = strongHTMLs[index] + '\n' + name;

  const bParent = aElement.parentNode;
  bParent.parentNode.insertBefore(aElement, bParent);
  bParent.parentNode.removeChild(bParent);
});

// Update the content of the sGruposElement
sGruposElement.innerHTML = tempElement.innerHTML;

    })
    .catch(error => {
      console.error('Error:', error);
    });
      

  const affiliatesArea = document.querySelector('.afi-afi'); // Zona de afiliados
  const affiliatesCount = document.querySelector('.afi-count2'); // Cuenta de afiliados

  fetch("https://dl.dropbox.com/s/cbq2n6qcg1ioguo/Afiliados.csv")
    .then((res) => res.text()) // Use text() instead of blob()
    .then((data) => {
      const lines = data.split(/\r\n|\n/).map(function(line) {
        return line.split(",");
      });

      let aff = "";
      for (let i = 0; i < lines.length; i++) {
        aff += `<a data-alt="${lines[i][0]}" href="${lines[i][1]}" target="_blank"><img src="${lines[i][2]}"></a>`;
      }
      affiliatesArea.innerHTML = aff;

      // Counting code
      var container = document.querySelector(".afi-afi");
      var anchors = container.querySelectorAll("a[data-alt='Tomorrow is Nearly Yesterday']");
      var count = anchors.length - 26;
      affiliatesCount.textContent = count;
    });

  var tabla_a = document.querySelector('.afi-creds');
  var afiliados_a = tabla_a.querySelector('.afi-afi');
  var creditos_a = tabla_a.querySelector('.afi-cred');

  // Afiliados
  var afipad = document.querySelector('.afi-pad');
  afiliados_a.appendChild(afipad);

  // Créditos
  var credpad = document.querySelector('.cred-pad');
  creditos_a.appendChild(credpad);
      
});