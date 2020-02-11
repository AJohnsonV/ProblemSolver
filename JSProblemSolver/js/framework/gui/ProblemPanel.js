function ProblemPanel(problem) {
    var state;
    var stateCanvas;
    var stateDisplay;
    var movesUL;
    var assistant;
    var messageDisplay;

    this.panel = $("<div></div>");
    this.panel.addClass("outer");

    this.panel.append(welcome());
    this.panel.append(intro());
    this.panel.append(stateArea());
    this.panel.append(movesArea());
    this.panel.append(bottomArea());
    var header;  // Page header that appears upon loading
    var button1; // Button that appears upon loading
    var panel2;   // A panel that replaces the button when button is clicked
    var text;    // Text that appears in the panel
    var button2; // Button that appears in the panel
    var panel3 = quitpanel();
    var finalstatepanel;


    /*
     * Make the message and reset button area.
     */
    function finalstateArea() {
        
	stateDisplay = $("<div></div>");
	stateDisplay.addClass("finalstate");
	state = problem.currentState;
	stateCanvas = state.makeCanvas();
	stateDisplay.append($(stateCanvas));
	return stateDisplay;
    }
    function quitpanel(){
        panel3 = $("<div></div>");
        panel3.addClass("cgpanel");
        text = $("<div></div>").text("GoodBye");
        text.addClass("byetext");
        panel3.append(text);
        return panel3;
    }
    function congratulate() {
        $("#chooser").hide();

        panel2 = $("<div></div>");
        panel2.addClass("cgpanel");
        
        panel2.append(finalstateArea);
    
        text = $("<div></div>").text("Congratulations.");
        text.addClass("congrats");
                panel2.append(text);
        text = $("<div></div>").text("You Have Solved The Problem Using");
        text.addClass("nmtext");
                panel2.append(text);
        text = $("<div></div>").text(assistant.moveCount);
        text.addClass("movestext");
                panel2.append(text);
        text = $("<div></div>").text("moves.");
        text.addClass("nmtext");
                panel2.append(text);
                
        button1 = $("<button></button>").text("Quit");
        button1.addClass("button");
        button1.click(manipulateDOM1);
        panel2.append(button1);
        
        button2 = $("<button></button>").text("Continue");
        
        button2.addClass("button");
        button2.click(manipulateDOM2);
    

        panel2.append(button2);
    
        $("body").append(panel2);
    }
    // Callback for the button that hides the button and shows the text panel
function manipulateDOM1() {
    button1.hide();
    panel2.hide();
    $("body").append(panel3);
    
}
// Callback for the button that goes back to the original layout
function manipulateDOM2() {
    panel2.hide();
    clearMessage();
	    assistant.reset();
	    updateState();
	    movesUL.fadeIn("slow");
    $("#chooser").show();
}


    function bottomArea() {
	messageDisplay = $("<p></p>");
	messageDisplay.addClass("emphasized");

	var resetButton = $("<input></input>");
	resetButton.attr("type", "button");
	resetButton.val("RESET");
	resetButton.click(function() {
	    clearMessage();
	    assistant.reset();
	    updateState();
	    movesUL.fadeIn("slow");
	});

	var bottomDiv = $("<div></div>");
	bottomDiv.addClass("bottom centerText largeBold");
	bottomDiv.append(messageDisplay);
	bottomDiv.append(resetButton);

	return bottomDiv;
    }

    /*
     * Make the moves display area
     */
    function movesArea() {
	var movesDiv = $("<div></div>");
	movesDiv.addClass("right centerText");
	movesDiv.append(boldTextElement("Possible Moves"));

	movesUL = $("<ul></ul>");
	assistant = new SolvingAssistant(problem);
	var moveNames = problem.mover.moveNames;
	const scaler = 0.65; // to get button size right
	var bSize = (scaler * buttonSize(moveNames) * 16) + "px";

	moveNames.forEach((m) => makeButton(m));
	movesDiv.append(movesUL);
	return movesDiv;

	function makeButton(m) {
	    var button = $("<input></input>");

	    button.attr("type", "button");
	    button.val(m);
	    button.css("width", bSize);
	    button.addClass("moveButton");

	    addActionForButton(button, m);

	    var item = $("<li></li>");
	    item.append(button);
	    movesUL.append(item);
	};

	function addActionForButton(button, m) {
	    button.click(function () {
		assistant.tryMove(m);
		if (assistant.moveLegal) {
		    clearMessage();
		    updateState();
		    if (assistant.problemSolved) {
			displayMessage("Congratulations. You solved the problem in "
				       + assistant.moveCount + " moves.");
			movesUL.fadeOut("slow");
			animateCongrats();
                        congratulate();
		    }
		} else {
		    displayMessage("That move is not legal.");
		}
	    });
	};
    }

    function animateCongrats() {
	messageDisplay.css("font-size", 'xx-small');
	messageDisplay.css("color", 'Green');
	messageDisplay.css("background-color", 'GoldenRod');
	messageDisplay.animate({fontSize: '1.5em'}, "slow");
    }

    /*
     * Change the canvas of the current state display area
     */
    function updateState() {
	$(stateCanvas).remove();
	var prevState = state;
	state = problem.currentState;
	stateCanvas = state.makeCanvas();
	stateDisplay.append($(stateCanvas));
	state.animateMove(prevState);
    }

    /*
     * Display a string to the message display area.
     */
    function displayMessage(str) {
	messageDisplay.text(str);
    }

    /*
     * Clear the message display area.
     */
    function clearMessage() {
	messageDisplay.css("font-size", 'medium'); // restore after
	messageDisplay.css("color", 'FireBrick');  // animation
	messageDisplay.css("background-color", 'transparent');
	displayMessage("");
    }

    /*
     * Compute and return maximum move button label size
     */
    function buttonSize(moveNames) {
	var size = 0;
	moveNames.forEach(function (m) {
	    if (m.length > size) {
		size = m.length;
	    }
	});
	return size;
    }

    /*
     * Make the current state display.
     */
    function stateArea() {
	stateDisplay = $("<div></div>");
	stateDisplay.addClass("left centerText");
	stateDisplay.append(boldTextElement("Current State"));
	state = problem.currentState;
	stateCanvas = state.makeCanvas();
	stateDisplay.append($(stateCanvas));
	return stateDisplay;
    }

    /*
     * Make the introductory text for the problem.
     */
    function intro() {
	var introP = $("<p></p>");
	introP.addClass("justifyText");
	introP.text(problem.introduction);
	return introP;
    }

    /*
     * Make the welcoming text for the problem.
     */
    function welcome() {
	var welcomeDiv = $("<div></div>");
	welcomeDiv.addClass("centerText");
	welcomeDiv.append(boldTextElement("Welcome to the "));

	var problemName = boldTextElement(problem.name);
	problemName.addClass("largeBold emphasized");
	welcomeDiv.append(problemName);

	welcomeDiv.append(boldTextElement(" Problem"));
	return welcomeDiv;
    }

    /*
     * Make and return a text element with a large bold font 
     * for a given string.
     */
    function boldTextElement(str) {
	var e = $("<span></span>");
	e.text(str);
	e.addClass("largeBold");
	return e;
    }

}
