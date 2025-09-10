window.go = url => window.location.href = url;

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------- Navigation ----------------------
  // Simple helper function to navigate between pages
  function go(url) {
    window.location.href = url;
  }
  window.go = go; // Expose it globally so I can call it from HTML

  // Function to show a specific section while hiding others
  function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  window.showSection = showSection;

  // ---------------------- Quiz Data ----------------------
const quizzes = {
  quran: [
    {q:"What is the first Surah of the Qur’an?", options:["Al-Fatiha","Al-Baqarah","Al-Imran"], answer:"Al-Fatiha"},
    {q:"Which Surah is the longest?", options:["Al-Baqarah","Al-Fatiha","Yasin"], answer:"Al-Baqarah"},
    {q:"Which Surah is known as 'The Heart of the Qur’an'?", options:["Yasin","Al-Fatiha","Al-Kahf"], answer:"Yasin"},
    {q:"Which Surah is recited in every prayer?", options:["Al-Fatiha","Al-Ikhlas","Al-Baqarah"], answer:"Al-Fatiha"},
    {q:"Which Surah tells the story of the people of the cave?", options:["Al-Kahf","Yasin","Al-Mulk"], answer:"Al-Kahf"}
  ],
  prayers: [
    {q:"How many daily prayers are there?", options:["3","5","7"], answer:"5"},
    {q:"Which prayer is performed at dawn?", options:["Fajr","Maghrib","Isha"], answer:"Fajr"},
    {q:"Which prayer is the last of the day?", options:["Isha","Asr","Dhuhr"], answer:"Isha"},
    {q:"Which prayer is performed at noon?", options:["Dhuhr","Asr","Maghrib"], answer:"Dhuhr"},
    {q:"Which prayer is performed in the afternoon?", options:["Asr","Fajr","Isha"], answer:"Asr"}
  ],
  pillars: [
    {q:"How many pillars of Islam are there?", options:["4","5","6"], answer:"5"},
    {q:"What is Zakat?", options:["Prayer","Charity","Fasting"], answer:"Charity"},
    {q:"Which pillar is the declaration of faith?", options:["Shahada","Salah","Hajj"], answer:"Shahada"},
    {q:"Which pillar involves fasting in Ramadan?", options:["Sawm","Hajj","Zakat"], answer:"Sawm"},
    {q:"Which pillar requires pilgrimage to Mecca?", options:["Hajj","Salah","Shahada"], answer:"Hajj"}
  ],
  names: [
    {q:"How many names of Allah are there?", options:["99","100","120"], answer:"99"},
    {q:"Which name means 'The Merciful'?", options:["Ar-Rahman","Al-Quddus","Al-Malik"], answer:"Ar-Rahman"},
    {q:"Which name means 'The Provider'?", options:["Ar-Razzaq","Al-Aziz","Al-Hakeem"], answer:"Ar-Razzaq"},
    {q:"Which name means 'The Wise'?", options:["Al-Hakeem","Al-Quddus","Ar-Rahman"], answer:"Al-Hakeem"},
    {q:"Which name means 'The Source of Peace'?", options:["As-Salam","Al-Malik","Ar-Razzaq"], answer:"As-Salam"}
  ],
  ablution: [
    {q:"What is Wudu?", options:["Prayer","Ablution","Charity"], answer:"Ablution"},
    {q:"Which body part is washed first in Wudu?", options:["Face","Hands","Feet"], answer:"Hands"},
    {q:"How many times should one wash the mouth?", options:["Once","Three times","Five times"], answer:"Three times"},
    {q:"Is wiping over socks allowed in Wudu?", options:["Yes","No","Sometimes"], answer:"Yes"},
    {q:"What invalidates Wudu?", options:["Sleeping","Eating","Sitting"], answer:"Sleeping"}
  ]
};

// ---------------------- Quiz Logic ----------------------

// Containers
const quizCardsContainer = document.querySelector('.quiz-cards'); // The cards themselves
const quizQuestionsContainer = document.getElementById('quizQuestions'); // Separate container for questions
const scoreDisplay = document.getElementById('scoreDisplay');         // Score display

let currentScore = 0;
let currentQuestionIndex = 0;
let currentQuizType = "";

// Add click events to each quiz card
document.querySelectorAll('.quiz-card').forEach(card => {
  card.addEventListener('click', () => {
    currentQuizType = card.dataset.quiz;
    currentQuestionIndex = 0;
    currentScore = 0;
    scoreDisplay.textContent = '';
    displayQuestion();
  });
});

// Function to display questions
function displayQuestion() {
  quizQuestionsContainer.innerHTML = ''; // clear previous question
  const quiz = quizzes[currentQuizType];

  if (!quiz || currentQuestionIndex >= quiz.length) {
    quizQuestionsContainer.innerHTML = `<h3>Quiz Completed! Your score: ${currentScore} / ${quiz.length}</h3>`;
    return;
  }

  const qObj = quiz[currentQuestionIndex];
  const qDiv = document.createElement('div');
  qDiv.style.background = '#e0f2f1';
  qDiv.style.padding = '20px';
  qDiv.style.borderRadius = '10px';
  qDiv.style.width = '80%';
  qDiv.style.textAlign = 'center';
  qDiv.style.margin = '10px auto';

  // Question text
  const qText = document.createElement('p');
  qText.textContent = `${currentQuestionIndex + 1}. ${qObj.q}`;
  qDiv.appendChild(qText);

  // Options buttons
  qObj.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.style.margin = '5px';
    btn.style.padding = '8px 15px';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', () => {
      if (opt === qObj.answer) currentScore++;
      currentQuestionIndex++;
      displayQuestion();
    });

    qDiv.appendChild(btn);
  });

  quizQuestionsContainer.appendChild(qDiv);
  scoreDisplay.textContent = `Score: ${currentScore} / ${quiz.length}`;
}

// Reset button
const resetBtn = document.getElementById('resetQuiz');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    quizQuestionsContainer.innerHTML = '';
    scoreDisplay.textContent = '';
    currentScore = 0;
    currentQuestionIndex = 0;
    currentQuizType = '';
  });
}

  // ---------------------- Contact Form ----------------------
  const contactForm = document.getElementById('contactForm');
  const contactPopup = document.getElementById('contactPopup');
  const contactBtn = document.getElementById('contactBtn');
  const closePopup = document.getElementById('closePopup');

  // Open popup
  contactBtn.addEventListener('click', () => {
    contactPopup.style.display = 'flex';
  });

  // Close popup when clicking "x"
  closePopup.addEventListener('click', () => {
    contactPopup.style.display = 'none';
  });

  // Close popup if clicking outside of it
  window.addEventListener('click', e => {
    if(e.target === contactPopup) contactPopup.style.display = 'none';
  });

  // Handle form submission with EmailJS
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent page reload
    emailjs.sendForm('service_xtduavr', 'template_o2fkjcp', this)
      .then(() => {
        alert('Message sent successfully!');
        contactPopup.style.display = 'none';
        contactForm.reset(); // clear form
      })
      .catch(err => {
        console.error('EmailJS Error:', err);
        alert('Failed to send message. Please try again later.');
      });
  });

}); // <-- End of DOMContentLoaded
