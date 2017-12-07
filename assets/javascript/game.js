// COMPUTER OBJECT
var computer = {
	options: 
	["the goonies", 
	"the breakfast club", 
	"stand by me", 
	"back to the future", 
	"gremlins", 
	"dirty dancing",
	"the princess bride",
	"heathers",
	"footloose",
	"the karate kid",
	"flashdance",
	"ghostbusters",
	"raiders of the lost ark",
	"the empire strikes back"],
	wins: 0,
	guesses: 10,
	letters: [],
	current_word: "none",
	current_word_length: 0,
	current_index: "none",
	previous_options: [],
	images: 
	["img_goonies.jpg",
	"img_breakfastclub.jpg",
	"img_standbyme.jpg",
	"img_backtothefuture.jpg",
	"img_gremlins.jpg",
	"img_dirtydancing.jpg",
	"img_princessbride.jpg",
	"img_heathers.jpg",
	"img_footloose.jpg",
	"img_karatekid.jpg",
	"img_flashdance.jpg",
	"img_ghostbusters.jpg",
	"img_raiders.jpg",
	"img_empire.jpg"],
	audio: 
	["aud_goonies.mp3",
	"aud_breakfastclub.mp3",
	"aud_standbyme.mp3",
	"aud_backtothefuture.mp3",
	"aud_gremlins.mp3",
	"aud_dirtydancing.mp3",
	"aud_princessbride.mp3",
	"aud_heathers.mp3",
	"aud_footloose.mp3",
	"aud_karatekid.mp3",
	"aud_flashdance.mp3",
	"aud_ghostbusters.mp3",
	"aud_raiders.mp3",
	"aud_empire.mp3"]
};

// FUNCTIONS TO BE CALLED

function random_choice(array, previous_options) {

	var full_array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

	if (previous_options.length > 0) {
		for (var i = 0; i < previous_options.length; i++) {
			if (full_array.indexOf(previous_options[i]) >= 0) {
				full_array.splice(full_array.indexOf(previous_options[i]), 1)
			}
		}
	}

	if (full_array.length === 0) {
		alert("You've made it through all the movies! Congratulations!")
	}

	var random_choice = full_array[Math.floor(Math.random() * full_array.length)];

	
	return random_choice

};

function indexesOf(array, value) {
    var index = array.indexOf(value);
    indexes = [];

    while (index !== -1) {
        indexes.push(index);
        index = array.indexOf(value, index + 1);
    };

    return indexes
};


document.getElementById("mute_button").onclick = function(event) {
	if (document.getElementById("new_audio") !== null) {
		document.getElementById("new_audio").muted = true;
	}
}

document.getElementById("unmute_button").onclick = function(event) {
	if (document.getElementById("new_audio") !== null) {
		document.getElementById("new_audio").muted = false;
	}
}

// FUNCTION TO CALL RANDOM HANGMAN WORD

function computerChoice() {
	var current_index = random_choice(computer.options, computer.previous_options);
	computer.current_index = current_index;
	computer.current_word = computer.options[computer.current_index];
	var current_choice = computer.current_word
	computer.previous_options.push(computer.current_index);
	console.log(current_choice);
	var head_word = document.getElementById("word");
	var target_word = document.createElement("div");
	target_word.setAttribute("id", "hangman_word");
	head_word.appendChild(target_word);
	var counter = 0

	var word_length_nospace = 0

	for (var i = 0; i < current_choice.length; i ++) {

		if ((current_choice[i] === "")|| (current_choice[i] === null) || (current_choice[i] === ' ')) {
			var new_word = document.createElement("div");
			new_word.setAttribute("id", "Div" + counter);
			new_word.innerHTML = "&ensp; &ensp; &ensp;";
			new_word.style.display = 'inline-block';
			target_word.appendChild(new_word);
			counter ++
		}

		else {
			var new_word = document.createElement("div");
			new_word.setAttribute("id", "Div" + counter);
			new_word.innerHTML = "&ensp; ___ &ensp;";
			new_word.style.display = 'inline-block';
			target_word.appendChild(new_word);
			counter++
			word_length_nospace ++
		}
		

	};

	var guess_number = document.createElement("div");
	guess_number.setAttribute("id", "Div_guessnumber");
	guess_number.innerHTML = computer.guesses;
	guess_number.style.display = 'inline-block';
	document.getElementById("guess_number").appendChild(guess_number);

	var win_number = document.createElement("div");
	win_number.setAttribute("id", "Div_winnumber");
	win_number.innerHTML = computer.wins;
	win_number.style.display = 'inline-block';
	document.getElementById("wins").appendChild(win_number);

	computer.current_word_length = word_length_nospace;

};

