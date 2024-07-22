from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# To handle CORS issues with React frontend
CORS(app) 
import sklearn

# Load the pre-trained model
svc = pickle.load(open("./models/svc.pkl", 'rb'))

# Symptoms dictionary and diseases list
symptoms_dict={'abdominal_pain': 0, 'abnormal_menstruation': 1, 'achy_feeling_in_upper_teeth': 2, 'acidity': 3, 'acute_liver_failure': 4, 'altered_sensorium': 5, 'anxiety': 6, 'areas_of_darkened_skin': 7, 'arrhythmia': 8, 'back_pain': 9, 'belly_pain': 10, 'blackheads': 11, 'bladder_discomfort': 12, 'bleeding_gum_or_nose': 13, 'blister': 14, 'blisters': 15, 'blood_in _sputum': 16, 'blood_in_sputum': 17, 'bloody_stool': 18, 'blurred_and_distorted_vision': 19, 'blurry_vision': 20, 'bone_pain': 21, 'breathing_in_unusual_pattern': 22, 'breathlessness': 23, 'brittle_nails': 24, 'bruising': 25, 'burning_micturition': 26, 'cardiac_arrhythmia': 27, 'changes_in_bowel_or_bladder_habits': 28, 'changes_in_bowel_patterns': 29, 'changes_in_menstrual_cycles': 30, 'changes_in_skin_color': 31, 'changes_to_existing_moles': 32, 'chest_pain': 33, 'chest_tightness': 34, 'chills': 35, 'chronic_diarrhea': 36, 'cold_hands_and_feets': 37, 'coma': 38, 'confused': 39, 'confusion': 40, 'congestion': 41, 'constipation': 42, 'continuous_feel_of_urine': 43, 'continuous_sneezing': 44, 'cough': 45, 'coughing': 46, 'coughing_wheezing_attacks_that_worsened_respiratory_virus_such_cold_flu': 47, 'cramps': 48, 'dark_urine': 49, 'darkening_or_redness_skin': 50, 'daytime_tiredness_sleepiness': 51, 'dehydration': 52, 'depression': 53, 'diarrhea': 54, 'diarrhoea': 55, 'difficulty_concentrating': 56, 'difficulty_falling_asleep_at_night': 57, 'difficulty_focusing': 58, 'difficulty_paying_attention_focusing_on_tasks': 59, 'difficulty_swallowing': 60, 'dischromic__patches': 61, 'discomfort_after_eating': 62, 'distention_of_abdomen': 63, 'dizziness': 64, 'drowsiness_slurred_speech': 65, 'dry_cough': 66, 'dry_red_scaly_patches_on_skin': 67, 'drying_and_tingling_lips': 68, 'enlarged_thyroid': 69, 'enlarged_thyroid_gland': 70, 'excessive_hunger': 71, 'excessive_thirst': 72, 'extra_marital_contacts': 73, 'eye_irritation': 74, 'eyesight_problems': 75, 'fainting': 76, 'falling_asleep_at_inappropriate_time': 77, 'family_history': 78, 'fast_heart_rate': 79, 'fatigue': 80, 'feel_full': 81, 'feel_like_eating': 82, 'feeling_elated': 83, 'feeling_irritable_or_mood_changes': 84, 'feeling_more_thirsty_than_usual': 85, 'feeling_unwell': 86, 'fever': 87, 'fever_low_increases_throughout_the_day': 88, 'fluid_accumulation_in_abdomen': 89, 'fluid_overload': 90, 'food_cravings': 91, 'foul_smell_of_urine': 92, 'foul_smelling_discharge_from_sore': 93, 'frequent_yawning': 94, 'getting_lot_of_infections': 95, 'goiter': 96, 'headache': 97, 'heartburn': 98, 'high_fever': 99, 'hip_joint_pain': 100, 'history_of_alcohol_consumption': 101, 'hoarseness': 102, 'increased_appetite': 103, 'increased_sensitivity_heat': 104, 'indigestion': 105, 'inflammatory_nails': 106, 'internal_itching': 107, 'irregular_heartbeat': 108, 'irregular_sleep_and_wake_cycle': 109, 'irregular_sugar_level': 110, 'irritability': 111, 'irritation': 112, 'irritation_in_anus': 113, 'itching': 114, 'itchy_skin': 115, 'joint_pain': 116, 'knee_pain': 117, 'lack_of_concentration': 118, 'larger_fluid_filled_blisters_on_trunk': 119, 'lethargy': 120, 'lightheadedness': 121, 'looking_pale': 122, 'loss_of_appetite': 123, 'loss_of_balance': 124, 'loss_of_consciousness': 125, 'loss_of_coordination': 126, 'loss_of_smell': 127, 'low_blood_pressure': 128, 'low_blood_sugar': 129, 'low_grade_fever': 130, 'lump_or_area_of_thickening_felt_under_skin': 131, 'malaise': 132, 'melancholy': 133, 'mild_fever': 134, 'mild_itchin': 135, 'mood_swings': 136, 'more_frequent_bowel_movements': 137, 'movement_stiffness': 138, 'mucoid_sputum': 139, 'muscle_aches': 140, 'muscle_pain': 141, 'muscle_wasting': 142, 'muscle_weakness': 143, 'nausea': 144, 'neck_pain': 145, 'nervousness': 146, 'night_sweats': 147, 'nightmares': 148, 'nodal_skin_eruptions': 149, 'numbness_or_tingling_in_hands_or_feet': 150, 'obesity': 151, 'oral_yeast_infection': 152, 'pain': 153, 'pain_behind_eyes': 154, 'pain_behind_the_eyes': 155, 'pain_during_bowel_movements': 156, 'pain_in_anal_region': 157, 'pain_in_lower_back _or_legs': 158, 'painful_fluid_or_pus_filled_sores': 159, 'painful_mouth_sores': 160, 'painful_walking': 161, 'pale_fingernails': 162, 'palpitations': 163, 'passage_of_gases': 164, 'patches_in_throat': 165, 'persistent_cough': 166, 'persistent_indigestion': 167, 'persistent_unexplained_fatigue': 168, 'persistent_unexplained_fevers_night_sweats': 169, 'persistent_unexplained_muscle_or_joint_pain': 170, 'persistent_white_spots_or_unusual_lesions_on_tongue': 171, 'phlegm': 172, 'pins_and_needles_sensations': 173, 'pneumonia': 174, 'polyuria': 175, 'pressure_fullness_in_cheeks_brow_or_forehead': 176, 'prominent_veins_on_calf': 177, 'puffy_face_and_eyes': 178, 'pus_filled_pimples': 179, 'rash': 180, 'receiving_blood_transfusion': 181, 'receiving_unsterile_injections': 182, 'recurring_fever': 183, 'red_sore_around_nose': 184, 'red_spots_over_body': 185, 'reddish_sores': 186, 'redness_of_eyes': 187, 'redness_palms_hands': 188, 'restlessness': 189, 'rheadache': 190, 'runny_nose': 191, 'rusty_sputum': 192, 'scurring': 193, 'seizures': 194, 'severe_itching': 195, 'severe_weakness': 196, 'shakiness': 197, 'shingles': 198, 'shivering': 199, 'silver_like_dusting': 200, 'sinus_pressure': 201, 'skin_changes': 202, 'skin_peeling': 203, 'skin_rash': 204, 'skin_rashes_bumps': 205, 'skin_without_hair': 206, 'sleep_problems': 207, 'slow_healing_sores': 208, 'slurred_speech': 209, 'small_dents_in_nails': 210, 'sore_muscles': 211, 'sore_neck': 212, 'sore_throat': 213, 'sores_around_nose_mouth': 214, 'sores_quickly_rupture': 215, "sores_that_won't_heal": 216, 'spinning_movements': 217, 'spotting__urination': 218, 'spread_of_sores_to_other_areas_through_touch': 219, 'stiff_neck': 220, 'stomach_bleeding': 221, 'stomach_pain': 222, 'stomach_upset': 223, 'stuffy_nose': 224, 'such_as_yellowing': 225, 'sudden_severe_pain_followed_by_numbness': 226, 'sunken_eyes': 227, 'sweating': 228, 'sweats': 229, 'swelled_lymph_nodes': 230, 'swelling': 231, 'swelling_at_base_of_neck': 232, 'swelling_joints': 233, 'swelling_of_stomach': 234, 'swollen_blood_vessels': 235, 'swollen_extremeties': 236, 'swollen_glands': 237, 'swollen_legs': 238, 'swollen_lymph_glands': 239, 'swollen_throat': 240, 'tachycardia': 241, 'tearing': 242, 'temperature_changes_regularly': 243, 'thick_black_phlegm': 244, 'thick_saliva': 245, 'thin_shiny_skin': 246, 'thinning_skin': 247, 'throat_irritation': 248, 'tingling_in_throat': 249, 'tingling_or_numbness_of_the_lips_tongue_or_cheek': 250, 'tiredness': 251, 'toxic_look_(typhos)': 252, 'tremor': 253, 'trouble_breathing': 254, 'trouble_falling_asleep_at_night': 255, 'trouble_sleeping': 256, 'trouble_swallowing': 257, 'ulcers_on_tongue': 258, 'unexplained_bleeding_bruising': 259, 'unsteadiness': 260, 'urinating_often': 261, 'urine stools or vomit': 262, 'urine_frequently_black_red': 263, 'vision_loss': 264, 'visual_disturbances': 265, 'visual_phenomena': 266, 'vomiting': 267, 'waking_up_during_night': 268, 'waking_up_too_early': 269, 'warm_moist_skin': 270, 'watering_from_eyes': 271, 'weakness': 272, 'weakness_in_limbs': 273, 'weakness_of_one_body_side': 274, 'weight_changes': 275, 'weight_gain': 276, 'weight_loss': 277, 'wheezing': 278, 'worsening_pain_if_bend_forward_or_lie_down': 279, 'yellow_crust_ooze': 280, 'yellow_urine': 281, 'yellowing_of_eyes': 282, 'yellowish_skin': 283}

