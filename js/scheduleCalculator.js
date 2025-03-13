async function getSchedule() {
  const response = await fetch("/assets/data/calendars/school_days.json");
  const schoolDays = await response.json();

  const currentDate = new Date();

  let schoolDay = undefined;
  let dayInfo = undefined;
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
      dayInfo = schoolDays[i];
      if (schoolDays[i].Title.toLowerCase().includes("early release")) {
        isEarlyRelease = true;
      }
      break;
    }
  }

  if (schoolDay) {
    let day = dayInfo.Title.split(" ")[1];
    let currentTimeString =
      currentDate.getHours() + ":" + currentDate.getMinutes();
    let schedule = undefined;

    if (!isEarlyRelease) {
      const scheduleResponsee = await fetch(
        "/assets/data/schedules/fullDayScheduleTemplate.json",
      );
      schedule = await scheduleResponsee.json();
    } else {
      const scheduleResponsee = await fetch(
        "/assets/data/schedules/halfDayScheduleTemplate.json",
      );
      schedule = await scheduleResponsee.json();
    }

    schedule.currentDay = day;

    for (let i = 0; i < schedule.times.length; i++) {
      let start = schedule.times[i].start;
      let end = schedule.times[i].end;

      if (
        stringTimeIsGreaterThan(end, currentTimeString) == true &&
        stringTimeIsGreaterThan(start, currentTimeString) == false
      ) {
        schedule.currentPeriod = i + 1;
      }
    }

    document.getElementById("json").innerHTML = JSON.stringify(
      schedule,
      null,
      2,
    );
  }
}

// returns true if the string of first time is greater than the second, 8:23 > 7:40
// expects 24 hour time format
function stringTimeIsGreaterThan(first, second) {
  let firstSplit = first.split(":");
  let secondSplit = second.split(":");

  if (parseInt(firstSplit[0]) > parseInt(secondSplit[0])) {
    return true;
  } else if (parseInt(firstSplit[0]) < parseInt(secondSplit[0])) {
    return false;
  }

  if (parseInt(firstSplit[1]) > parseInt(secondSplit[1])) {
    return true;
  } else if (parseInt(firstSplit[1]) < parseInt(secondSplit[1])) {
    return false;
  }

  // used for checking if we are in next period, so if equal we want to say we are in next period
  return true;
}

getSchedule();
