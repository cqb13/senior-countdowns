import json
from datetime import datetime

current_date = datetime.strptime("2025-01-17", "%Y-%m-%d")
grad_date = datetime.strptime("2025-06-08", "%Y-%m-%d")


def run():
    with open("../assets/data/clean_calendar.json", "r") as file:
        events = json.load(file)

    filtered_events = []
    for event in events:
        if event["Title"] == "SHS GRADUATION":
            print("Stopping processing at SHS GRADUATION.")
            break
        filtered_events.append(event)

    latin_lunch_days = [event for event in filtered_events if event["Title"] == "Day F"]

    latin_lunch_days.sort(
        key=lambda event: datetime.strptime(event["Starts"].split(" ")[0], "%Y-%m-%d")
    )

    with open("../assets/data/latin_lunch_days.json", "w") as file:
        json.dump(latin_lunch_days, file, indent=4)

    print("Filtered, sorted, and saved to latin_lunch_days.json.")
