async function startCountdown(endDate, daysID, hoursID, minutesID, secondsID) {
  async function updateCountdown() {
    const currentDate = new Date();

    const timeDifference = new Date(endDate) - currentDate;

    if (timeDifference <= 0) {
      document.getElementById(daysID).textContent = "00";
      document.getElementById(hoursID).textContent = "00";
      document.getElementById(minutesID).textContent = "00";
      document.getElementById(secondsID).textContent = "00";
      clearInterval(countdownInterval);
      return;
    }

    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById(daysID).textContent = daysRemaining
      .toString()
      .padStart(2, "0");
    document.getElementById(hoursID).textContent = hoursRemaining
      .toString()
      .padStart(2, "0");
    document.getElementById(minutesID).textContent = minutesRemaining
      .toString()
      .padStart(2, "0");
    document.getElementById(secondsID).textContent = secondsRemaining
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();

  const countdownInterval = setInterval(updateCountdown, 1000);
}

//TODO: rewrite this to remove need to pass in all id names
async function loadCountdowns() {
  try {
    const response = await fetch("/assets/data/calendars/clean_calendar.json");
    const calendarData = await response.json();

    // Graduation
    const graduationEvent = calendarData.find(
      (event) => event.Title === "SHS GRADUATION",
    );

    if (!graduationEvent) {
      console.error("SHS Graduation event not found.");
      return;
    }

    const graduationDate = graduationEvent.Starts;

    calculateDaysOfWeekLeft(graduationDate);

    startCountdown(
      graduationDate,
      "grad-days",
      "grad-hours",
      "grad-minutes",
      "grad-seconds",
    );

    // Prom
    const promEvent = calendarData.find(
      (event) => event.Title === "Senior Prom",
    );

    if (!promEvent) {
      console.error("prom event not found.");
      return;
    }

    const promDate = promEvent.Starts;

    startCountdown(
      promDate,
      "prom-days",
      "prom-hours",
      "prom-minutes",
      "prom-seconds",
    );

    // Senior Awards
    const awardsEvent = calendarData.find(
      (event) => event.Title === "Senior Awards Night",
    );

    if (!awardsEvent) {
      console.error("awards event not found.");
      return;
    }

    const awardsDate = awardsEvent.Starts;

    startCountdown(
      awardsDate,
      "awards-days",
      "awards-hours",
      "awards-minutes",
      "awards-seconds",
    );

    // Hackathon
    const hackathonEvent = calendarData.find(
      (event) => event.Title === "Hackathon (with SMS students)",
    );

    if (!hackathonEvent) {
      console.error("hackathon event not found.");
      return;
    }

    const hackathonDate = hackathonEvent.Starts;

    startCountdown(
      hackathonDate,
      "hackathon-days",
      "hackathon-hours",
      "hackathon-minutes",
      "hackathon-seconds",
    );

    // AP Exam Week 1
    const apEvent = calendarData.find(
      (event) => event.Title === "AP Exams Week 1",
    );

    if (!apEvent) {
      console.error("ap event not found.");
      return;
    }

    const apDate = apEvent.Starts;

    startCountdown(apDate, "ap-days", "ap-hours", "ap-minutes", "ap-seconds");

    // Start Q4
    const q4Event = calendarData.find((event) => event.Title === "Start Q4");

    if (!q4Event) {
      console.error("Q4 event not found.");
      return;
    }

    const q4Date = q4Event.Starts;

    startCountdown(q4Date, "q4-days", "q4-hours", "q4-minutes", "q4-seconds");

    // Ivy Day
    startCountdown(
      "2025-03-27 19:00",
      "ivy-days",
      "ivy-hours",
      "ivy-minutes",
      "ivy-seconds",
    );
  } catch (error) {
    console.error("Error loading or processing the prom event:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadCountdowns);

async function loadLatinLunches() {
  try {
    const response = await fetch(
      "/assets/data/calendars/latin_lunch_days.json",
    );
    const lunches = await response.json();

    const currentDate = new Date();

    const upcomingLunches = lunches.filter((lunch) => {
      const lunchDate = new Date(lunch.Starts);
      return lunchDate > currentDate;
    });

    const latinLunchCounter = document.getElementById("latin-lunch-count");
    if (upcomingLunches.length > 0) {
      latinLunchCounter.textContent =
        upcomingLunches.length + " More Latin Lunches";
    } else {
      latinLunchCounter.innerHTML = "<p>No more Latin lunches :(</p>";
    }
  } catch (error) {
    console.error("Error loading Latin lunches:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadLatinLunches);

function calculateDaysOfWeekLeft(graduationEventStarts) {
  const graduationDate = new Date(graduationEventStarts);
  const currentDate = new Date();

  let fridaysCount = 0;
  let mondaysCount = 0;

  let currentDay = new Date(currentDate);
  currentDay.setDate(currentDay.getDate() + 1);
  while (currentDay <= graduationDate) {
    const dayOfWeek = currentDay.getDay();
    if (dayOfWeek === 5) {
      fridaysCount++;
    } else if (dayOfWeek === 1) {
      mondaysCount++;
    }

    currentDay.setDate(currentDay.getDate() + 1);
  }

  const mondayCounter = document.getElementById("monday-count");
  const fridayCounter = document.getElementById("friday-count");

  if (mondaysCount > 0) {
    mondayCounter.textContent = mondaysCount + " More Mondays";
  } else {
    mondayCounter.textContent = "No more Mondays left!";
  }

  if (fridaysCount > 0) {
    fridayCounter.textContent = fridaysCount + " More Fridays";
  } else {
    fridayCounter.textContent = "No more Fridays left!";
  }
}

async function loadSchoolDays() {
  try {
    const response = await fetch("/assets/data/calendars/school_days.json");
    const schoolDays = await response.json();

    const currentDate = new Date();

    let schoolDay = undefined;

    let isEarlyRelease = false;

    // Hours in day
    for (let i = 0; i < schoolDays.length; i++) {
      let [year, month, day] = schoolDays[i].Starts.split("-").map(Number);
      let schoolDate = new Date(year, month - 1, day);

      if (
        schoolDate.getFullYear() === currentDate.getFullYear() &&
        schoolDate.getMonth() === currentDate.getMonth() &&
        schoolDate.getDate() === currentDate.getDate()
      ) {
        schoolDay = schoolDate;
        if (schoolDays[i].Title.toLowerCase().includes("early release")) {
          isEarlyRelease = true;
        }
        break;
      }
    }

    if (schoolDay) {
      if (!isEarlyRelease) {
        schoolDay.setHours(14);
        schoolDay.setMinutes(20);
      } else {
        eodTitle.innerText = "Time Till Leave";
        schoolDay.setHours(11);
        schoolDay.setMinutes(40);
      }

      startCountdown(
        schoolDay,
        "eod-days",
        "eod-hours",
        "eod-minutes",
        "eod-seconds",
      );
    }

    const daysLeft = schoolDays.filter((days) => {
      const schoolDate = new Date(days.Starts);
      return schoolDate > currentDate;
    });

    const schoolDayCounter = document.getElementById("school-day-count");
    if (daysLeft.length > 0) {
      schoolDayCounter.textContent = daysLeft.length + " More School Days";
    } else {
      schoolDayCounter.innerHTML = "<p>No more school days!</p>";
    }
  } catch (error) {
    console.error("Error loading school days:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadSchoolDays);
