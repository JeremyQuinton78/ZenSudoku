var selection = 0 ; // Cible du clic
var sec = -1 ; // Secondes
var min = 0 ; // Minutes
var pauseState = false ; // État de pause
var win = false ; // État de victoire
var music = false ; // Activation musique


/*
var scores = new Array() ;
console.log(localStorage["high-scores"]) ;
*/

var grilleRandom = Math.floor(Math.random() * Math.floor(3)) ; // Définition d'une grille en Json

if(grilleRandom == 0) { var obj = JSON.parse(GrilleSudoku1); }
else if(grilleRandom == 1) { var obj = JSON.parse(GrilleSudoku2); }
else if(grilleRandom == 2) { var obj = JSON.parse(GrilleSudoku3); }

var orientGrilleRandom = Math.floor(Math.random() * Math.floor(8)) ; // Orientation de la grille définie

initGrille() ; // initialisation de la grille
function initGrille() {	
	for (var i = 0; i <= obj.cases.length-1; i++) {

		if (orientGrilleRandom == 0) {
			var coordCaseX = parseInt(obj.cases[i].caseX);
			var coordCaseY = parseInt(obj.cases[i].caseY);
		}
		else if (orientGrilleRandom == 1) {
			var coordCaseX = parseInt(obj.cases[i].caseY);
			var coordCaseY = parseInt(obj.cases[i].caseX);
		}
		else if (orientGrilleRandom == 2) {
			var coordCaseX = parseInt(10-(obj.cases[i].caseX));
			var coordCaseY = parseInt(obj.cases[i].caseY);
		}	
		else if (orientGrilleRandom == 3) {
			var coordCaseX = parseInt(10-(obj.cases[i].caseY));
			var coordCaseY = parseInt(obj.cases[i].caseX);
		}
		else if (orientGrilleRandom == 4) {
			var coordCaseX = parseInt(obj.cases[i].caseX);
			var coordCaseY = parseInt(10-(obj.cases[i].caseY));
		}	
		else if (orientGrilleRandom == 5) {
			var coordCaseX = parseInt(obj.cases[i].caseY);
			var coordCaseY = parseInt(10-obj.cases[i].caseX);
		}
		else if (orientGrilleRandom == 6) {
			var coordCaseX = parseInt(10-(obj.cases[i].caseX));
			var coordCaseY = parseInt(10-(obj.cases[i].caseY));
		}	
		else if (orientGrilleRandom == 7) {
			var coordCaseX = parseInt(10-(obj.cases[i].caseY));
			var coordCaseY = parseInt(10-(obj.cases[i].caseX));
		}		

		var char = "c" + coordCaseX + coordCaseY ; 
		document.getElementById(char).innerHTML = obj.cases[i].value ;
		document.getElementById(char).style.color = '#A00000';
	}
}

// Fonction pause
function pause() { 
	pauseState = true ; 
	document.getElementById("pauseScreen").style.visibility = 'visible';
}

function highscores() {
	document.getElementById("highScoreScreen").style.visibility = 'visible';

	/*
    if(typeof(Storage)!=="undefined"){
    var scores = false;
    if(localStorage["high-scores"]) {
        document.getElementById("listScores").style.display = "block";
        document.getElementById("listScores").innerHTML = '';
        scores = JSON.parse(localStorage["high-scores"]);
        scores = scores.sort(function(a,b){return parseInt(a)-parseInt(b)});

        for(var i = 0; i < 10; i++){
            var s = scores[i];                        
            var fragment = document.createElement('li');
            fragment.innerHTML = (typeof(s) != "undefined" ? s : "" );
            document.getElementById("listScores").appendChild(fragment);
        }
    }
    } else {
        high_scores.style.display = "none";
    }
    */

}

// Fonction paramètres
function settings() {
	document.getElementById("settingScreen").style.visibility = 'visible';
}


