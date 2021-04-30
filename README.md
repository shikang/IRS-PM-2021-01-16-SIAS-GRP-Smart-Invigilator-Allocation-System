# SIAS

## Tested on

OS: Ubuntu-18.04 / Ubuntu-20.04

Browser: Firefox 85.0.1


## Download the Package and Extract the content

1. Extract the Package from GitHub and move into SIAS folder (First time only)
```shell
git clone https://github.com/shikang/IRS-PM-2021-01-16-SIAS-GRP-Smart-Invigilator-Allocation-System
mv IRS-PM-2021-01-16-SIAS-GRP-Smart-Invigilator-Allocation-System sias
cd sias
```

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

## Backend
To run backend locally

1. Install curl (if not installed already)
```shell
sudo apt install curl
```

2. Install anaconda (First time only) 
```shell
curl -O https://repo.anaconda.com/archive/Anaconda3-2019.03-Linux-x86_64.sh
bash Anaconda3-2019.03-Linux-x86_64.sh
```

3. Create clean conda environment (First time only) 
```shell
conda create -n sias python=3.6
```

4. Navigate to directory
```shell
conda activate sias
cd backend
```

5. Install dependencies
```shell
pip install -r requirements.txt
```

## Scheduler
To run scheduler service locally

1. Install JDK 1.8+ (First time only) 
```shell
sudo apt install default-jdk
```

2. Navigate to directory
```shell
cd scheduler/code-with-quarkus
```

## Start all the processes in seperate Terminals
1. Start Frontend
```shell
npm start
```

2. Start Backend
```shell
python app.py
```

3. Start the Scheduler application
```shell
./mvnw compile quarkus:dev
```
