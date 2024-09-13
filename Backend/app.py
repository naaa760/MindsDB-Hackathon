from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import pymysql
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/symptoms', methods=["POST"])
def process_symptoms():
    """
    Receives: JSON with "symptoms" (list of strings), "age" (int), "gender" (string), and optionally "pregnant" (boolean)
    Returns: JSON with "general" (string) and "products" (list of product objects)
    """
    data = request.json
    # Process symptoms and generate recommendations (mock data for now)
    recommendation = {
        "general": "Ensure adequate Vitamin D intake. Consider fortified foods and safe sun exposure. Ensure adequate calcium intake. Consider dairy products and fortified plant milks. Increase magnesium intake. Good sources include nuts, seeds, and leafy greens.",
        "products": [
            {
                "name": "GNC Magnesium 500",
                "price": "86.55AUD",
                "link": "https://www.ebay.com.au/itm/175268074445",
                "image": "https://i.ibb.co/cvT8Bqd/Screenshot-2024-08-16-at-17-50-20-removebg-preview.png",
                "why": "• High-potency (500mg per serving) \n• Supports bone and muscle health \n• Aids nerve function and energy\n• May improve sleep quality"
            },
            {
                "name": "Pfeiffer Calcium & Magnesium",
                "price": "25.72AUD",
                "link": "https://au.iherb.com/pr/now-foods-calcium-magnesium-8-oz-227-g/455",
                "image": "https://i.ibb.co/p324tLY/Screenshot-2024-08-16-at-17-41-20-removebg-preview.png",
                "why": "• Balanced calcium and magnesium combo\n• Promotes bone density and strength\n• Supports muscle and nerve function\n• Cost-effective for dual mineral needs"
            }
        ]
    }
    return jsonify(recommendation), 200

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

@app.route('/api/wearable/analysis', methods=["GET"])
def analyze_wearable():
    """
    Receives: Nothing (assumes wearable data is fetched on the backend)
    Returns: JSON with health report including sleep, activity, nutrition data, recommendations, and a base64 encoded plot
    """
    try:
        connection = pymysql.connect(
            host='127.0.0.1',
            port=47335,
            user='mindsdb',
            password='',  # No password
            database='files',  # Assuming the data is in 'files' database
            connect_timeout=30
        )
        
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM data;")  # Replace 'data' with the actual table name if different
            columns = [col_desc[0] for col_desc in cursor.description]  # Get column names
            rows = cursor.fetchall()
            df = pd.DataFrame(rows, columns=columns)
        
        # Calculate average metrics
        avg_sleep = df['Sleep Analysis [In Bed] (hr)'].mean()
        avg_steps = df['Step Count (steps)'].mean()
        avg_active_minutes = df['Apple Exercise Time (min)'].mean()
        avg_vitamin_c = df['Vitamin C (mg)'].mean()

        # Generate the report
        report = generate_report(df, avg_sleep, avg_steps, avg_active_minutes, avg_vitamin_c)

        # Visualize the data
        plot_data = visualize_wearable_data(df)

        connection.close()

        return jsonify({
            "report": report,
            "plot": plot_data,
            "averages": {
                "sleep": avg_sleep,
                "steps": avg_steps,
                "active_minutes": avg_active_minutes,
                "vitamin_c": avg_vitamin_c
            }
        }), 200

    except pymysql.MySQLError as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 