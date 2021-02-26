import sqlite3
from sqlite3 import Error

class Database:
    connection = None
    cursor = None

    def __init__(self):
        print('Database()')
        self.connect()

    def connect(self):
        print('Database::connect()')
        database = "../csv/sias_db.db"
        try:
            self.connection = sqlite3.connect(database)
            self.cursor = self.connection.cursor()
        except Error as e:
            print(e)

    def _execute(self, query, params):
        print('Database::execute(', query, ', ', params, ')')
        self.cursor.execute(query, params)

    def fetch_one(self, query, params):
        print('Database::fetch_one(', query, ', ', params, ')')
        self._execute(query, params)
        return self.cursor.fetchone()

    def fetch_many(self, query, params, size):
        print('Database::fetch_many(', query, ', ', params, ', ', size, ')')
        self._execute(query, params)
        return self.cursor.fetchmany(size)

    def fetch_all(self, query, params):
        print('Database::fetch_all(', query, ', ', params, ')')
        self._execute(query, params)
        return self.cursor.fetchall()

    def close(self):
        self.connection.close()
