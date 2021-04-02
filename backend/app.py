import flask
import flask_cors
from flask import Flask
from flask_cors import cross_origin
from flask import jsonify
from flask import request
import db

app = Flask(__name__)

API_PREFIX = '/api'

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
    

app.run(host='0.0.0.0')