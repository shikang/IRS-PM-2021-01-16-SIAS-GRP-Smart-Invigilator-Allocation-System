<hr style="border:2px solid gray"> </hr>

# Project Title: Smart Invigilator Allocation System (SIAS)
<hr style="border:2px solid gray"> </hr>

## Section 1: Executive Summary
A Polytechnic in Singapore is manually allocating invigilators duty to test venue. Multiple data points should be considered during the allocation process, which is not only challenging and time-consuming task but also prone to human errors. The data consists of the lecturers, examination dates and time, class group, test venue and test module. Given the complexity of the manual allocation, the examination officer is unable to accommodate other vital information such as invigilators calendar, preference, etc., during the allocation.

There are situations, where the assigned invigilator is not able to perform the duty in the last minute before the commencement of the test. This situation will make the planned allocation even more challenging. To mitigate such a situation, a standby invigilator is assigned to replace the duty, leading to excess allocation.

Though this problem was surfaced by the Polytechnic in Singapore, it is a wider challenge faced by many educational institutions. Therefore, there is an immense need to build an intelligent system to manage the allocation of invigilators. The objective of this project is to develop and implement an intelligent system that provides optimum allocation of invigilator duty to test venues based on a set of defined rules. Build the functionality to handle exceptional situations by reallocation of invigilators with minimal impact to overall planned allocation.

SIAS is an intelligent system that provides optimal allocation of invigilator duty to test venues based on a set of defined rules and capable of reallocation with minimal impact to overall plan. 

Allocation and reallocation of invigilators can be performed at three stages in SIAS.<br>
&nbsp;&nbsp;&nbsp;**Stage-1:** Initial allocation based on the invigilator available calendar and preference<br>
&nbsp;&nbsp;&nbsp;**Stage-2:** Reallocation based on invigilator acceptance / changes<br>
&nbsp;&nbsp;&nbsp;**Stage-3:** Reallocation on the day of examination based on invigilator attendance

Smart Invigilator Allocation System (SIAS) is implemented with Python programming language with Flask having web-based user interface for users interact with the application. Java script is used for scheduler and SQLite to store the data.
<hr style="border:2px solid gray"> </hr>

## Section 2: Credits / Project Contribution

|  Student Full Name  | Student ID  | Individual Contribution |     email id      |
| :------------------ |:-----------:| ------------------------|-------------------|
| Narendernath Baskar | A0230120J   | Project planning and execution, Requirement analysis<br>and functional specifications, Operational flow and<br>approach, Business case, Architecture, Testing, Script for<br>Videos, Installation Guide, User Manual and Project Report.|e0690417@u.nus.edu |
| Yusuf Pranggonoh    | A0229966J   | Conceptualise business requirements, Interview the<br>person-in-charge, Preparation of test source data,<br>Perform end-to end testing, Produce Videos, <br>Implementation of Frontend user interfaces.|e0687374@u.nus.edu |
| Neoh Shi Kang       | A0229965L   | Setup software architecture (Backend, Frontend, Database)<br>Implement backend and preference page, Integration with<br>Solver, Feature engineering (scaling of time stamp).|e0687373@u.nus.edu |
| Tan Wee Han         | A0125244N   | Research of optimisation tools, Modelling of invigilator<br>allocation problem into Optaplanner, Implementation of<br>domain objects hard and soft constraints in Optaplanner,<br>Testing on blank VM, Installation Guide and User Manual.|e0689794@u.nus.edu |
<hr style="border:2px solid gray"> </hr>

## Section 3: Smart Invigilator Allocation System - Videos
### Smart Invigilator Allocation System - Promotion Video<br>
<a href="http://www.youtube.com/watch?feature=player_embedded&v=ruvLaSyVQDs
" target="_blank"><img src="/Miscellaneous/Images/SIAS_Promotion_Video.jpg" 
alt="Smart Invigilator Allocation System - Promotion Video" width="2000" height="500" border="10" /></a>

