var url = "https://opentdb.com/api.php?amount=1"

var callMeteoApi = fetch(url);

var domanda = ""
var risposte = []
var indiceRispostaCorretta = 0

function diventaVerde(elmento) {
  elmento.classList.add("verde");
}

function buttaInHtml(domanda, risposte, indiceRispostaCorretta) {
  document.getElementById("domanda").innerHTML = domanda

  let HTMLrisposte = document.querySelectorAll(".risposte");
  let HTMLrisposteTesto = document.querySelectorAll(".risposte h4");
  
  for (let i = 0; i < HTMLrisposte.length; i++) {
    HTMLrisposteTesto[i].innerHTML = risposte[i]

    if (i == indiceRispostaCorretta) {
      HTMLrisposte[i].addEventListener("click",
        (event) => {
          event.preventDefault();

          diventaVerde(HTMLrisposte[i]);
        },
        false
      );
    }
  }

}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function creaDomanda(categoria) {
  callMeteoApi.then(function (response) {
    return response.json();
  }).then (function (data) {
    console.log(data);

    let domanda = data.results[0].question;
    let risposte = [
                    data.results[0].incorrect_answers[0],
                    data.results[0].incorrect_answers[1],
                    data.results[0].incorrect_answers[2],
                    data.results[0].correct_answer
                  ];
  
    shuffle(risposte);
    
    let indiceRispostaCorretta = risposte.indexOf(data.results[0].correct_answer);

    buttaInHtml(domanda, risposte, indiceRispostaCorretta);
  }).catch(function (error) {
    alert(error);
  });
}

creaDomanda(1);