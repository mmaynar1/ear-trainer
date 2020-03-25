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
    document.getElementById("questionArea").style.display = "";
    let testResults = document.getElementById("testResults");
    testResults.style.display = "";
    testResults.innerHTML = "";
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

    beginTime = new Date().getTime();
    nextQuestion();
}

let nextQuestion = function()
{
    document.getElementById("questionIndex").innerHTML = "Question " + ( questionIndex + 1 ) + " of " + questionCount;
    playInterval( questions[questionIndex] );
}

let confirmAnswer = function()
{
    let id = document.getElementById("answer").value;
    let interval = getInterval( id );
    if( interval === answers[questionIndex])
    {
        correctAnswers++;
    }
    else
    {
        document.getElementById("correctAnswer").innerHTML = answers[questionIndex];
    }
    questionIndex++;
    if( questionIndex < questionCount )
    {
        nextQuestion();
    }
    else
    {
        let completionSeconds = (( new Date().getTime() - beginTime ) * 1000).toFixed(2);
        document.getElementById("questionArea").style.display = "none";
        let testResults = document.getElementById("testResults");
        testResults.style.display = "";
        testResults.innerHTML = "You got " + correctAnswers + " out of " + questionCount + " correct in " + completionSeconds;

    }
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