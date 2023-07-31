$(document).ready(function () {
  $(".simpfield .simplabel span").each(function () {
    $(this)
      .parents(".simpfield")
      .addClass(
        $(this)
          .text()
          .split(" ")[0]
          .toLowerCase()
          .replace(/'/g, "")
          .replace(/\(|\)/g, "")
      );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Cronología
  const currentDate = document.querySelector(".th-crono span");
  const cdText = currentDate.textContent;
  const [monthString, year] = cdText.match(/(\w+) (\d+)/).slice(1);
  const month =
    new Date(Date.parse(monthString + " 1, " + year)).getMonth() + 1;

  // NIVEL
  var nivelField = document.querySelector(
    ".nivel .simpcontent .field_uneditable"
  );
  if (nivelField) {
    var nivelContent = nivelField.innerHTML;
    var nivelContainer = document.querySelector(".ps-info i");
    nivelContainer.innerHTML = "nivel " + nivelContent;
  }

  // ID
  var pjidField = document.querySelector(".id .simpcontent .field_uneditable");
  if (pjidField) {
    var pjidContent = pjidField.innerHTML;
    var pjidContainer = document.querySelector("span.psj-id");
    pjidContainer.innerHTML = pjidContent + " // ";
  }

  // INVENTARIO
  var invField = document.querySelector(
    ".simpfield.inventario .simpcontent .field_uneditable"
  );
  if (invField) {
    var invContent = invField.innerHTML;
    var invDecoded = he.decode(invContent);
    var invContainer = document.querySelector(".ps-inv .pad-ps");
    invContainer.innerHTML = invDecoded;
  }

  // HABILIDADES
  var habField = document.querySelector(
    ".simpfield.habilidades .simpcontent .field_uneditable"
  );
  if (habField) {
    var habContent = habField.innerHTML;
    var habDecoded = he.decode(habContent);
    var habContainer = document.querySelector(".ps-sk .pad-ps");
    habContainer.innerHTML = habDecoded;
  }

  // STATS
  var psStats = document.querySelectorAll(".ps-stat");
  for (var i = 0; i < psStats.length; i++) {
    var psStat = psStats[i];
    var bElement = psStat.querySelector("b");
    var divElement = psStat.querySelector("div");
    var actAttr = divElement.getAttribute("act");
    var maxAttr = divElement.getAttribute("max");

    // PS
    if (i === 0) {
      var psField = document.querySelector(
        ".ps .simpcontent .field_uneditable"
      );
      var psContent = psField.innerHTML;
      bElement.textContent = psContent + " ps";
      divElement.setAttribute("act", psContent);
      divElement.setAttribute("max", 50);
    }

    // PP
    if (i === 1) {
      var ppField = document.querySelector(
        ".pp .simpcontent .field_uneditable"
      );
      var ppContent = ppField.innerHTML;
      bElement.textContent = ppContent + " pp";
      divElement.setAttribute("act", ppContent);
      divElement.setAttribute("max", 50);
    }

    // ATQ
    if (i === 2) {
      var pdrField = document.querySelector(
        ".pdr .simpcontent .field_uneditable"
      );
      var pdrContent = pdrField.innerHTML;
      bElement.textContent = pdrContent + " pdr";
      divElement.setAttribute("act", pdrContent);
      divElement.setAttribute("max", 50);
    }

    // DEF
    if (i === 3) {
      var guaField = document.querySelector(
        ".gua .simpcontent .field_uneditable"
      );
      var guaContent = guaField.innerHTML;
      bElement.textContent = guaContent + " gua";
      divElement.setAttribute("act", guaContent);
      divElement.setAttribute("max", 50);
    }
    // VEL
    if (i === 4) {
      var velField = document.querySelector(
        ".vel .simpcontent .field_uneditable"
      );
      var velContent = velField.innerHTML;
      bElement.textContent = velContent + " vel";
      divElement.setAttribute("act", velContent);
      divElement.setAttribute("max", 50);
    }
  }

  updateStBarsWidth();

  // IMAGEN
  var imagenField = document.querySelector(
    ".imagen .simpcontent .field_uneditable img"
  );
  if (imagenField) {
    var imagenContent = imagenField.getAttribute("src");
    var imagenContainer = document.querySelector(".ps-header img");
    imagenContainer.setAttribute("src", imagenContent);
  }

  // DATOS
  var psAsks = document.querySelectorAll(".ps-asks span");
  for (var i = 0; i < psAsks.length; i++) {
    var psAsk = psAsks[i];
    var bElement = psAsk.querySelector("b");
    var emElement = psAsk.querySelector("em");

    // MENSAJES
    if (i === 0) {
      var msjField = document.querySelector(
        ".mensajes .simpcontent .field_uneditable"
      );
      var msjContent = msjField.innerHTML;
      emElement.innerHTML = msjContent;
      bElement.innerHTML = "Mensajes";
    }
    // PUNTOS
    if (i === 1) {
      var aeonsField = document.querySelector(
        ".aeons .simpcontent .field_uneditable"
      );
      var aeonsContent = aeonsField.innerHTML;
      emElement.innerHTML = aeonsContent;
      bElement.innerHTML = "Aeons";
    }
    // EXP
    if (i === 2) {
      var experienciaField = document.querySelector(
        ".experiencia .simpcontent .field_uneditable"
      );
      if (!experienciaField || experienciaField.innerHTML === " &nbsp;-") {
        psAsk.remove();
        continue;
      }
      var experienciaContent = experienciaField.innerHTML;
      emElement.innerHTML = experienciaContent;
      bElement.innerHTML = "Experiencia";
    }

    // FECHA DE INSCRIPCIÓN
    if (i === 3) {
      var fechaField = document.querySelector(
        ".fecha .simpcontent .field_uneditable"
      );
      var fechaContent = fechaField.innerHTML;
      emElement.innerHTML = fechaContent;
      bElement.innerHTML = "FECHA DE INSCRIPCIÓN";
    }

    // EDAD
    if (i === 4) {
      var edadField = document.querySelector(
        ".edad .simpcontent .field_uneditable"
      );
      if (!edadField || edadField.innerHTML === " &nbsp;-") {
        psAsk.remove();
        continue;
      }
      var edadContent = edadField.innerHTML;
      emElement.innerHTML = edadContent;
      bElement.innerHTML = "EDAD";
    }

    // Face CLaim
    if (i === 5) {
      var fcField = document.querySelector(
        ".face .simpcontent .field_uneditable"
      );
      if (!fcField || fcField.innerHTML === " &nbsp;-") {
        psAsk.remove();
        continue;
      }
      var fcContent = fcField.innerHTML;
      emElement.innerHTML = fcContent;
      bElement.innerHTML = "Face Claim";
    }

    // origen
    if (i === 6) {
      var origenField = document.querySelector(
        ".origen .simpcontent .field_uneditable"
      );
      if (!origenField || origenField.innerHTML === " &nbsp;-") {
        psAsk.remove();
        continue;
      }
      var origenContent = origenField.innerHTML;
      emElement.innerHTML = origenContent;
      bElement.innerHTML = "Origen";
    }

    // nacionalidad
    if (i === 7) {
      var nacField = document.querySelector(
        ".nacionalidad .simpcontent .field_uneditable"
      );
      if (!nacField || nacField.innerHTML === " &nbsp;-") {
        psAsk.remove();
        continue;
      }
      var nacContent = nacField.innerHTML;
      emElement.innerHTML = nacContent;
      bElement.innerHTML = "Nacionalidad";
    }

    // recolección
    if (i === 8) {
      var exField = document.querySelector(
        ".recolección .simpcontent .field_uneditable"
      );
      if (!exField || exField.innerHTML === " &nbsp;-") {
        psAsk.remove();
        continue;
      }
      var exContent = exField.innerHTML;
      var [subMonth, subYear] = exContent.split("/");
      var diffYears = year - subYear;
      var diffMonths = month - subMonth;
      var recNew = +diffYears + "A " + diffMonths + "M";
      emElement.innerHTML = recNew;
      bElement.innerHTML = "Tiempo";
    }
  }

  // CONTACTO
  var psLinks = document.querySelectorAll(".ps-links a");
  for (var i = 0; i < psLinks.length; i++) {
    var psLink = psLinks[i];
    var hrefValue = psLink.getAttribute("href");

    // MENSAJE PRIVADO
    if (i === 3) {
      var msjField = document.querySelector(".mensaje .simpcontent a");
      if (!msjField) {
        psLink.remove();
        continue;
      }
      var msjContent = msjField.getAttribute("href");
      psLink.setAttribute("href", msjContent);
      psLink.textContent = "Mensaje Privado";
    }

    // Ficha
    if (i === 4) {
      var fichaField = document.querySelector(
        ".ficha .simpcontent .field_uneditable a"
      );
      if (!fichaField) {
        psLink.remove();
        continue;
      }
      var fichaContent = fichaField.getAttribute("href");
      psLink.setAttribute("href", fichaContent);
      psLink.textContent = "Ficha";
    }

    // BAUL
    if (i === 5) {
      var baulField = document.querySelector(
        ".baul .simpcontent .field_uneditable a"
      );
      if (!baulField) {
        psLink.remove();
        continue;
      }
      var baulContent = baulField.getAttribute("href");
      psLink.setAttribute("href", baulContent);
      psLink.textContent = "Baúl";
    }
  }

  // Eliminar resto
  const panelElement = document.querySelector(".infopaperfil");
  // Check if the element exists
  if (panelElement) {
    // Remove the element
    panelElement.remove();
  }

  var simpProfElement = document.querySelector(".profile-simple");
  if (!simpProfElement) return;
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

  colorProperties.forEach(function (property) {
    var colorValue = rootStyles.getPropertyValue(property).trim();
    var groupName = property.slice(2);
    rootVars[colorValue] = groupName;
  });

  for (var colorValue in rootVars) {
    if (rootVars.hasOwnProperty(colorValue)) {
      var groupName = rootVars[colorValue];
    }
  }

  let profuserElement = document.querySelector(".prof-user");
  let mySpanElement = profuserElement.querySelector("span");
  if (mySpanElement) {
    let spanStyle = mySpanElement.getAttribute("style");

    let spanColor = spanStyle.split(":")[1].trim().toLowerCase();

    for (var color in rootVars) {
      if (color.toLowerCase() === spanColor) {
        simpProfElement.classList.add(rootVars[color]);
        break;
      }
    }
  }
});