### Smart Invigilator Allocation System - Product Demo Video<br>
<a href="http://www.youtube.com/watch?feature=player_embedded&v=7fz9EdyHzmQ
" target="_blank"><img src="/Miscellaneous/Images/SIAS_Product_Demo_Video.jpg" 
alt="Smart Invigilator Allocation System - Product Demo Video" width="2000" height="500" border="10" /></a>
<hr style="border:2px solid gray"> </hr>

## Section 4: Installation Guide
### Step-1: Installation of Pre-Requisites
To Install the SIAS application the following pre-requisites needs to be installed. SIAS application was tested on OS: Ubuntu-18.04 / Ubuntu-20.04 using Browser: Firefox 85.0.1.

**1.** For Frontend, install Node Package Manager using the below terminal commands<br>
&nbsp;&nbsp;&nbsp;&nbsp;`sudo apt update`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`sudo apt install npm`

**2.** For Backend, install Anaconda, then create a conda environment.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.1.** Install “curl” if not available<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`sudo apt install curl`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.2.** Download and install Anaconda for Linux<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`cd /tmp`<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`curl -O https://repo.anaconda.com/archive/Anaconda3-2020.02-Linux-x86_64.sh`<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`bash Anaconda3-2020.02-Linux-x86_64.sh`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.3.** Use "Enter" key to review the license agreement and type "yes" at the bottom to agree the terms.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.4.** Press "Enter" key to confirm the installation location.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.5.** Press "yes" when prompted for "Do you wish the installer to initialize Anaconda3 by running conda init? [yes|no]"

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.6.** Activate the installation by typing following command<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`source ~/.bashrc`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.7.** Create clean "sias" conda environment (First time only)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`conda create -n sias python=3.7`

**3.** For Scheduler, install JDK 1.8+<br>
&nbsp;&nbsp;&nbsp;&nbsp;`sudo apt install default-jdk`

### Step-2: Download the SIAS Package<br>
To download / extract the package from GitHub and move into "/sias" directory in local drive using the below terminal commands.<br>
&nbsp;&nbsp;&nbsp;&nbsp;`git clone https://github.com/shikang/IRS-PM-2021-01-16-SIAS-GRP-Smart-Invigilator-Allocation-System`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`sudo mv IRS-PM-2021-01-16-SIAS-GRP-Smart-Invigilator-Allocation-System /sias`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias`

### Step-3: Installation of SIAS Application<br>
The SIAS project comprises of 3 components: Frontend, Backend, and Scheduler. All the commands have to be executed from terminal.<br>
**1.** Installation of dependencies for Frontend<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias/frontend`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`npm install`<br>

**2.** For Backend, activate “sias” conda environment and install dependencies<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias/backend`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`conda activate sias`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`pip install -r requirements.txt`<br>

&nbsp;&nbsp;&nbsp;&nbsp;***Note:*** In case if “flask-cors” is not installed from the above command, run the below command<br>
&nbsp;&nbsp;&nbsp;&nbsp;`pip install flask_cors`<br>

**3.** Install and start the Scheduler<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias/scheduler/code-with-quarkus`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`./mvnw compile quarkus:dev`

The installation may take a few minutes. After installation the below screenshot will be seen in the terminal.<br>
![Screen Shot](/Miscellaneous/Images/Start_Scheduler.jpg)

### Step-4: Start Services for SIAS Application<br>
Services for SIAS application should be started in this sequence: **`Scheduler -> Backend -> Frontend`**<br>
**1. Start the Scheduler**<br>
Open a new Terminal and execute the following commands to start the scheduler<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias/scheduler/code-with-quarkus`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`./mvnw compile quarkus:dev`

After starting the Scheduler the text similar to below screenshot will be seen in the terminal.<br>
![Screen Shot](/Miscellaneous/Images/Start_Scheduler.jpg)

**2. Start the Backend**<br>
Open a new Terminal and execute the following commands to start the Backend process<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias/backend`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`conda activate sias`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`python app.py`

