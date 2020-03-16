// COMPUTER OBJECT
var computer = {
	wins: 0,
	guesses: 10,
	letters: [],
	current_word: "none",
	current_word_length: 0,
	current_index: "none",
	previous_options: []
}

var movies = [
	{
		"name": "the goonies",
		"image": "img_goonies.jpg",
		"audio": "aud_goonies.mp3"
	}, 
	{
		"name": "the breakfast club",
		"image": "img_breakfastclub.jpg",
		"audio": "aud_breakfastclub.mp3"
	},
	{
		"name": "stand by me",
		"image": "img_standbyme.jpg",
		"audio": "aud_standbyme.mp3"
	},
	{
		"name": "back to the future",
		"image": "img_backtothefuture.jpg",
		"audio": "aud_backtothefuture.mp3"
	},
	{
		"name": "gremlins",
		"image": "img_gremlins.jpg",
		"audio": "aud_gremlins.mp3"
	},
	{
		"name": "dirty dancing",
		"image": "img_dirtydancing.jpg",
		"audio": "aud_dirtydancing.mp3"
	},
	{
		"name": "the princess bride",
		"image": "img_princessbride.jpg",
		"audio": "aud_princessbride.mp3"
	}, 
	{
		"name": "heathers",
		"image": "img_heathers.jpg",
		"audio": "aud_heathers.mp3"
	},
	{
		"name": "footloose",
		"image": "img_footloose.jpg",
		"audio": "aud_footloose.mp3"
	}, 
	{
		"name": "the karate kid",
		"image": "img_karatekid.jpg",
		"audio": "aud_karatekid.mp3"
	}, 
	{
		"name": "flashdance",
		"image": "img_flashdance.jpg",
		"audio": "aud_flashdance.mp3"
	}, 
	{
		"name": "ghostbusters",
		"image": "img_ghostbusters.jpg",
		"audio": "aud_ghostbusters.mp3"
	}, 
	{
		"name": "raiders of the last ark",
		"image": "img_raiders.jpg",
		"audio": "aud_raiders.mp3"
	}, 
	{
		"name": "the empire strikes back",
		"image": "img_empire.jpg",
		"audio": "aud_empire.mp3"
	}
]

// FUNCTIONS TO BE CALLED

function random_choice(previous_options) {

	var full_array = Array.from(Array(14).keys());
	
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
	var current_index = random_choice(computer.previous_options);
	computer.current_index = current_index;
	computer.current_word = movies[computer.current_index].name;
	computer.previous_options.push(computer.current_index);
	
	var current_choice = computer.current_word;
	console.log(current_choice);

	var head_word = document.getElementById("word");
	var target_word = document.createElement("div");
	target_word.setAttribute("id", "hangman_word");
	head_word.appendChild(target_word);
	var counter = 0

	var word_length_nospace = 0

	var word_splits = current_choice.split(' ')

	console.log(word_splits)

	console.log(word_splits.length)

	for (var i = 0; i < word_splits.length; i ++) {
		current_word = word_splits[i];
		var new_word = document.createElement("div");
		new_word.setAttribute("class", "new_word");
		target_word.append(new_word);
		new_word.style.display = 'inline-block';
		

		for (var j = 0; j < current_word.length; j ++) {
			var new_letter = document.createElement("div");
			new_letter.setAttribute("class", "letter")
			new_letter.setAttribute("id", "Div" + counter)
			new_letter.innerHTML = "_";
			new_letter.style.display = 'inline-block';
			new_word.append(new_letter)
			counter ++
			word_length_nospace ++
		}
	}

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

	var current_choice = (computer.current_word).replace(/\s/g,'')

	if (event.keyCode >= 65 && event.keyCode <=90 ) {

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
				hangman_letter.innerHTML = userGuess;
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


		var img_source = 'assets/images/' + movies[computer.current_index].image;
		var img_div = document.createElement("img");
		img_div.setAttribute("id", "new_image");
		img_div.setAttribute("src", img_source);
		document.getElementById("image").appendChild(img_div);

		var text_div = document.createElement("div");
		text_div.setAttribute("id", "new_text");
		text_div.innerHTML = (movies[computer.current_index].name).toUpperCase();
		document.getElementById("image_header").appendChild(text_div);

		var audio_source = 'assets/audio/' + movies[computer.current_index].audio;
		var audio_div = document.createElement("audio");
		audio_div.setAttribute("id", "new_audio");
		audio_div.setAttribute("src", audio_source);
		audio_div.play()
		document.getElementById("audio").appendChild(audio_div);

		computerChoice();
	}

};


computerChoice()


test_string = "this is a test"
for (var i = 0; i < test_string.length; i ++ ) {
	if (test_string[i].match(/[a-z]/i) != null) {
		test_string = test_string.replace(test_string[i], "0")
	}
}