// FUNCTION TO BE CALL WHEN LETTER IS CHOSEN

document.onkeyup = function(event) {
	var userGuess = event.key;

	var current_choice = computer.current_word;


	if ((userGuess === "a") || (userGuess === "b") || (userGuess === "c") || (userGuess === "d") ||
	(userGuess === "e") || (userGuess === "f") || (userGuess === "g") || (userGuess === "h") ||
	(userGuess === "i") || (userGuess === "j") || (userGuess === "k") || (userGuess === "l") ||
	(userGuess === "m") || (userGuess === "n") || (userGuess === "o") || (userGuess === "p") ||
	(userGuess === "q") || (userGuess === "r") || (userGuess === "s") || (userGuess === "t") ||
	(userGuess === "u") || (userGuess === "v") || (userGuess === "w") || (userGuess === "x") ||
	(userGuess === "y") || (userGuess === "z")) {

		var index_word = indexesOf(current_choice, userGuess)

		if (index_word.length > 0) {
			for (var i = 0; i < index_word.length; i ++) {
				if (document.getElementById("Div" + index_word[i]) === null) {
					alert("You already chose this letter");
					break;
				}

				else {
				var hangman_letter = document.getElementById("Div" + index_word[i]);
				hangman_letter.setAttribute("id", "solved");
				hangman_letter.innerHTML = "&ensp;" + userGuess + "&ensp;";
				hangman_letter.style.display = 'inline-block';
				}
			}

			computer.letters.push(userGuess);
		} 

		else {
			computer.guesses = computer.guesses-1 ;
			computer.letters.push(userGuess);
		}

		var letter_list = document.getElementById("guess_letters");
		var index_letter = computer.letters.indexOf(userGuess);

		if (index_letter === (computer.letters.length - 1)) {
			var new_letter = document.createElement("div");
			new_letter.setAttribute("class", "Div_guessletters");
			new_letter.innerHTML = computer.letters[index_letter] + "&ensp;";
			new_letter.style.display = 'inline-block';
			letter_list.appendChild(new_letter);
		}

		var new_guess = document.getElementById("Div_guessnumber")
		new_guess.innerHTML = computer.guesses

		if (computer.guesses === 0) {
			if (confirm("You ran out of guesses! Would you like to try again?") === true) {
				computer.wins = 0;
				computer.guesses = 10;

				document.getElementById("hangman_word").remove();

				var elements = document.getElementsByClassName("Div_guessletters");
				
				while (elements.length > 0) {
					elements[0].parentNode.removeChild(elements[0]);
				};

				computer.letters = [];

				document.getElementById("Div_guessnumber").remove();
				document.getElementById("Div_winnumber").remove();

				if (document.getElementById("new_image") !== null) {
					document.getElementById("new_image").remove();
				}

				if (document.getElementById("new_text") !== null) {
					document.getElementById("new_text").remove();
				}

				if (document.getElementById("new_audio") !== null) {
					document.getElementById("new_audio").remove();
				}

				computerChoice();
			}

			else {
				window.close()
			}
		} 

	}

	else {
		alert("You did not type a letter")
	}

	var solved_length = document.querySelectorAll('[id^=solved]').length


	if (solved_length === computer.current_word_length){

		computer.wins = computer.wins + 1;

		computer.guesses = 10;
		document.getElementById("hangman_word").remove();

		var elements = document.getElementsByClassName("Div_guessletters");
		
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		};

		computer.letters = [];

		document.getElementById("Div_guessnumber").remove();
		document.getElementById("Div_winnumber").remove();

		if (document.getElementById("new_image") !== null) {
			document.getElementById("new_image").remove();
		}

		if (document.getElementById("new_text") !== null) {
			document.getElementById("new_text").remove();
		}

		if (document.getElementById("new_audio") !== null) {
			document.getElementById("new_audio").remove();
		}


		var img_source = 'assets/images/' + computer.images[computer.current_index];
		var img_div = document.createElement("img");
		img_div.setAttribute("id", "new_image");
		img_div.setAttribute("src", img_source);
		document.getElementById("image").appendChild(img_div);

		var text_div = document.createElement("div");
		text_div.setAttribute("id", "new_text");
		text_div.innerHTML = computer.options[computer.current_index].toUpperCase();
		document.getElementById("image_header").appendChild(text_div);

		var audio_source = 'assets/audio/' + computer.audio[computer.current_index];
		var audio_div = document.createElement("audio");
		audio_div.setAttribute("id", "new_audio");
		audio_div.setAttribute("src", audio_source);
		audio_div.play()
		document.getElementById("audio").appendChild(audio_div);




		computerChoice();
	}

};





computerChoice()




