/* window.alert("Ok") */

/* DECLARANDO VARIAVEIS */

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userChosenColour;

/* INICIAR JOGO */

$(document).keypress(function () {
	if (!started) {
		/* if (true) */
		$("#level-title").text("Level" + level);
		$("#score-title").remove();
		$("#restart-title").remove();
		$("#sublevel-title").remove();
		nextSequence();
		started = true;
	}
});

/* PROXIMA SEQUENCIA */

function nextSequence() {
	userClickedPattern = []; /* Zerar array */
	level++; /* Proximo nivel */
	$("#level-title").text("Level " + level);
	randomNumber = Math.floor(
		Math.random() * 4
	); /* Numero aleatoria entre 1 e 3 */
	randomChosenColour = buttonColours[randomNumber]; /* Cor aleatoria */
	gamePattern.push(randomChosenColour);

	var randomId = "#" + randomChosenColour; /* Id aleatoria */
	$(randomId).fadeOut(100).fadeIn(100); /* Animacao de flash */
	playSound(randomChosenColour);
}

/* ESCOLHA DE BOTAO PELO USUARIO */

$(".btn").on("click", function () {
	userChosenColour = $(this).attr("id"); /* Pegar id do botao escolhido */
	userClickedPattern.push(userChosenColour); /* Adicionar ao array */
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100); /* Animação de pressionar */
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		/* Cheando os arrays */
		console.log("Success");
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over!");
		$("#level-title").after(
			'<h1 id="score-title">Score: ' + level + "</h1>"
		);
		$("#score-title").after(
			'<h1 id="restart-title">Press any key to restart</h1>'
		);
		startOver();
	}
}

function startOver() {
	gamePattern = [];
	level = 0;
	started = false;
}
