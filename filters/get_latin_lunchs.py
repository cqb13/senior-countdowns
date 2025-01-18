import json
from datetime import datetime

current_date = datetime.strptime("2025-01-17", "%Y-%m-%d")
grad_date = datetime.strptime("2025-06-08", "%Y-%m-%d")

with open("../assets/data/clean_calendar.json", "r") as file:
    events = json.load(file)

latin_lunch_days = [
    event
    for event in events
    if event["Title"] == "Day F"
    and datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d") > current_date
    and datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d") < grad_date
]

latin_lunch_days.sort(
    key=lambda event: datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d")
)

with open("../assets/data/latin_lunch_days.json", "w") as file:
    json.dump(latin_lunch_days, file, indent=4)

print("Filtered, sorted, and saved to latin_lunch_days.json.")
