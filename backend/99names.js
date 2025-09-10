// ---------------------- 99 Names of Allah ----------------------
// Storing all 99 Names of Allah in an array
const namesOfAllah = [
  "Allah", "Ar-Rahman", "Ar-Rahim", "Al-Malik", "Al-Quddus", "As-Salam",
  "Al-Mu'min", "Al-Muhaymin", "Al-Aziz", "Al-Jabbar", "Al-Mutakabbir",
  "Al-Khaliq", "Al-Bari'", "Al-Musawwir", "Al-Ghaffar", "Al-Qahhar",
  "Al-Wahhab", "Ar-Razzaq", "Al-Fattah", "Al-‘Alim", "Al-Qabid", "Al-Basit",
  "Al-Khafid", "Ar-Rafi", "Al-Mu’izz", "Al-Mudhill", "As-Sami", "Al-Basir",
  "Al-Hakam", "Al-‘Adl", "Al-Latif", "Al-Khabir", "Al-Halim", "Al-Azim",
  "Al-Ghafur", "Ash-Shakur", "Al-‘Ali", "Al-Kabir", "Al-Hafiz", "Al-Muqit",
  "Al-Hasib", "Al-Jalil", "Al-Karim", "Ar-Raqib", "Al-Mujib", "Al-Wasi",
  "Al-Hakim", "Al-Wadud", "Al-Majid", "Al-Ba’ith", "Ash-Shahid", "Al-Haqq",
  "Al-Wakil", "Al-Qawiyy", "Al-Matin", "Al-Waliyy", "Al-Hamid", "Al-Muhsi",
  "Al-Mubdi", "Al-Mu’id", "Al-Muhyi", "Al-Mumit", "Al-Hayy", "Al-Qayyum",
  "Al-Wajid", "Al-Majid", "Al-Wahid", "As-Samad", "Al-Qadir", "Al-Muqtadir",
  "Al-Muqaddim", "Al-Mu’akhkhir", "Al-Awwal", "Al-Akhir", "Az-Zahir",
  "Al-Batin", "Al-Wali", "Al-Muta’ali", "Al-Barr", "At-Tawwab", "Al-Muntaqim",
  "Al-‘Afuww", "Ar-Ra’uf", "Malik-ul-Mulk", "Dhul-Jalali Wal-Ikram",
  "Al-Muqsit", "Al-Jami", "Al-Ghani", "Al-Mughni", "Al-Mani", "Ad-Darr",
  "An-Nafi", "An-Nur", "Al-Hadi", "Al-Badi", "Al-Baqi", "Al-Warith",
  "Ar-Rashid", "As-Sabur"
];

// ---------------------- Select Elements ----------------------
// Grabbing elements from the DOM
const namesContainer = document.getElementById('namesContainer');
const playPauseBtn = document.getElementById('playPauseBtn');
const asmaAudio = document.getElementById('asmaAudio');

// ---------------------- Load Names ----------------------
// Dynamically create a div for each name and append it to container
namesOfAllah.forEach((name, index) => {
  const div = document.createElement('div');
  div.textContent = `${index + 1}. ${name}`;   // numbering each name
  div.classList.add('allah-name');             // CSS styling
  namesContainer.appendChild(div);             // add to grid
});

// Store all divs for highlighting later
const allNameDivs = document.querySelectorAll('.allah-name');

// ---------------------- Play / Pause ----------------------
// Toggle play/pause for recitation
playPauseBtn.addEventListener('click', () => {
  if (asmaAudio.paused) {
    asmaAudio.play();
    playPauseBtn.textContent = "⏸ Pause Recitation"; // update button text
  } else {
    asmaAudio.pause();
    playPauseBtn.textContent = "▶️ Play Recitation";
  }
});

// ---------------------- Approximate Timestamps ----------------------
// NOTE: This part creates estimated start times for highlighting
// (In real case, exact timestamps of audio should be used)
const timestamps = [];
for (let i = 0; i < namesOfAllah.length; i++) {
  timestamps.push((i * asmaAudio.duration) / namesOfAllah.length);
}

// ---------------------- Highlight Timing Logic ----------------------
// We define when each name should be highlighted
const nameTimings = [];

// 1st name starts at 0s
nameTimings.push(0);

// 2nd name starts at 11s
nameTimings.push(11);

// Example: Grouped intervals
// Some names 2 seconds apart, some 1s, others custom like 3s
// (Done manually for sync with recitation)
for (let i = 2; i <= 5; i++) {
  nameTimings.push(nameTimings[i - 1] + 2);
}
for (let i = 6; i <= 7; i++) {
  nameTimings.push(nameTimings[i - 1] + 1);
}
// ... (this same logic continues all the way till 99th name)
// You have customized intervals like 1s, 2s, or 3s to match recitation speed

// ---------------------- Highlight Logic ----------------------
// Highlight the current name as the audio plays
asmaAudio.addEventListener('timeupdate', () => {
  const currentTime = asmaAudio.currentTime;

  // Find current index by comparing audio time with our timings
  let currentIndex = nameTimings.findIndex((startTime, i) => {
    return currentTime >= startTime && 
           (i === nameTimings.length - 1 || currentTime < nameTimings[i + 1]);
  });

  // Remove previous highlights
  allNameDivs.forEach(div => div.classList.remove('highlight'));

  // Highlight the current name
  if (currentIndex !== -1) {
    allNameDivs[currentIndex].classList.add('highlight');
  }
});

// ---------------------- Highlight + Grid Style ----------------------
// Adding custom CSS styling for the grid and highlights
const style = document.createElement('style');
style.textContent = `
  #namesContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    margin: 20px 0;
  }

  .allah-name {
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  .allah-name:hover {
    background: #e8f5e9;
    transform: scale(1.05);
  }

  .allah-name.highlight {
    background: #2e7d32;
    color: #fff;
    font-weight: bold;
    border: 2px solid #1b5e20;
    border-radius: 6px;
  }
`;
document.head.appendChild(style);
