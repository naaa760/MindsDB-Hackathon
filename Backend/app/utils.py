import matplotlib.pyplot as plt
import io
import base64
import threading
import time

def generate_report(df, avg_sleep, avg_steps, avg_active_minutes, avg_vitamin_c):
    report = f"""
Tommy's Health Analysis Report

1. Sleep
   Average sleep duration: {avg_sleep:.2f} hours
   Recommended: 9-10 hours for children aged 6-13
   Status: {'Below recommended' if avg_sleep < 9 else 'Within recommended range'}

2. Physical Activity
   Average daily steps: {avg_steps:.0f}
   Recommended: 10,000-12,000 steps for children
   Status: {'Below recommended' if avg_steps < 10000 else 'Within recommended range'}

   Average active minutes: {avg_active_minutes:.0f} minutes
   Recommended: At least 60 minutes of moderate to vigorous physical activity daily
   Status: {'Below recommended' if avg_active_minutes < 60 else 'Meets recommendations'}

3. Nutrition
   Average Vitamin C intake: {avg_vitamin_c:.2f} mg
   Recommended: 45 mg/day for children aged 6-8
   Status: {'Below recommended' if avg_vitamin_c < 45 else 'Meets or exceeds recommendations'}

Recommendations:
1. Sleep: {'Increase sleep duration to reach 9-10 hours per night.' if avg_sleep < 9 else 'Maintain current sleep schedule.'}
2. Physical Activity: {'Increase daily activity to reach 10,000 steps and 60 active minutes.' if avg_steps < 10000 or avg_active_minutes < 60 else 'Maintain current activity levels.'}
3. Nutrition: {'Increase Vitamin C intake through diet or supplements.' if avg_vitamin_c < 45 else 'Maintain current Vitamin C intake.'}
4. Hydration: Ensure adequate water intake throughout the day.
5. Wound Healing: Monitor wound healing progress and maintain good nutrition and sleep habits to support healing.
    """
    return report

def visualize_wearable_data(df):
    plt.figure(figsize=(12, 8))

    # Sleep duration over time
    plt.subplot(2, 2, 1)
    plt.plot(df['Date'], df['Sleep Analysis [In Bed] (hr)'], marker='o')
    plt.title('Sleep Duration Over Time')
    plt.xlabel('Date')
    plt.ylabel('Hours')
    plt.xticks(rotation=45)

    # Step count over time
    plt.subplot(2, 2, 2)
    plt.plot(df['Date'], df['Step Count (steps)'], marker='o')
    plt.title('Step Count Over Time')
    plt.xlabel('Date')
    plt.ylabel('Steps')
    plt.xticks(rotation=45)

    # Active minutes over time
    plt.subplot(2, 2, 3)
    plt.plot(df['Date'], df['Apple Exercise Time (min)'], marker='o')
    plt.title('Active Minutes Over Time')
    plt.xlabel('Date')
    plt.ylabel('Minutes')
    plt.xticks(rotation=45)

    # Vitamin C intake over time
    plt.subplot(2, 2, 4)
    plt.plot(df['Date'], df['Vitamin C (mg)'], marker='o')
    plt.title('Vitamin C Intake Over Time')
    plt.xlabel('Date')
    plt.ylabel('mg')
    plt.xticks(rotation=45)

    plt.tight_layout()
    
    # Save plot to a bytes buffer
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    plot_data = base64.b64encode(buffer.getvalue()).decode()
    plt.close()
    
    return plot_data
def remind_to_drink_water():
    # Implement water reminder logic
    pass

def remind_to_exercise():
    # Implement exercise reminder logic
    pass

def remind_to_stand_up():
    # Implement stand up reminder logic
    pass

# def remind_to_sleep():
#     while True:
#         now = datetime.now()
#         target_time = now.replace(hour=21, minute=45, second=0, microsecond=0)  # 9:45 PM
        
#         if now > target_time:
#             # If it's past 9:45 PM, set target for next day
#             target_time += timedelta(days=1)
        
#         time_until_reminder = (target_time - now).total_seconds()
#         time.sleep(time_until_reminder)
        
#         response ="🔔 Reminder: It's almost 10 PM. Time to wind down and prepare for sleep. Aim for 7-8 hours of rest."
#         # Wait for 15 minutes before checking again
#         time.sleep(900)
#     return response

def run_reminders():
    print("\nSetting up your personalized health reminders...")

    # Start reminder threads
    water_thread = threading.Thread(target=remind_to_drink_water, daemon=True)
    exercise_thread = threading.Thread(target=remind_to_exercise, daemon=True)
    standup_thread = threading.Thread(target=remind_to_stand_up, daemon=True)
    sleep_thread = threading.Thread(target=remind_to_sleep, daemon=True)

    # Start all threads
    water_thread.start()
    exercise_thread.start()
    standup_thread.start()
    sleep_thread.start()

    reminder_result = {
        "message": "Reminders set! You'll receive notifications to help you stay on track with your health goals.",
        "reminders": [
            "Don't forget to stay hydrated throughout the day!",
            "Take a moment to stand up and stretch!"
        ]
    }

    return reminder_result