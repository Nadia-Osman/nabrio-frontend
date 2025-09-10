document.addEventListener('DOMContentLoaded', () => {

  // ---------------------- Prayer Alarms ----------------------
  // Predefined prayer times (24-hour format)
  const prayers = {
    Fajr: "05:00",
    Dhuhr: "12:30",
    Asr: "15:45",
    Maghrib: "18:15",
    Isha: "19:45"
  };

  // Getting important DOM elements by their IDs
  const setAlarmBtn = document.getElementById("setAlarmBtn");
  const previewBtn = document.getElementById("previewBtn");
  const stopBtn = document.getElementById("stopBtn");
  const azanAudio = document.getElementById("azanAudio");
  const azanSelect = document.getElementById("azanSelect");
  const alarmMsg = document.getElementById("alarmMsg");

  // Store active alarms here (so each prayer has its own timeout)
  let alarms = {};

  // ---------------------- Preview & Stop Azan ----------------------
  // Preview button plays the selected Azan without waiting for prayer time
  if(previewBtn && azanAudio && azanSelect) {
    previewBtn.addEventListener("click", () => {
      azanAudio.src = azanSelect.value;  // set audio source to selected file
      azanAudio.play();                  // play immediately
    });
  }

  // Stop button pauses and resets the Azan audio
  if(stopBtn && azanAudio) {
    stopBtn.addEventListener("click", () => {
      azanAudio.pause();                 // stop playing
      azanAudio.currentTime = 0;         // rewind to beginning
    });
  }

  // ---------------------- Set Alarm ----------------------
  // This listens for when the user clicks "Set Alarm"
  if(setAlarmBtn) {
    setAlarmBtn.addEventListener("click", () => {
      // Fetch dropdowns and input fields
      const prayerSelect = document.getElementById("prayerSelect");
      const customTimeInput = document.getElementById("alarmTime");
      const minutesBeforeSelect = document.getElementById("minutesBefore");

      // If any important field is missing, stop here
      if(!prayerSelect || !minutesBeforeSelect) return;

      const prayer = prayerSelect.value;                    // selected prayer
      const customTime = customTimeInput ? customTimeInput.value : "";  // custom user time
      const offset = minutesBeforeSelect.value;             // offset (e.g. 5 mins before)
      const azan = azanSelect ? azanSelect.value : "";      // selected Azan

      // Use custom time if provided, otherwise fallback to default prayer time
      let timeToSet = customTime || prayers[prayer];

      // Call function to actually set the alarm
      setPrayerAlarm(prayer, timeToSet, offset, azan);
    });
  }

  // ---------------------- Function to Set Alarm ----------------------
  function setPrayerAlarm(prayer, time, offset, azan) {
    const now = new Date();
    let [hour, minute] = time.split(":").map(Number);  // split "HH:MM"

    // Adjust minutes if user wants alarm before prayer time
    if(offset !== "onTime") minute -= parseInt(offset);

    // Create a new Date object for the alarm
    const alarmTime = new Date();
    alarmTime.setHours(hour, minute, 0, 0);

    // If alarm time is in the past, schedule it for tomorrow
    if(alarmTime <= now) alarmTime.setDate(alarmTime.getDate() + 1);

    // Calculate time difference between now and alarm
    const timeout = alarmTime - now;

    // If alarm already exists for this prayer, clear it before resetting
    if(alarms[prayer]) clearTimeout(alarms[prayer]);

    // Save timeout so we can manage alarms later
    alarms[prayer] = setTimeout(() => {
      if(azanAudio) {
        azanAudio.src = azan;   // set Azan audio
        azanAudio.play();       // play Azan
      }
      alert(`Time for ${prayer} prayer!`); // notify user

      // Re-schedule alarm for the next day
      setPrayerAlarm(prayer, time, offset, azan);
    }, timeout);

    // Update message area to let the user know alarm is set
    if(alarmMsg) {
      alarmMsg.textContent = `${prayer} alarm set ${offset === "onTime" ? "on time" : offset + " minutes before"} prayer.`;
    }
  }

  // ---------------------- Collapsible Prayer Steps ----------------------
  // Add toggle behavior to collapsible buttons (for "How to Pray" steps)
  document.querySelectorAll('.collapsible').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;  // the hidden content after button
      // Toggle between show/hide
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });

});
