let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let selectedAnswers = new Set();

const questions = {
    'Geografie': [
        { question: 'Was ist die Hauptstadt von Kanada?', answers: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'], correct: 0 },
        { question: 'Welcher Fluss ist der längste der Welt?', answers: ['Mississippi', 'Amazonas', 'Jangtsekiang', 'Nil'], correct: 3 },
        { question: 'Der Viktoriasee ist der größte See in Afrika.', answers: ['Wahr', 'Falsch'], correct: 0 },
        { question: 'In welchem Land liegt der Berg Everest?', answers: ['Indien', 'Nepal', 'China', 'Bhutan'], correct: 1 },
        { question: 'Welches ist das größte Land der Welt nach Fläche?', answers: ['Kanada', 'China', 'USA', 'Russland'], correct: 3 },
        { question: 'Mount Kilimanjaro ist in Südamerika.', answers: ['Wahr', 'Falsch'], correct: 0 },
        { question: 'Welche Länder haben eine Küste am Mittelmeer?', answers: ['Ägypten', 'Deutschland', 'Italien', 'Spanien'], correct: [0, 2, 3] },
        { question: 'Wie viele Länder hat Afrika?', answers: ['60', '47', '54', '52'], correct: 2 },
        { question: 'In welchen Ländern finden sich Teile des Himalaya-Gebirges?', answers: ['Indien', 'Russland', 'Nepal', 'China'], correct: [0, 2, 3] },
        { question: 'Welches Land hat die größte Bevölkerung?', answers: ['Indien', 'USA', 'China', 'Indonesien'], correct: 2 },
    ],
    'Geschichte': [
        { question: 'Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?', answers: ['Willy Brandt', 'Konrad Adenauer', 'Ludwig Erhard', 'Helmut Kohl'], correct: 1 },
        { question: 'In welchem Jahr fiel die Berliner Mauer?', answers: ['1989', '1991', '1987', '1990'], correct: 0 },
        { question: 'Welche berühmten Persönlichkeiten waren Teil der Aufklärung?', answers: ['Isaac Newton', 'Voltaire', 'Johann Wolfgang von Goethe', 'Jean-Jacques Rousseau'], correct: [1, 3] },
        { question: 'Die Titanic sank auf ihrer Jungfernfahrt.', answers: ['Wahr', 'Falsch'], correct: 0 },
        { question: 'Welcher Krieg fand zwischen 1939 und 1945 statt?', answers: ['Der Erste Weltkrieg', 'Der Vietnamkrieg', 'Der Korea-Krieg', 'Der Zweite Weltkrieg'], correct: 3 },
        { question: 'Welche der folgenden Ereignisse fanden im Zweiten Weltkrieg statt?', answers: ['Schlacht von Stalingrad', 'Bau der Berliner Mauer', 'D-Day (Landung in der Normandie)', 'Fall der Bastille'], correct: [0, 2] },
        { question: 'Welches Reich wurde oft als "das Reich, in dem die Sonne niemals untergeht" bezeichnet?', answers: ['Das Römische Reich', 'Das Britische Empire', 'Das Mongolische Reich', 'Das Osmanische Reich'], correct: 1 },
        { question: 'In welchem Jahr fand die Französische Revolution statt?', answers: ['1789', '1799', '1776', '1804'], correct: 0 },
        { question: 'Cleopatra war eine römische Kaiserin.', answers: ['Wahr', 'Falsch'], correct: 1 },
        { question: 'Wer war der erste Kaiser von China?', answers: ['Konfuzius', 'Qin Shi Huang', 'Genghis Khan', ' Kublai Khan'], correct: 1 },
    ],
    'Sport': [
        { question: 'Wer hat die FIFA Fußball-Weltmeisterschaft 2014 gewonnen?', answers: ['Brasilien', 'Deutschland', 'Argentinien', 'Spanien'], correct: 1 },
        { question: 'Wie viele Spieler sind in einer Fußballmannschaft auf dem Feld?', answers: ['11', '10', '12', '9'], correct: 0 },
        { question: 'In welcher Stadt fanden die Olympischen Sommerspiele 2012 statt?', answers: ['Beijing', 'London', 'Rio de Janeiro', 'Athen'], correct: 1 },
        { question: 'Der Super Bowl ist das Finale im amerikanischen College Football.', answers: ['Wahr', 'Falsch'], correct: 1 },
        { question: 'Wie viele Goldmedaillen hat Michael Phelps, der amerikanische Schwimmer, gewonnen?', answers: ['23', '18', '20', '15'], correct: 0 },
        { question: 'Welche Länder haben die Fußball-Weltmeisterschaft gewonnen?', answers: ['Brasilien', 'Niederlande', 'Deutschland', 'Italien'], correct: [0, 2, 3] },
        { question: 'Welches Land gewann die Rugby-Weltmeisterschaft 2019?', answers: ['Neuseeland', 'England', 'Südafrika', 'Australien'], correct: 2 },
        { question: 'Usain Bolt hält den Weltrekord im 100-Meter-Lauf.', answers: ['Wahr', 'Falsch'], correct: 0 },
        { question: ' In welchen Sportarten werden die Olympischen Spiele ausgetragen?', answers: ['Schwimmen', 'Cricket', 'Turnen', 'Leichtathletik'], correct: [0,2,3] },
        { question: ' In welchem Jahr fanden die ersten modernen Olympischen Spiele statt?', answers: ['1896', '1900', '1912', '1920'], correct: 0 },
        
    ],
    'Technologie': [
        { question: 'Wofür steht "HTTP" in Webadressen?', answers: ['High-Tech Transmission Protocol', 'HyperText Transfer Protocol', 'Hyperlink Tracking Technology Protoco', 'HyperTransfer Text Protocol'], correct: 1 },
        { question: 'Welche dieser Unternehmen sind bekannt für ihre Smartphones?', answers: ['Apple', 'Samsung', 'Microsoft', 'Huawei'], correct: [0,1,3] },
        { question: 'Wi-Fi und Bluetooth sind das Gleiche.', answers: ['Wahr', 'Falsch'], correct: 1 },
        { question: 'Was war der erste programmierbare Computer?', answers: ['Der ENIAC', 'Die Analytical Engine', 'Der Apple I', 'IBM PC'], correct: 0 },
        { question: 'Welches Unternehmen entwickelte die erste grafische Benutzeroberfläche?', answers: ['Microsoft', 'Apple', 'Xerox', 'IBM'], correct: 2 },
        { question: 'In welchem Jahr wurde das erste iPhone veröffentlicht?', answers: ['2005', '2007', '2010', '2003'], correct: 1 },
        { question: 'Welche Betriebssysteme werden am häufigsten für Mobilgeräte verwendet?', answers: ['Android', 'iOS', 'Windows', 'Linux'], correct: [0,1] },
        { question: 'Das erste Smartphone wurde in den 1990er Jahren entwickelt.', answers: ['Wahr', 'Falsh'], correct: 0 },
        { question: 'Welche Sprache wird häufig für die Entwicklung von Android-Apps verwendet?', answers: ['C++', 'JavaScript', 'Python', 'Java'], correct: 3 },
        { question: 'Welchem Zweck dient eine Firewall in einem Computernetzwerk?', answers: ['Beschleunigung des Netzwerks', 'Verhindern von unbefugtem Zugriff', 'Verbinden verschiedener Netzwerke', 'Datenspeicherung'], correct: 1 }

    ]
};

function startQuiz(category) {
    currentCategory = category;
    currentQuestions = questions[category];
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('scoreboards').style.display = 'none';
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('lastQuestionResult').textContent = '';
    showQuestion();
}

function showQuestion() {
  selectedAnswers.clear();

  const question = currentQuestions[currentQuestionIndex];
  document.getElementById('question').textContent = question.question;

  const answerButtons = document.getElementById('answer-buttons');
  answerButtons.innerHTML = '';
  question.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'btn';
      button.textContent = answer;
      button.onclick = () => toggleAnswer(index, button);
      document.getElementById('next-question').style.display = 'none';
      answerButtons.appendChild(button);
  });
}

