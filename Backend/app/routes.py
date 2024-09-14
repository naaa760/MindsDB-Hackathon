from flask import Blueprint, request, jsonify
from app.recommender import Recommender, process_manual_entry
from app.utils import generate_report, visualize_wearable_data
import pymysql
import pandas as pd
recommender = Recommender()
recommender.recommend()
bp = Blueprint('main', __name__)


    # Rest of the function remains the same...
@bp.route('/api/symptoms', methods=["POST"])
def process_symptoms():
    data = request.json
    user_symptoms = data.get('symptoms', [])
    user_age = data.get('age')
    user_gender = data.get('gender')
    user_pregnant = data.get('pregnant', False)

    result = process_manual_entry(recommender, user_symptoms, user_age, user_gender, user_pregnant)
    return jsonify(result), 200


@bp.route('/api/wearable/analysis', methods=["GET"])
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
           # connect_timeout=30
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