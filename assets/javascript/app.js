$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // questions options and answers data
    questions: {
      q1: 'Who is actually a chef?',
      q2: 'What does Joey love to eat?',
      q3: 'How many times has Ross been divorced?',
      q4: 'How many types of towels does Monica have?',
      q5: "Who stole Monica's thunder after she got engaged?",
      q6: 'Who hates Thanksgiving?',
      q7: "Who thinks they're always the last to find out everything?"
    },
    options: {
      q1: ['Monica', 'Chandler', 'Rachel', 'Ross'],
      q2: ['Fish', 'Apples', 'Oranges', 'Sandwhiches'],
      q3: ['5', '2', '1', '3'],
      q4: ['3', '8', '11', '6'],
      q5: ['Rachel','Phoebe','Emily','Carol'],
      q6: ['Joey','Chandler','Rachel','Ross'],
      q7: ['Ross', 'Phoebe', 'Monica','Chandler']
    },
    answers: {
      q1: 'Monica',
      q2: 'Sandwhiches',
      q3: '3',
      q4: '11',
      q5: 'Rachel',
      q6: 'Chandler',
      q7: 'Phoebe'
    },
    // trivia methods
    // start game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game 
      $('#game').show();
      
      //  clear
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },

    nextQuestion : function(){
      

        trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      

      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      

      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    //timer function
    timerRunning : function(){
     
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // time runs out - result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game section
        $('#game').hide();
        
        // show start button for a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID
      var resultId;
      
      // answer for current question
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // increment correct
      if($(this).text() === currentAnswer){
        // green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },

    guessResult : function(){
      
      // next question set
      trivia.currentSet++;
      
      // clear the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // next question
      trivia.nextQuestion();
       
    }
  
  }