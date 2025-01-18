import json
from datetime import datetime

with open("calendar.json", "r") as file:
    events = json.load(file)

cleaned_events = [
    event
    for event in events
    if (event["Starts"].startswith("2024") or event["Starts"].startswith("2025"))
    and (event["Ends"].startswith("2024") or event["Ends"].startswith("2025"))
]

cleaned_events.sort(
    key=lambda event: datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d")
)

with open("../assets/data/clean_calendar.json", "w") as file:
    json.dump(cleaned_events, file, indent=4)

print("Filtered, sorted, and saved to clean_calendar.json.")
