import flask
import flask_cors
from flask import Flask
from flask_cors import cross_origin
from flask import jsonify
from flask import request
import db

app = Flask(__name__)

API_PREFIX = '/api'

# -------------------------- Preference API --------------------------
@app.route(API_PREFIX + '/preference/info', methods=['GET'])
@cross_origin()
def get_all_info():
    data = {
        'staff': [],
        'module': [],
        'duty': []
    }

    # Get Database
    database = db.Database()

    # Get All Staff
    staff_record = database.fetch_all('SELECT Lecturer FROM Staffs', ())
    for staff in staff_record:
        data['staff'].append(staff[0])

    # Get All Modules
    mod_record = database.fetch_all('SELECT Mod FROM Modules', ())
    for mod in mod_record:
        data['module'].append(mod[0])

    # Get All Duties
    duty_record = database.fetch_all('SELECT Day, Time, Length, Mod, Room, Type, ID FROM Duties', ())
    for duty in duty_record:
        data['duty'].append({
            'day': duty[0],
            'time': duty[1],
            'length': duty[2],
            'module': duty[3],
            'room': duty[4],
            'type': duty[5],
            'id': duty[6]
        })

    database.close()

    return jsonify(data)

@app.route(API_PREFIX + '/preference/add', methods=['POST'])
@cross_origin()
def set_preference():
    data = {
        'id': -1
    }

    staff = request.json['staff']
    preference1 = request.json['preference1']
    preference2 = request.json['preference2']
    preference3 = request.json['preference3']

    # Get Database
    database = db.Database()

    # Insert Preference
    inserted_row = database.execute('INSERT INTO Preferences (Staff, Preference1, Preference2, Preference3, Timestamp) VALUES(?, ?, ?, ?, strftime(\'%s\',\'now\'))', (staff, preference1, preference2, preference3))
    data['id'] = inserted_row

    database.close()

    return jsonify(data)

@app.route(API_PREFIX + '/preference/staff', methods=['GET'])
@cross_origin()
def get_all_staff_preferences():
    data = {
        'preference': [],
        'duty': []
    }

    # Get Database
    database = db.Database()

    # Get All Preference
    pref_record = database.fetch_all('SELECT Staff, Preference1, Preference2, Preference3, Timestamp FROM Preferences', ())
    for pref in pref_record:
        data['preference'].append({
            'staff': pref[0],
            'preferences': [pref[1], pref[2], pref[3]],
            'timestamp': pref[4]
        })

    # Get All Duties
    duty_record = database.fetch_all('SELECT Day, Time, Length, Mod, Room, Type, ID FROM Duties', ())
    for duty in duty_record:
        data['duty'].append({
            'day': duty[0],
            'time': duty[1],
            'length': duty[2],
            'module': duty[3],
            'room': duty[4],
            'type': duty[5],
            'id': duty[6]
        })

    database.close()

    return jsonify(data)

# -------------------------- Allocation API --------------------------
@app.route(API_PREFIX + '/allocation/staff', methods=['GET'])
@cross_origin()
def get_all_staff_allocations():
    data = {
        'allocation': []
    }

    # Get Database
    database = db.Database()

    # Get All Allocations
    allocation_record = database.fetch_all('SELECT d.Day, d.Time, d.Length, d.Mod, d.Room, d.Type, s.Lecturer FROM Duties AS d INNER JOIN Allocation AS a ON a.DutyId = d.ID INNER JOIN Staffs AS s ON a.LecturerId = s.ID', ())
    for allocation in allocation_record:
        data['allocation'].append({
            'day': allocation[0],
            'time': allocation[1],
            'length': allocation[2],
            'module': allocation[3],
            'room': allocation[4],
            'type': allocation[5],
            'staff': allocation[6]
        })

    database.close()

    return jsonify(data)
    

app.run(host='0.0.0.0')