musicSwitch() ; // Fonction Musique
function musicSwitch() {
	var player = document.querySelector('#audioPlayer');

	if (music == true) {
		music = false ;
		document.getElementById("musicButton").style.color = "#AA0000" ;
		player.pause() ;
	}
	else {
		music = true ;
		document.getElementById("musicButton").style.color = "#00AA00" ;
		player.play() ;
	}
}

// Affichage des paramètres
function backgroundSetting() {
	document.getElementById("backgroundSettingScreen").style.visibility = 'visible';
}


// Affichage du fond en fonction du paramètre sélectionné
background1() ;
function background1() {
	document.body.style.backgroundImage = "url('assets/bck/tropical.jpg')"; 
}
function background2() {
	document.body.style.backgroundImage = "url('assets/bck/ocean.jpg')"; 
}
function background3() {
	document.body.style.backgroundImage = "url('assets/bck/zen.jpg')"; 
}

// Relancer la partie
function resume() {
	pauseState = false ; 
	chrono();
}

// Fonction Chrono (en boucle)
chrono();
function chrono() {

	if (pauseState == false && win == false) {

		document.getElementById("pauseScreen").style.visibility = 'hidden';
		document.getElementById("highScoreScreen").style.visibility = 'hidden';
		document.getElementById("settingScreen").style.visibility = 'hidden';
		document.getElementById("backgroundSettingScreen").style.visibility = 'hidden';
		document.getElementById("winScreen").style.visibility = 'hidden';

		sec = sec + 1 ;

		if (sec == 60) {
			sec = 0 ;
			min = min + 1 ;
		}

		if (min < 10) { document.getElementById("chronoMinute").innerHTML = "0"+min ; }
		else { document.getElementById("chronoMinute").innerHTML = min ; }
		if (sec < 10) { document.getElementById("chronoSeconde").innerHTML = "0"+sec ; }
		else { document.getElementById("chronoSeconde").innerHTML = sec ; }
		
		timerID = setTimeout("chrono()", 1000) ;
		
	}	

}

	
// Fonction reset
function reset() {
	selection = 0 ;
	min = 0 ;
	sec = -1 ;

	for (var x = 1; x <= 9; x++) {
		for (var y = 1; y <= 9; y++) {
			var char = "c" + x + y ;
			var element = document.getElementById(char) ;
			element.style.backgroundColor = "#F0F0F0" ;
			element.innerHTML = "" ;
		}	
	}
	initGrille() ;

}	


// Fonction de vérifications
function check() {

	var allVerif = true ;
	var verif = new Array(0,0,0,0,0,0,0,0,0);

	//vérification horizontale
	for (var iLine = 1; iLine <= 9; iLine++) {
		var sum = 1;
		for (var i = 0; i <= 8; i++) {
			var char = "c" + iLine + (i+1) ; 
			verif[i] = parseInt(document.getElementById(char).innerHTML);
			if (verif[i] >= 1 && verif[i] <= 9) {
				sum = sum * verif[i];
			}	
		}
		if(sum != 362880) {
			allVerif = false ;
		}	
	}

	//vérification verticale
	for (var iLine = 1; iLine <= 9; iLine++) {
		var sum = 1;
		for (var i = 0; i <= 8; i++) {
			var char = "c" + (i+1) + iLine ; 
			verif[i] = parseInt(document.getElementById(char).innerHTML);
			if (verif[i] >= 1 && verif[i] <= 9) {
				sum = sum * verif[i];
			}	
		}
		if(sum != 362880) {
			allVerif = false ;
		}	
	}	

	//vérification carrés
	for (var xGrille = 0; xGrille <= 6 ; xGrille = xGrille + 3){
		for (var yGrille = 0; yGrille <= 6 ; yGrille = yGrille + 3){	
		
			var sum = 1 ;
			for (var x = 1; x <= 3; x++) {
				for (var y = 1; y <= 3; y++) {
					
					var char = "c" + (x + xGrille) + (y + yGrille) ; 
					var i = (3*(x-1)+y)-1 ;	

					verif[i] = parseInt(document.getElementById(char).innerHTML);
					if (verif[i] >= 1 && verif[i] <= 9) {
						sum = sum * verif[i];
					}

				}
			}

			if(sum != 362880) {
				allVerif = false ;
			}

		}
	}


	if (allVerif == false) {
		alert("Sudoku Incorrect") ;
	}
	else {
		win = true ;
		document.getElementById("winScreen").style.visibility = 'visible';

		/*
		if(typeof(Storage)!=="undefined"){
        var current = sec ;
        var scores = false;
        if(localStorage["high-scores"]) {

            scores = JSON.parse(localStorage["high-scores"]);
            scores = scores.sort(function(a,b){return parseInt(a)-parseInt(b)});
            
            for(var i = 0; i < 10; i++){
                var s = parseInt(scores[i]);
                
                var val = (!isNaN(s) ? s : 0 );
                if(current > val)
                {
                    val = current;
                    scores.splice(i, 0, parseInt(current));
                    break;
                }
            }
            
            scores.length = 10;                                
            localStorage["high-scores"] = JSON.stringify(scores);

        } else {                        
            var scores = new Array();
            scores[0] = current;
            localStorage["high-scores"] = JSON.stringify(scores);
        }
        
    	} 
    	*/


	}


}

