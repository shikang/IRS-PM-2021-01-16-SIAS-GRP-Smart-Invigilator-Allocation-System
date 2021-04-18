# SIAS

## Frontend
To run frontend locally

1. Install Node Package Manager (First time only) 
```shell
sudo apt update
sudo apt install npm
```

2. Navigate to directory
```shell
cd frontend
```

3. Install dependencies
```shell
npm install
```

4. Start Frontend
```shell
npm start
```

## Backend / Scheduled Task
To run backend locally

1. Create clean conda environment (First time only) 
```shell
conda create -n sias python=3.6
```

2. Navigate to directory
```shell
conda activate sias
cd backend
```

3. Install dependencies
```shell
pip install -r requirements.txt
```

4. Start Backend / Scheduled Task
```shell
python app.py
```

## Scheduler
Service for timetable scheduling

1. Install JDK 1.8+

2. Navigate to directory
```shell
cd scheduler/code-with-quarkus
```

3. Start the Scheduler application
```shell
./mvnw compile quarkus:dev
```

## View Allocation Page
To display the view allocation in table view
Library used: https://material-ui.com/components/tables/#data-table

1. install the core material-ui
'''
npm install @material-ui/core
'''

2. now intall the data-gird
'''
npm install @material-ui/data-grid
'''

Note: restart npm (if app is already running)
