$(document).ready(function() {
	// Déclaration des variables
	var articles;
	var statut;
	var couleur;
	var jour;

	// Ajout d'un scroll horizontal
	$('html, body, *').mousewheel(function(e, delta) {
		this.scrollLeft -= (delta * 40);
		e.preventDefault();
	});

	// On vérifie si le web storage est possible
	if(typeof(Storage) !== "undefined") {

		// Récupération des articles et du calendrier
		if(localStorage.getItem('articles') != null) {
			articles = JSON.parse(localStorage.getItem('articles'));
		}
		else {
			articles = new Array;
			$.getJSON("json/articles.json", function(result){
				$.each(result, function(index, d){
					articles.push(d);
				});
			});
		}

		// Affichage du calendrier
		$.each(articles, function(index, value) {
			statut = articles[index].Statut;
			couleur = articles[index].Couleur;
			jour = articles[index].Jour;
			contenu = articles[index].Contenu;
			media = articles[index].Media;

			if(statut == "ferme"){
				$("#calendrier").append('<li id="' + index
				+ '" class="' + couleur
				+ '"><h3><a href="#" data-rel="popup' + index + '" class="poplight">'
				+ jour + '</h3></li>');
			}
			if(statut == "ouvert"){
				$("#calendrier").append('<li id="' + index
				+ '" class="' + couleur
				+ '"><h3><a href="#" data-rel="popup' + index + '" class="poplight"><img src="images/'
				+ jour + '.JPG"/></h3></li>');
			}

			$("#articles").append('<div id="popup' + index + '" class="popup_block">'
			+ '<h2>' + jour + ' <img src="images/'+ jour + '.JPG"/> DEC</h2>'
			+ '<picture>' + media + '</picture>'
			+ '<p>' + contenu + '</p></div>');
		});
				
		// Gestion des PopUp 

		// Ouverture de la PopUp
		$('a.poplight').on('click', function() {
			var popID = $(this).data('rel'); //Trouver la pop-up correspondante
			//Faire apparaitre la pop-up et ajouter le bouton de fermeture
			$('#' + popID).fadeIn().prepend('<a href="#" class="close"><i class="fa fa-2x fa-chevron-circle-left btn_close"></i></a>');
				
			return false;
		});
	
	
		// Fermeture de la PopUp
		$('body').on('click', 'a.close', function() { //Au clic sur le body...
			$('.popup_block').fadeOut(function() {
				$('a.close').remove();
			}); //...ils disparaissent ensemble
			
			return false;
		});

	
	}
	else {
		alert("Désolé, mais le Web Storage n'est pas supporté");
	}
});
