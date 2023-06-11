// Affiliates
document.addEventListener('DOMContentLoaded', function() {
    const affiliatesArea = document.querySelector('.afi-afi'); // Zona de afiliados

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
				aff += `<a data-title="${lines[i][0]}" href="${lines[i][1]}" target="_blank"><img src="${lines[i][2]}"></a>`;
			}
            console.log(affiliatesArea);
			affiliatesArea.innerHTML = aff;
		};

		blobReader.readAsText(blob);
	});
});