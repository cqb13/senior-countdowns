import json
from datetime import datetime

current_date = datetime.strptime("2025-02-25", "%Y-%m-%d")
grad_date = datetime.strptime("2025-06-08", "%Y-%m-%d")

with open("../assets/data/clean_calendar.json", "r") as file:
    events = json.load(file)

school_days = [
    event
    for event in events
    if (
        event["Title"] == "Day A"
        or event["Title"] == "Day B"
        or event["Title"] == "Day C"
        or event["Title"] == "Day D"
        or event["Title"] == "Day E"
        or event["Title"] == "Day F"
        or event["Title"] == "Day G"
    )
    and datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d") > current_date
    and datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d") < grad_date
]

school_days.sort(
    key=lambda event: datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d")
)

with open("../assets/data/school_days.json", "w") as file:
    json.dump(school_days, file, indent=4)

print("Filtered, sorted, and saved to school_days.json.")
