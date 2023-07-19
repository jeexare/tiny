document.addEventListener('DOMContentLoaded', function() {
	const affiliatesArea = document.querySelector('.afi-afi'); // Zona de afiliados
	const affiliatesCount = document.querySelector('.afi-count2'); // Cuenta de afiliados
  
	fetch("afiliados.csv")
	  .then((res) => res.blob())
	  .then((blob) => {
		const blobReader = new FileReader(); // Lector de archivo
		blobReader.onload = (e) => {
		  const file = blobReader.result; // Archivo
		  const lines = file.split(/\r\n|\n/).map(function (line) {
			return line.split(",");
		  }); // Cada objeto del archivo separado por lineas, cada objeto de la linea separado por comas
		  let aff = "";
		  for (let i = 0; i < lines.length; i++) {
			aff += `<a data-alt="${lines[i][0]}" href="${lines[i][1]}" target="_blank"><img alt="${lines[i][0]}" src="${lines[i][2]}"></a>`;
		  }
		  affiliatesArea.innerHTML = aff;
  
		  // Counting code
		  var container = document.querySelector(".afi-afi");
		  var anchors = container.querySelectorAll("a[data-alt='Tomorrow is Nearly Yesterday']");
		  var count = anchors.length - 26;
		  affiliatesCount.textContent = count;
		};
  
		blobReader.readAsText(blob);
	  });
  });
  