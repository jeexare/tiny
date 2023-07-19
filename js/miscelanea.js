document.addEventListener('DOMContentLoaded', function() {
    var imgnewpm = document.querySelectorAll('img[src*="/button_pm_new_en.png"]');
    if (imgnewpm) {
      imgnewpm.forEach(function (img) {
        var link = img.parentNode;
        link.innerHTML = 'Nuevo MP';
      });
    }
  
    var imgreply = document.querySelectorAll('img[src*="/button_topic_reply_en.png"]');
    if (imgreply) {
      imgreply.forEach(function (img) {
        var link = img.parentNode;
        link.innerHTML = 'Responder';
      });
    }
  
    var imgquote = document.querySelectorAll('img[src*="/icon_post_quote_en.png"]');
    if (imgquote) {
      imgquote.forEach(function (img) {
        var link = img.parentNode;
        link.innerHTML = 'Citar';
      });
    }
    
    var imgperfil = document.querySelectorAll('img[src*="/icon_user_profile.png"]');
    if (imgperfil) {
      imgperfil.forEach(function (img) {
        var link = img.parentNode;
        link.setAttribute('title', 'Perfil');
        link.innerHTML = '<i class="fas fa-user"></i>';
      });
    }
    
      var imgficha = document.querySelectorAll('img[src*="/icon_contact_www.gif"]');
    if (imgficha) {
      imgficha.forEach(function (img) {
        var link = img.parentNode;
        link.setAttribute('title', 'Ficha');
        link.innerHTML = '<i class="fas fa-id-card"></i>';
      });
    }
    
  });