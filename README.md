# SIAS

## Tested on

OS: Ubuntu-18.04 / Ubuntu-20.04

Browser: Firefox 85.0.1


## Download the Package and Extract the content

1. Extract the Package from GitHub and move into "/sias" directory (First time only)
```shell
git clone https://github.com/shikang/IRS-PM-2021-01-16-SIAS-GRP-Smart-Invigilator-Allocation-System
sudo mv IRS-PM-2021-01-16-SIAS-GRP-Smart-Invigilator-Allocation-System /sias
cd /sias
```

## Frontend
To run frontend locally

1. Install Node Package Manager (First time only) 
```shell
sudo apt update
sudo apt install npm
```

2. Navigate to "/sias/frontend" directory
```shell
cd /sias/frontend
```

3. Install dependencies
```shell
npm install
```

## Backend
To run backend locally

1. Navigate back to "sias" directory
```shell
cd /sias
```

2. Install curl (if required)
```shell
sudo apt install curl
```

3. Install anaconda (First time only) 
```shell
curl -O https://repo.anaconda.com/archive/Anaconda3-2019.03-Linux-x86_64.sh
bash Anaconda3-2019.03-Linux-x86_64.sh
```

4. Create clean "sias" conda environment (First time only) 
```shell
conda create -n sias python=3.6
```
5. Activate "sias" conda environment
```shell
conda activate sias
```

7. Navigate to "/sias/backend" directory
```shell
cd /sias/backend
```

6. Install dependencies
```shell
pip install -r requirements.txt
```

## Scheduler
To run scheduler service locally

1. Navigate back to "/sias" directory
```shell
cd /sias
```

2. Install JDK 1.8+ (First time only) 
```shell
sudo apt install default-jdk
```

3. Navigate to "sias/scheduler/code-with-quarkus" directory
```shell
cd /sias/scheduler/code-with-quarkus
```

## Start all the processes in seperate Terminals
1. Start Frontend
Open new terminal
```shell
cd /sias/frontend
npm start
```

2. Start Backend
Open new terminal
```shell
cd /sias/backend
python app.py
```

3. Start the Scheduler application
Open new terminal
```shell
cd /sias/scheduler/code-with-quarkus
./mvnw compile quarkus:dev
```
