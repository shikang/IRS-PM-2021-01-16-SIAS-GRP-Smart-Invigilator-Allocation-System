# SIAS

Refer to SIAS_Installation_Guide.pdf for more details.

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
cd /tmp
curl -O https://repo.anaconda.com/archive/Anaconda3-2020.02-Linux-x86_64.sh
bash Anaconda3-2020.02-Linux-x86_64.sh
```
    Use "Enter" key to review the license agreement and type "yes" at the bottom to agree the terms.

    Press "Enter" key to confirm the installation location.

    Press "yes" when prompted for "Do you wish the installer to initialize Anaconda3 by running conda init? [yes|no]"

    Activate the installation by typing following command
```shell
source ~/.bashrc
```

4. Create clean "sias" conda environment (First time only) 
```shell
conda create -n sias python=3.7
```

5. Activate "sias" conda environment
```shell
conda activate sias
```

6. Navigate to "/sias/backend" directory
```shell
cd /sias/backend
```

7. Install dependencies
```shell
pip install -r requirements.txt
```

    Note: In case if "Flask-Cors" was not installed from the above command, run this command
```shell
pip install flask_cors
```

8. Install JDK 1.8+ (First time only) 
```shell
sudo apt install default-jdk
```

## Start all the processes in seperate Terminals
Process should be started in this sequence: Scheduler -> Backend -> Frontend

1. Start the Scheduler services
Open new terminal
```shell
cd /sias/scheduler/code-with-quarkus
./mvnw compile quarkus:dev
```

2. Start Backend
Open new terminal
```shell
cd /sias/backend
python app.py
```

3. Start Frontend
Open new terminal
```shell
cd /sias/frontend
npm start
```




