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

async function loadCountdowns() {
  try {
    startCountdown(
      "2025-03-14 18:28",
      "mit-days",
      "mit-hours",
      "mit-minutes",
      "mit-seconds",
    );
  } catch (error) {
    console.error("Error loading or processing the prom event:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadCountdowns);
