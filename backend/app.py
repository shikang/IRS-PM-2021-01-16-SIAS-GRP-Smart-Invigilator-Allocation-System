import flask
import flask_cors
from flask import Flask
from flask_cors import cross_origin
from flask import jsonify
from flask import request
import db
import requests
import threading
from random import randrange
import time
import numpy

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
    duty_record = database.fetch_all('SELECT Day, Time, Length, Mod, Room, Type, ID, CI FROM Duties', ())
    for duty in duty_record:
        data['duty'].append({
            'day': duty[0],
            'time': duty[1],
            'length': duty[2],
            'module': duty[3],
            'room': duty[4],
            'type': duty[5],
            'id': duty[6],
            'ci': duty[7]
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
    duty_record = database.fetch_all('SELECT Day, Time, Length, Mod, Room, Type, ID, CI FROM Duties', ())
    for duty in duty_record:
        data['duty'].append({
            'day': duty[0],
            'time': duty[1],
            'length': duty[2],
            'module': duty[3],
            'room': duty[4],
            'type': duty[5],
            'id': duty[6],
            'ci': duty[7]
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
    allocation_record = database.fetch_all('SELECT d.Day, d.Time, d.Length, d.Mod, d.Room, d.Type, s.Lecturer, d.CI FROM Duties AS d INNER JOIN Allocation AS a ON a.DutyId = d.ID INNER JOIN Staffs AS s ON a.LecturerId = s.ID', ())
    for allocation in allocation_record:
        data['allocation'].append({
            'day': allocation[0],
            'time': allocation[1],
            'length': allocation[2],
            'module': allocation[3],
            'room': allocation[4],
            'type': allocation[5],
            'staff': allocation[6],
            'ci': allocation[7]
        })

    database.close()

    return jsonify(data)

@app.route(API_PREFIX + '/allocation/status', methods=['GET'])
@cross_origin()
def get_allocation_status():
    data = {
        'status': 'Done'
    }

    # Get Database
    database = db.Database()

    # Get Allocation Status
    allocation_status = database.fetch_one('SELECT Status FROM Status WHERE Type=:type ', ('Allocation',))

    if allocation_status[0] != 0:
        data['status'] = 'Running'
    
    return jsonify(data)
    
@app.route(API_PREFIX + '/allocation/start', methods=['POST'])
@cross_origin()
def start_allocation():
    data = {
        'started': True
    }

    request_body = {
        "dutyList": [],
        "staffList": []
    }

    # Get Database
    database = db.Database()

    # Get Allocation Status
    allocation_status = database.fetch_one('SELECT Status FROM Status WHERE Type=:type ', ('Allocation',))

    print('Allocation Status: ' + str(allocation_status[0]))
    if allocation_status[0] != 0:
        data['started'] = False
        return jsonify(data)

    database.execute('Update Status SET Status = ? WHERE Type = ?', (1, 'Allocation'))

    # Get All Duties
    duty_record = database.fetch_all('SELECT ID, Day, Time, Length, Mod, Room, Type, CI FROM Duties', ())
    for duty in duty_record:
        request_body['dutyList'].append({
            'id': duty[0],
            'day': duty[1],
            'time': duty[2],
            'length': duty[3],
            'module': duty[4],
            'room': duty[5],
            'type': duty[6],
            'ci': duty[7],
        })

    # Get All Preference
    pref_record = database.fetch_all('SELECT Staff, Preference1, Preference2, Preference3, Timestamp FROM Preferences UNION SELECT s.Lecturer AS Staff, NULL AS Preference1, NULL AS Preference2, NULL AS Preference3, NULL AS Timestamp FROM Staffs s WHERE s.Lecturer NOT IN (SELECT Staff FROM Preferences)', ())
    for pref in pref_record:
        request_body['staffList'].append({
            'name': pref[0],
            'preference1': pref[1],
            'preference2': pref[2],
            'preference3': pref[3],
            'timestamp': pref[4]
        })

    #pref_record = database.fetch_all('SELECT Lecturer FROM Staffs', ())
    #for pref in pref_record:
    #    request_body['staffList'].append({
    #        'name': pref[0],
    #        'preference1': None,
    #        'preference2': None,
    #        'preference3': None,
    #        'timestamp': None
    #    })

    #now = int(time.time()) 
    #count = 0
    #total = 0
    #min_val = now
    #max_val = 0
    #for s in request_body['staffList']:
    #    val = now - s['timestamp']
    #    count = count + 1
    #    total = total + val
    #
    #    if min_val > val:
    #        min_val = val
    #
    #    if max_val < val:
    #        max_val = val
    #
    #mean_val = float(total) / float(count)
    #for s in request_body['staffList']:
    #    val = now - s['timestamp']
    #    s['timestamp'] = (float(val - mean_val) / float(max_val - min_val) + 1.0) / 2.0

    t_list = []
    for s in request_body['staffList']:
        t_list.append(s['timestamp'])

    it_list = numpy.argsort(t_list)
    for i in range(len(it_list)):
        request_body['staffList'][i]['timestamp'] = int(it_list[i])

    database.close()

    # Run solver in different thread
    solver_thread = threading.Thread(target=run_solver, name="Downloader", args=[request_body])
    solver_thread.start()

    return jsonify(data)

def run_solver(request_body):
    print('Running solver n background...')

    # Send Schedule request
    res = requests.post('http://localhost:8080/timeTable/solve', json=request_body, timeout=4000)
    print('Solver: ' + res.text)

    # Get Database
    database = db.Database()

    database.execute('DELETE FROM Allocation', ())

    # Add results to database (Should execute without commit)
    data = res.json()
    for duty in data['dutyList']:
        if 'staff' in duty :
            print("Allocation - Duty: " + str(duty['id']) + " | Staff: " + duty['staff']['name'])

            # Should combine query
            staff_id = database.fetch_one('SELECT ID FROM Staffs WHERE Lecturer = ?', (duty['staff']['name'],))

            # Should do batch insert
            database.execute('INSERT INTO Allocation (DutyId, LecturerId) VALUES(?, ?)', (duty['id'], staff_id[0]))
        else:
            print("Allocation - Duty: " + str(duty['id']) + " | NOT ALLOCATED")

    # Update status
    database.execute('Update Status SET Status = ? WHERE Type = ?', (0, 'Allocation'))

    database.close()

@app.route(API_PREFIX + '/allocation/random', methods=['POST'])
@cross_origin()
def start_allocation_with_rand_pref():
    data = {
        'started': True
    }

    request_body = {
        "dutyList": [],
        "staffList": []
    }

    # Get Database
    database = db.Database()

    # Get Allocation Status
    allocation_status = database.fetch_one('SELECT Status FROM Status WHERE Type=:type ', ('Allocation',))

    print('Allocation Status: ' + str(allocation_status[0]))
    if allocation_status[0] != 0:
        data['started'] = False
        return jsonify(data)

    database.execute('Update Status SET Status = ? WHERE Type = ?', (1, 'Allocation'))

    # Get All Duties
    duty_record = database.fetch_all('SELECT ID, Day, Time, Length, Mod, Room, Type, CI FROM Duties', ())
    for duty in duty_record:
        request_body['dutyList'].append({
            'id': duty[0],
            'day': duty[1],
            'time': duty[2],
            'length': duty[3],
            'module': duty[4],
            'room': duty[5],
            'type': duty[6],
            'ci': duty[7],
        })

    now = int(time.time()) 

    pref_record = database.fetch_all('SELECT Lecturer FROM Staffs', ())
    for pref in pref_record:
        request_body['staffList'].append({
            'name': pref[0],
            'preference1': randrange(len(duty_record) + 1),
            'preference2': randrange(len(duty_record) + 1),
            'preference3': randrange(len(duty_record) + 1),
            'timestamp': now + randrange(1000) - 500
        })

    #count = 0
    #total = 0
    #min_val = now + 500
    #max_val = 0
    #for s in request_body['staffList']:
    #    val = now + 500 - s['timestamp']
    #    count = count + 1
    #    total = total + val
    #
    #    if min_val > val:
    #        min_val = val
    #
    #    if max_val < val:
    #        max_val = val
    #
    #mean_val = float(total) / float(count)
    #for s in request_body['staffList']:
    #    val = now + 500 - s['timestamp']
    #    s['timestamp'] = (float(val - mean_val) / float(max_val - min_val) + 1.0) / 2.0

    t_list = []
    for s in request_body['staffList']:
        t_list.append(s['timestamp'])

    it_list = numpy.argsort(t_list)
    for i in range(len(it_list)):
        request_body['staffList'][i]['timestamp'] = int(it_list[i])

    database.close()

    # Run solver in different thread
    solver_thread = threading.Thread(target=run_solver, name="Downloader", args=[request_body])
    solver_thread.start()

    return jsonify(data)

app.run(host='0.0.0.0')