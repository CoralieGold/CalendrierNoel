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
			/*$.getJSON("json/articles.json", function(result){
				articles.push(result);
			});*/
			$.getJSON( "ajax/articles.json", function( data ) {
				$.each( data, function( key, val ) {
					articles.push(val);
				});
				localStorage.setItem('articles', JSON.stringify(articles));
				location.reload();
			});
		}

		// Affichage du calendrier
		$.each(articles, function(index, value) {
			statut = articles[index].Statut;
			couleur = articles[index].Couleur;
			jour = articles[index].Jour;
			media = articles[index].Media;
			contenu = articles[index].Contenu;
			lien = articles[index].Lien;

			if(statut == "ferme"){
				$("#calendrier").append('<li id="' + index
				+ '" class="' + couleur
				+ '"><h3><a href="jour' + jour + '.html" class="ouverture">'
				+ jour + '</h3></a></li>');
			}
			if(statut == "ouvert"){
				$("#calendrier").append('<li id="' + index
				+ '" class="' + couleur
				+ '"><a href="jour' + jour + '.html"><img src="images/'
				+ jour + '.png"/></a></li>');
			}

			// Affichage du contenu sur la bonne page
			$(".contenu" + jour).append('<h2>' + jour + ' <img src="images/' + jour + '.png"/> DEC</h2>'
			+ '<picture>' + media + '</picture>'
			+ contenu
			+ '<a href="' + lien + '" target="_blank">Voir plus</a>');

			// Au clique sur une case du calendrier
			$(".ouverture").click(function(){
				identifiant = parseInt($(this).parent().parent().attr('id'));
				articles[identifiant].Statut = "ouvert";
				localStorage["articles"] = JSON.stringify(articles);
				location.reload();
			});
		});

	}
	else {
		alert("Désolé, mais le Web Storage n'est pas supporté");
	}
});
