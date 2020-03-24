let questions = [];
let answers = [];
let questionIndex = 0;

let playInterval = function( id )
{
    document.getElementById(id).play();
}

let generateTest = function()
{
    let questionCount = 20;
    questions = [];
    answers = [];
    questionIndex = 0;

    for( let question = 0; question < questionCount; question++ )
    {
        let interval = getRandomInterval();
        questions[question] = interval + getRandomIndex();
        answers[question] = interval;
    }

    playInterval( questions[questionIndex] );
}

let replayInterval = function()
{
    playInterval( questions[questionIndex] );
}

let getRandomInterval = function()
{
    let interval = getRandomInteger( 0, 4 );
    let intervalName = "third";
    switch( interval )
    {
      case 0:
        intervalName = "third"
        break;
/*      case 1:
        intervalName = "fourth"
        break;*/
      default:
        // code block
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