function toggleAnswer(index, button) {
  if (selectedAnswers.has(index)) {
      selectedAnswers.delete(index);
      button.classList.remove('btn-selected');
  } else {
      selectedAnswers.add(index);
      button.classList.add('btn-selected');
  }

  document.getElementById('next-question').style.display = selectedAnswers.size > 0 ? 'block' : 'none';
}
function showLastQuestionResult(isCorrect) {
  const resultText = isCorrect ? "Du hast die vorherige Frage 'korrekt' beantwortet!" 
                               : "Du hast die vorherige Frage 'falsch' beantwortet!";

  const resultClass = isCorrect ? 'correct' : 'incorrect';
  document.getElementById('lastQuestionResult').textContent = resultText;
  document.getElementById('lastQuestionResult').className = resultClass;
}

function checkMultipleAnswers(question) {
  return selectedAnswers.size === question.correct.length 
         && [...selectedAnswers].every(answer => question.correct.includes(answer));
}

function checkSingleAnswer(question) {
  return selectedAnswers.size == 1 && selectedAnswers.has(question.correct);
}

function nextQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  let isCorrect = false;

  if (Array.isArray(question.correct)) {
    isCorrect = checkMultipleAnswers(question);
  } else {
    isCorrect = checkSingleAnswer(question);
  }

  if (isCorrect) {
    score++;
  }
  showLastQuestionResult(isCorrect);

  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
    // document.getElementById('scoreboards').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('user-input').style.display = 'block';
}

function saveScore() {
    const username = document.getElementById('username').value;
    if (username) {
        const scoreboard = document.getElementById(`scoreboard-${currentCategory}`);

        const row = scoreboard.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = username;
        cell2.textContent = score;

        resetQuiz();
    } else {
        alert("Bitte gib einen Namen ein!");
    }
}

function resetQuiz() {
    document.getElementById('scoreboards').style.display = 'block';
    document.getElementById('user-input').style.display = 'none';
    // document.getElementById('category-selection').style.display = 'block';
    document.getElementById('username').value = '';
}

function showStartScreen() {
  document.getElementById('category-selection').style.display = 'block';
  document.getElementById('scoreboards').style.display = 'none';
  document.getElementById('welcome-container').style.display = 'block';
}

function initScoreboards() {
    Object.keys(questions).forEach(category => {
      document.getElementById('scoreboards').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'none';

      const table = document.getElementById(`scoreboard-${category}`);
        const header = table.createTHead();
        const row = header.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = 'Name';
        cell2.textContent = 'Score';
    });
}

initScoreboards();