diseases_list={0: '(Vertigo) Paroymsal  Positional Vertigo', 1: 'Acne', 2: 'Addisons Disease', 3: 'Aids', 4: 'Alcoholic Hepatitis', 5: 'Allergy', 6: 'Arthritis', 7: 'Asthma', 8: 'Bronchial Asthma', 9: 'Cancer', 10: 'Cervical Spondylosis', 11: 'Chicken Pox', 12: 'Chronic Cholestasis', 13: 'Cirrhosis', 14: 'Common Cold', 15: 'Dengue', 16: 'Dengue Fever', 17: 'Diabetes', 18: 'Diabetes ', 19: 'Dimorphic Hemmorhoids(Piles)', 20: 'Drug Reaction', 21: 'Fungal Infection', 22: 'Gangrene', 23: 'Gastroenteritis', 24: 'Gastroesophageal Reflux Disease', 25: 'Gerd', 26: 'Heart Attack', 27: 'Hepatitis A', 28: 'Hepatitis B', 29: 'Hepatitis C', 30: 'Hepatitis D', 31: 'Hepatitis E', 32: 'Hiv Aids', 33: 'Hypercalcemia', 34: 'Hypertension', 35: 'Hypertension ', 36: 'Hyperthyroidism', 37: 'Hypoglycemia', 38: 'Hypothyroidism', 39: 'Impetigo', 40: 'Insomnia', 41: 'Jaundice', 42: 'Kidney Stones', 43: 'Lichen Planus', 44: 'Lymphoma', 45: 'Malaria', 46: 'Migraine', 47: 'Migraine Headache', 48: 'Occupational Asthma', 49: 'Osteoarthristis', 50: 'Paralysis (Brain Hemorrhage)', 51: 'Peptic Ulcer Diseae', 52: 'Peripheral Nerve Injuries', 53: 'Pneumonia', 54: 'Psoriasis', 55: 'Salmonella', 56: 'Sinus Headaches', 57: 'Sleep Disorders', 58: 'Tuberculosis', 59: 'Typhoid', 60: 'Typhoid Fever', 61: 'Urinary Tract Infection', 62: 'Varicose Veins'}

# Load the description dataset
description = pd.read_csv("./datasets/description.csv")

def helper(predicted_disease):
    desc = description[description['Disease'] == predicted_disease]['Description'].values
    specialists = description[description['Disease'] == predicted_disease]['Specialist'].values
    
    desc = " ".join([w for w in desc])
    specialists = ", ".join([s for s in specialists])
    
    return desc,specialists

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms_str = data.get('symptoms', [])[0]  # Assuming symptoms are passed as a single string in a list
    symptoms = symptoms_str.strip("[]' ").split(',')
    
    symptoms = [symptom.strip() for symptom in symptoms]
    print(symptoms)
   # Create input for model
    input_data = np.zeros(len(symptoms_dict))
    for symptom in symptoms:
        if symptom in symptoms_dict:
            input_data[symptoms_dict[symptom]] = 1
    
    # Predict disease
    prediction = svc.predict([input_data])[0]
    predicted_disease = diseases_list[prediction]
    desc,specialists = helper(predicted_disease)

    return jsonify({'disease': predicted_disease,'description':desc,'specialists':specialists})

if __name__ == '__main__':
    app.run()
    