// Fonction reconnaissant la case du sudoku cliqué
function caseclick(coordcase) {

	if (pauseState == false) {
		
		var verifCaseAlterable = true ;

		for (var i = 0; i <= obj.cases.length-1; i++) {

			if (orientGrilleRandom == 0) {
				var verifCoordCase = parseInt(obj.cases[i].caseX + obj.cases[i].caseY) ;
			}
			else if (orientGrilleRandom == 1) {
				var verifCoordCase = parseInt(obj.cases[i].caseY + obj.cases[i].caseX) ;
			}
			else if (orientGrilleRandom == 2) {
				var verifCoordCase = parseInt((10-(obj.cases[i].caseX)) + obj.cases[i].caseY) ;
			}
			else if (orientGrilleRandom == 3) {
				var verifCoordCase = parseInt((10-(obj.cases[i].caseY)) + obj.cases[i].caseX) ;
			}
			else if (orientGrilleRandom == 4) {
				var verifCoordCase = parseInt(obj.cases[i].caseX + (10-(obj.cases[i].caseY))) ;
			}
			else if (orientGrilleRandom == 5) {
				var verifCoordCase = parseInt(obj.cases[i].caseY + (10-(obj.cases[i].caseX))) ;
			}
			else if (orientGrilleRandom == 6) {
				var intToStringX = String(10-(obj.cases[i].caseX)) ;
				var intToStringY = String(10-(obj.cases[i].caseY)) ;
				var verifCoordCase = parseInt(intToStringX + intToStringY) ;
			}
			else if (orientGrilleRandom == 7) {
				var intToStringX = String(10-(obj.cases[i].caseX)) ;
				var intToStringY = String(10-(obj.cases[i].caseY)) ;
				var verifCoordCase = parseInt(intToStringY + intToStringX) ;
			}

			if(verifCoordCase == coordcase) {
				verifCaseAlterable = false ;
			}
		}

		if (verifCaseAlterable == true) {

			for (var x = 1; x <= 9; x++) {
				for (var y = 1; y <= 9; y++) {
					var char = "c" + x + y ;
					document.getElementById(char).style.backgroundColor = "#F0F0F0" ;
				}	
			}

			selection = coordcase ;
			var char = "c" + coordcase ;
			document.getElementById(char).style.backgroundColor = "#CCCCCC" ;
		}
	}
}

// Fonction reconnaissant la case du pavé numérique cliqué
function keyclick(keyid) {
	if (pauseState == false) {
		if (selection != 0) {
			var char = "c" + selection ;
			var caseSelected = document.getElementById(char).innerHTML
			if (keyid != caseSelected) {
				document.getElementById(char).innerHTML = keyid ;
			}
			else {
				document.getElementById(char).innerHTML = null ;
			}
			document.querySelector('#audioClick').play();
		}
	}
}