After starting the backend application, the below text will be seen in the terminal.<br>
![Screen Shot](/Miscellaneous/Images/Start_Backend.jpg)

**3. Start the Frontend**<br>
Open a new Terminal and execute the following commands to start the Frontend application<br>
&nbsp;&nbsp;&nbsp;&nbsp;`cd /sias/frontend`<br>
&nbsp;&nbsp;&nbsp;&nbsp;`npm start`

After starting the frontend application, the below text will be seen in the terminal.<br>
![Screen Shot](/Miscellaneous/Images/Start_Frontend.jpg)

Upon starting the Frontend, the default browser will open up the SIAS application. If not opened, you can open your browser and go to the link: http://localhost:3000

The below page will be displayed.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_Home.jpg)
<hr style="border:2px solid gray"> </hr>

## Section 5: User Manual
### Keynote:<br>
• Ensure all the services are started for SIAS application **`Scheduler -> Backend -> Frontend`**<br>
• Open your web browser and go to the link: http://localhost:3000<br>

**1. Allocation of Invigilation Schedule**<br>
1.1. On the browser, the SIAS “Allocation” page is displayed showing a blank table. This is because the scheduling is not done. To run the SIAS scheduler and obtain a schedule, click on the “RUN ALLOCATION” button.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_1.jpg)

1.2. Upon clicking the button, you should see the following message in the browser: “Allocation is in progress, this may take a while. Please wait...”<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_2.jpg)

1.3. When the allocation is complete, you will see that the table that was previously blank is now populated.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_3.jpg)

1.4. Looking at the terminal running the Scheduler, you can see the scheduler output such as time spent and score.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_4.jpg)

**2. Adding Invigilator Preferences to the Schedule**<br>
2.1. Other than the Duty schedule and Staff list, SIAS also considers for each Staff’s preferences for the invigilation duties. To add in preferences, first, click on “Preferences” in the header bar.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_5.jpg)

2.2. In the “Preferences” page, select the Staff in the “Name” section.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_6.jpg)

2.3. Then, select the 3 preferred duties for the Staff selected. The duties are labeled by “Day, Time, Module, Room, Role”. (Note that all 3 preferences are given the same priority. Earlier submissions are given higher priorities.)<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_7.jpg)

2.4. Then click “Submit” to add the Staff’s preferences into the database. You should see a message “Preference Submitted”.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_8.jpg)

**3. Allocation of Invigilator Schedule with their Preferences**<br>
3.1. After preferences for all Staff are added into the database, the invigilation schedule can be obtained again with Staff’s preferences taken into account. Click on “Allocations” in the header bar to return to the “Allocations” page.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_9.jpg)

3.2. When the reallocation is complete, you will see the table populated with the inclusion of invigilator preferences.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_10.jpg)

3.3. After running the scheduler with preferences added, you will see that the soft score has increased, meaning that some preferences have been met.<br>
![Screen Shot](/Miscellaneous/Images/SIAS_UM_11.jpg)
<hr style="border:2px solid gray"> </hr>

## Section 6: Project Report
For complete details refer to the Project Report: [NUS ISS PM SIAS Project Report](/Project%20Report/SIAS_Project_Report.pdf)<br>
Key topics covered in the Project Report:<br>
&nbsp;&nbsp;&nbsp;&nbsp;1. Executive Summary<br>
&nbsp;&nbsp;&nbsp;&nbsp;2. Problem Statement and Objectives<br>
&nbsp;&nbsp;&nbsp;&nbsp;3. Solution<br>
&nbsp;&nbsp;&nbsp;&nbsp;4. Input Data and Rules<br>
&nbsp;&nbsp;&nbsp;&nbsp;5. Assumptions and Contraints<br>
&nbsp;&nbsp;&nbsp;&nbsp;6. Testing Approach<br>
&nbsp;&nbsp;&nbsp;&nbsp;7. Conclusion and Future expansion<br>
&nbsp;&nbsp;&nbsp;&nbsp;8. Appendix<br>
<hr style="border:2px solid gray"> </hr>
