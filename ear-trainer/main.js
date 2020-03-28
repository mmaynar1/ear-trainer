let questions = [];
let answers = [];
let questionIndex = 0;
let correctAnswers = 0;
let questionCount = 20;
let beginTime = "";

let playInterval = function( id )
{
    document.getElementById(id).play();
}

let generateTest = function()
{
    show("questionArea");
    hide("startButton");
    show("correctAnswer", "&nbsp");
    show("testResults", "");
    questions = [];
    answers = [];
    questionIndex = 0;
    correctAnswers = 0;

    for( let question = 0; question < questionCount; question++ )
    {
        let interval = getRandomInterval();
        questions[question] = interval + getRandomIndex();
        answers[question] = interval;
    }

    beginTime = Date.now();
    nextQuestion();
}

let nextQuestion = function()
{
    show("questionIndex", "Question " + ( questionIndex + 1 ) + " of " + questionCount );
    playInterval( questions[questionIndex] );
}

let confirmAnswer = function()
{
    evaluateAnswer();
    questionIndex++;
    if( questionIndex < questionCount )
    {
        nextQuestion();
    }
    else
    {
        finishGame();
    }
}

let evaluateAnswer = function()
{
    let id = document.getElementById("answer").value;
    let interval = getInterval( id );
    if( interval === answers[questionIndex])
    {
        correctAnswers++;
        show("correctAnswer", "&nbsp");
    }
    else
    {
        show("correctAnswer", "Wrong, the correct answer was: " + answers[questionIndex] );
    }
}

let finishGame = function()
{
    show("startButton");
    hide("questionArea");
    let highScoreMessage = "You didn't beat your high score. ";
    let delta = Date.now() - beginTime; // milliseconds elapsed since start
    let completionSeconds = Math.floor(delta / 1000);
    if( saveHighScore( completionSeconds ) )
    {
        highScoreMessage = "New high score! ";
    }

    hide("correctAnswer")
    show( "testResults", highScoreMessage +
                         "You got " + correctAnswers +
                         " out of " + questionCount +
                         " correct in " + completionSeconds + " seconds." );
}

let saveHighScore = function( completionSeconds )
{
    let highScore = false;
    let score = localStorage.getItem('score');
    let time = localStorage.getItem('time');
    if( correctAnswers > score || ( correctAnswers >= score && completionSeconds < time ) )
    {
        localStorage.setItem('score', correctAnswers);
        localStorage.setItem('time', completionSeconds);
        highScore = true;
    }
    return highScore;
}

let replayInterval = function()
{
    playInterval( questions[questionIndex] );
}

let getRandomInterval = function()
{
    let interval = getRandomInteger( 0, 4 );
    return getInterval( interval );
}

let show = function( id, value )
{
    let element = document.getElementById(id);
    element.style.display = "";
    if( value !== undefined )
    {
        element.innerHTML = value;
    }
}

let hide = function( id )
{
    document.getElementById(id).style.display = "none";
}

let getInterval = function( id )
{
    id = id + "";
    let intervalName = "third";
    switch( id )
    {
      case "0":
        intervalName = "third"
        break;
      case "1":
        intervalName = "fourth"
        break;
      case "2":
         intervalName = "fifth"
         break;
      case "3":
         intervalName = "octave"
         break;
      default:
        // Return whatever was set as the default
    }

    return intervalName
}

let getRandomIndex = function()
{
	return getRandomInteger( 0, 7 );
}

let getRandomInteger = function( min, max )
{
	return Math.floor( Math.random() * ( max - min ) ) + min;
}