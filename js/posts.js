document.addEventListener("DOMContentLoaded", function () {
  // Add post labels
  addLabels();

  // Cronología
  const currentDate = document.querySelector(".th-crono span");
  const [monthString, year] = currentDate.textContent
    .match(/(\w+) (\d+)/)
    .slice(1);
  const month =
    new Date(Date.parse(monthString + " 1, " + year)).getMonth() + 1;

  // Modify links
  loadButtons();

  // Modify post rows
  var postRows = document.querySelectorAll(".post");

  var rootVars = {};
  var colorProperties = [
    "--staff",
    "--vortex",
    "--watchmen",
    "--pacers",
    "--menders",
    "--inactivos",
  ];

  colorProperties.forEach(function (property) {
    var colorValue = getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();
    var groupName = property.slice(2);
    rootVars[colorValue] = groupName;
  });

  postRows.forEach(function (postRow) {
    if (postRow.getAttribute("id") === "p0") {
      postRow.remove();
    }

    // Hide miniprofile
    var esconderPerfil = postRow.querySelector(".hidden-pp");
    if (esconderPerfil) {
      var postProfile = postRow.querySelector(".post-profile");
      postProfile.style.display = "none";
    }

    // Process code elements
    var codeElements = postRow.getElementsByTagName("code");
    for (var i = 0; i < codeElements.length; i++) {
      var codeElement = codeElements[i];
      var codeContent = codeElement.innerHTML;
      var encodedContent = codeContent
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      codeElement.innerHTML = encodedContent;
    }

    // Process links
    var imgPerfil = postRow.querySelector('img[src*="icon_user_profile.png"]');
    if (imgPerfil) {
      var linkPerfil = imgPerfil.parentNode;
      linkPerfil.setAttribute("title", "Perfil");
      linkPerfil.innerHTML = '<i class="fas fa-user"></i>';
    }

    var imgMP = postRow.querySelector('img[src*="icon_contact_pm.png"]');
    if (imgMP) {
      var linkMP = imgMP.parentNode;
      linkMP.setAttribute("title", "Mensaje Privado");
      linkMP.innerHTML = '<i class="fas fa-inbox"></i>';
    }

    var imgFicha = postRow.querySelector('img[src*="icon_contact_www.gif"]');
    if (imgFicha) {
      var linkFicha = imgFicha.parentNode;
      linkFicha.setAttribute("title", "Expediente");
      linkFicha.innerHTML = '<i class="fas fa-id-card"></i>';
    }

    var imgBaul = postRow.querySelector(
      'img[src*="https://thumbs2.imgbox.com/c4/76/vzQNtmuv_t.png"]'
    );
    if (imgBaul) {
      var linkBaul = imgBaul.parentNode;
      linkBaul.setAttribute("title", "Baúl");
      linkBaul.innerHTML = '<i class="fas fa-suitcase"></i>';
    }

    var iconoField = postRow.querySelector(".ícono .postcontent img");
    var iconoContainer = postRow.querySelector(".ph-right img");
    if (iconoField) {
      var iconoContent = iconoField.getAttribute("src");
      iconoContainer.setAttribute("src", iconoContent);
    } else {
      iconoContainer.remove();
    }

    var msjField = postRow.querySelector(".mensajes .postcontent");
    var msjContainer = postRow.querySelector(".pp-psts");
    if (msjField) {
      var msjContent = msjField.innerHTML;
      var msjNew = msjContainer.querySelector("b");
      msjNew.innerHTML = msjContent;
    } else {
      msjContainer.remove();
    }

    var puntosField = postRow.querySelector(".puntos .postcontent");
    var puntosContainer = postRow.querySelector(".pp-pts");
    if (puntosField) {
      var puntosContent = puntosField.innerHTML;
      var puntosNew = puntosContainer.querySelector("b");
      puntosNew.innerHTML = puntosContent;
    } else {
      puntosContainer.remove();
    }

    var nivelField = postRow.querySelector(".nivel .postcontent");
    var nivelContainer = postRow.querySelector(".pp-nivel");
    if (nivelField) {
      var nivelContent = nivelField.innerHTML;
      var nivelNew = nivelContainer.querySelector("b");
      nivelNew.innerHTML = nivelContent;
    } else {
      nivelContainer.remove();
    }

    var expField = postRow.querySelector(".experiencia .postcontent");
    var expContainer = postRow.querySelector(".pp-exp");
    if (expField) {
      var expContent = expField.innerHTML;
      var expNew = expContainer.querySelector("b");
      expNew.innerHTML = expContent;
    } else {
      expContainer.remove();
    }

    var fechaField = postRow.querySelector(".fecha .postcontent");
    var fechaContainer = postRow.querySelector("span.da1");
    if (fechaField) {
      var fechaContent = fechaField.innerHTML;
      var fechaNew = fechaContainer.querySelector("em");
      fechaNew.innerHTML = fechaContent;
    } else {
      fechaContainer.remove();
    }

    var edadField = postRow.querySelector(".edad .postcontent");
    var edadContainer = postRow.querySelector("span.da2");
    if (edadField) {
      var edadContent = edadField.innerHTML;
      var edadNew = edadContainer.querySelector("em");
      edadNew.innerHTML = edadContent;
    } else {
      edadContainer.remove();
    }

    var fcField = postRow.querySelector(".face .postcontent");
    var fcContainer = postRow.querySelector("span.da3");
    if (fcField) {
      var fcContent = fcField.innerHTML;
      var fcNew = fcContainer.querySelector("em");
      fcNew.innerHTML = fcContent;
    } else {
      fcContainer.remove();
    }

    var origenField = postRow.querySelector(".origen .postcontent");
    var origenContainer = postRow.querySelector("span.da4");
    if (origenField) {
      var origenContent = origenField.innerHTML;
      var origenNew = origenContainer.querySelector("em");
      origenNew.innerHTML = origenContent;
    } else {
      origenContainer.remove();
    }

    var nacField = postRow.querySelector(".nacionalidad .postcontent");
    var nacContainer = postRow.querySelector("span.da5");
    if (nacField) {
      var nacContent = nacField.innerHTML;
      var nacNew = nacContainer.querySelector("em");
      nacNew.innerHTML = nacContent;
    } else {
      nacContainer.remove();
    }

    var idField = postRow.querySelector(".id .postcontent");
    var idContainer = postRow.querySelector("span.pj-id");
    if (idField) {
      var idContent = idField.innerHTML;
      idContainer.innerHTML = idContent;
    } else {
      idContainer.remove();
    }

    var recField = postRow.querySelector(".recolección .postcontent");
    var recContainer = postRow.querySelector("span.pj-timer");
    if (recField) {
      var recContent = recField.innerHTML;
      var [subMonth, subYear] = recContent.split("/");
      var diffYears = year - subYear;
      var diffMonths = month - subMonth;
      var recNew = diffYears + "A " + diffMonths + "M";
      recContainer.innerHTML = recNew;
    } else {
      recContainer.remove();
    }

    var modoPNJ = postRow.querySelector(".modo-pnj");
    if (modoPNJ) {
      var avatarNuevo = modoPNJ.getAttribute("avatar-nuevo");
      if (avatarNuevo) {
        var avatarContainer = postRow.querySelector(".mini-profile a img");
        if (avatarContainer) avatarContainer.src = avatarNuevo;
        else {
          avatarContainer = postRow.querySelector(".mini-profile img");
          avatarContainer.src = avatarNuevo;
        }
      }

      var nombreNuevo = modoPNJ.getAttribute("nombre-nuevo");
      if (nombreNuevo) {
        var nombreContainer = postRow.querySelector(
          ".post-username a span strong"
        );
        if (nombreContainer) nombreContainer.textContent = nombreNuevo;
        else {
          nombreContainer = postRow.querySelector(".post-username span strong");
          nombreContainer.textContent = nombreNuevo;
        }
      }

      var iconoNuevo = modoPNJ.getAttribute("icono-nuevo");
      if (iconoNuevo) {
        var iconoContainer = postRow.querySelector(".ph-right img");
        iconoContainer.src = iconoNuevo;
      }

      var colorNuevo = modoPNJ.getAttribute("color-nuevo");
      if (colorNuevo) {
        postRow.style.setProperty("--groups", colorNuevo, "important");
        var nombrecolor = postRow.querySelector(".post-username a span");
        if (nombrecolor)
          nombrecolor.style.setProperty("color", colorNuevo, "important");
        else {
          nombrecolor = postRow.querySelector(".post-username span");
          nombrecolor.style.setProperty("color", colorNuevo, "important");
        }
      }

      var idNuevo = modoPNJ.getAttribute("id-nuevo");
      if (idNuevo) {
        var idContainer = postRow.querySelector(".ph-right .pj-id");
        idContainer.textContent = idNuevo;
      }

      var rangoNuevo = modoPNJ.getAttribute("rango-nuevo");
      if (rangoNuevo) {
        var rangoContainer = postRow.querySelector(
          ".ph-right span:not([class])"
        );
        rangoContainer.textContent = rangoNuevo;
      }

      var fechaNueva = modoPNJ.getAttribute("fecha-nueva");
      if (fechaNueva) {
        var timerContainer = postRow.querySelector(".ph-right .pj-timer");
        timerContainer.textContent = fechaNueva;
      }
    }

    var cosasextra = document.querySelector(".extrasperfil");
    if (cosasextra) {
      cosasextra.remove();
    }

    var postuserElement = postRow.querySelector(
      ".pp-headermain .post-username"
    );
    var newSpanElement = postuserElement.querySelector("span");
    if (newSpanElement) {
      var newSpanStyle = newSpanElement.getAttribute("style");
      var newSpanColor = newSpanStyle.split(":")[1].trim().toLowerCase();

      for (var color in rootVars) {
        if (color.toLowerCase() === newSpanColor) {
          postRow.classList.add(rootVars[color]);
          break;
        }
      }
    }
  });

  /**************************
    AGREGAR LABELS A LOS CAMPOS DE PERFIL
    **************************/
  function addLabels() {
    var postLabels = document.querySelectorAll(".postfield .postlabel span");
    postLabels.forEach(function (label) {
      var parentPostfield = label.closest(".postfield");
      var labelText = label.textContent
        .trim()
        .split(" ")[0]
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/\(|\)/g, "");
      parentPostfield.classList.add(labelText);
    });
  }

  /**************************
    CAMBIAR TEXTO A LOS BOTONES DE CITAR, EDITAR, BORRAR, IP
    **************************/
  function loadButtons() {
    var linkCategories = [
      { selector: '.ppextra-right a[href*="mode=quote"]', label: "Citar" },
      { selector: '.ppextra-right a[href*="mode=edit"]', label: "Editar" },
      { selector: '.ppextra-right a[href*="mode=delete"]', label: "Borrar" },
      { selector: '.ppextra-right a[href*="mode=ip"]', label: "IP" },
    ];

    linkCategories.forEach(function (category) {
      var links = document.querySelectorAll(category.selector);
      links.forEach(function (link) {
        link.textContent = category.label;
      });
    });
  }
  /**************************
    FUNCIONALIDAD DE SELECCIONAR TODO
    **************************/
  function selectCode(e) {
    var doc = document,
      text = e.closest("dl").querySelector(".cont_code,code"),
      range,
      selection;

    if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  var codeBoxes = document.querySelectorAll(
    "dl.codebox:not(.spoiler,.hidecode) > dd.code, dl.codebox:not(.spoiler,.hidecode) > dd > code"
  );
  codeBoxes.forEach(function (codeBox) {
    var parentDl = codeBox.closest("dl");
    var dtElement = parentDl.querySelector("dt");
    var spanElement = document.createElement("span");
    spanElement.textContent = "Seleccionar";
    spanElement.classList.add("selectCode");
    spanElement.addEventListener("click", function () {
      selectCode(this);
    });
    dtElement.appendChild(spanElement);
  });
});