$(function () {

  $("#contact_form").submit(function () {

    var name = $("#fname").val();
    var email = $("#femail").val();
    var title = $("#ftitle").val();
    var text = $("#ftext").val();
    var check = $("#fcheck").val();
    var output = '';

    if (name == '' || email == '' || title == '' || text == '' || check == '') {
      output += 'Remplissez tous les champs';
    } else if (check != 61) {
      output += 'Résultat de calcul incorrect';
    } else if (!(email.indexOf('@') > 0)) {
      output += "L'adresse e-mail n'est pas correcte";
    } else {
      $("#msg").html("<span class='ok'>Le message a été envoyé</span>");
      return false;
    }

    $("#msg").html("<span class='error'>" + output + "</span>");
    return false;
  });

  $("#signup_form").submit(function () {

    var email = $("#femail").val();
    var pass = $("#fpassword").val();
    var output = '';

    if (email == '' || pass == '') {
      output += 'Remplissez tous les champs';
    } else if (pass.length < 8) {
      output += 'Le mot de passe doit comporter au moins 8 caractères';
    } else if (!(email.indexOf('@') > 0)) {
      output += "L'adresse e-mail n'est pas correcte";
    } else {
      $("#msg").html("<span class='ok'>Vous avez été inscrit avec succès</span>");
      return true;
    }

    $("#msg").html("<span class='error'>" + output + "</span>");
    return false;
  });

  $("#signup_form_").submit(function () {

    var email = $("#femail").val();
    var pass = $("#fpassword").val();
    var pass2 = $("#fpassword2").val();
    var age = $("#fage").val();
    var nom = $("#fnom").val();
    var prenom = $("#fprenom").val();
    var location = $("#flocation").val();
    var tel = $("#ftel").val();
    var output = '';

    if (email == '' || pass == '' || pass2 == '' || age == '' || nom == '' || prenom == '' || location == '' || tel == '') {
      output += 'Remplissez tous les champs';
    } else if (pass.length < 8) {
      output += 'Le mot de passe doit comporter au moins 8 caractères';
    } else if (pass != pass2) {
      output += 'Les mots de passe ne correspondent pas';
    } else if (!(email.indexOf('@') > 0)) {
      output += "L'adresse e-mail n'est pas correcte";
    }
    // Vérification de l'âge (doit être un nombre)
    else if (isNaN(age)) {
      output += "L'âge doit être un nombre";
    } else {
      $("#msg").html("<span class='ok'>Vous avez été inscrit avec succès</span>");
      return true;
    }
    $("#msg").html("<span class='error'>" + output + "</span>");
    return false;
  });

});
