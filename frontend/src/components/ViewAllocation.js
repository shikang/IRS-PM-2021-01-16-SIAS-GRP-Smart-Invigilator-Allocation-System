import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

import CommonConstant from "../util/CommonConstant";
import './ViewAllocationForm.css'

const axios = require('axios');

/**
 * Page to display the list of lecturers' allocation to the duty
 * 
 * Using material UI for simplicity
 * https://material-ui.com/components/data-grid/columns/
 * 
 **/
const columns = [
  { field: 'id', headerName: 'No.', type: 'number', width: 80},
  { field: 'day', headerName: 'Day', type: 'date', width: 150},
  { field: 'time', headerName: 'Time', width: 100},
  { field: 'length', headerName: 'Length', width: 100},
  { field: 'module', headerName: 'Module', sortable: true, width: 150},
  { field: 'type', headerName: 'Type', width: 100},
  { field: 'room', headerName: 'Room', sortable: true, width: 150},
  { field: 'nameI', headerName: 'Invigilator', sortable: true, width: 200},
  { field: 'nameSI', headerName: 'Senior Invigilator', sortable: true, width: 200},
  { field: 'ci', headerName: 'Chief Invigilator', sortable: true, width: 200}
];

const viewState = Object.freeze({
    "ALLOCATION_COMPLETED": 0, 
    "ALLOCATION_RUNNING": 1,
    "ALLOCATION_ERROR": 2
});

const statusInterval = 2000;  //polling interval, should increase if normal data size taking approximately 1 hour

/**
 * Display the staff allocation to duties
 * Allow user to kick start the allocation process manually, in even of preferences update.
 **/
class ViewAllocation extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            rows: []
        };
    }
    
    componentDidMount() {
        this.setState({
          allocationProcess: viewState.ALLOCATION_RUNNING,
        });
        this.getAllocation();
    }
    
    /**
     * Map response to rows, including flatten of inv and senior invigilator in the same row.
     * {
     *  day: "Mon"
     *  length: "1:30"
     *  module: "ME0501"
     *  room: "T1754"
     *  time: "8:30"
     *  type: "Inv"
     *  staff: "ABCD"
     * }
     **/
    processAllocation(list) {
        console.log("processAllocation", list);
        
        //Not optimize, but decent
        var invList = list.filter(list => list.type == 'Inv');
        var sInvList = list.filter(list => list.type == 'SI');
        
        if(sInvList) {
            for(var s=0; s<sInvList.length; s++) {
                var sInv = sInvList[s];
                
                //split the rooms if multiple
                if(sInv.room) {
                    var sRooms = sInv.room.split(',');
                    for(var r=0; r<sRooms.length; r++) {
                        //find current duty
                        const duty = invList.find(invList => invList.room == sRooms[r]);
                        if(duty) {
                            duty.nameSI = sInv.staff;
                        } else {
                            const newDuty = Object.create(sInv);  //deep copy
                            newDuty.nameSI = sInv.staff;
                            newDuty.room = sRooms[r];
                            invList.push(newDuty);
                        }
                    }
                }//endif
            } 
        }
        
        let newRows = [];
        for(var index=0; index<invList.length; index++) {
            var duty = invList[0];
            if(duty) {
              duty.id = index+1 //for display purpose, rowNo
              if(duty.staff && duty.type == 'Inv') {
                duty.nameI = duty.staff
              }
              newRows.push(duty)
            }
        }
        
        this.setState(prevState => ({
            rows: newRows
        }));
    }
    
    /**
     * Get the allocation list of duty and assign lecturer
     **/
    getAllocation() {
        axios.get(CommonConstant.SIAS_API_PREFIX + CommonConstant.SIAS_VIEW_ALLOCATION_API)
          .then(this.onAllocationCompleted)
          .catch(this.error)
          .then(function () {
              // always executed
          });
    }
    
    onAllocationCompleted = (response) => {
        console.log('onAllocationCompleted', response);
        if(response && response.data && response.data.allocation) {
            this.processAllocation(response.data.allocation);
        }
        this.setState({
            allocationProcess: viewState.ALLOCATION_COMPLETED
        });
    }
    
    error = (response) => {
        console.log('error', response)
    }
    
    /**
     * Call backend API to start the solver process
     * This may take a while depending on data size
     **/
    startSolver() {
        console.log('startSolver is called')
        axios.post(CommonConstant.SIAS_API_PREFIX + CommonConstant.SIAS_SOLVER_START_API)
          .then(this.getSolverStatus(0))
          .catch(this.error)
          .then(function () {
              // always executed
          });
    }
    
    /**
     * Polling for solver status until it is completed.
     **/
    async getSolverStatus(retryCount) {
        console.log("getSolverStatus is called");
        
        let response = await axios.get(CommonConstant.SIAS_API_PREFIX + CommonConstant.SIAS_SOLVER_STATUS_API);
        
        if (response.status == 200) {
            /*
            //Hack just for testing purpose to save time, to remove when done
            console.log("Retry", retryCount);
            if(retryCount == 2) {
                console.log("Manual override");
                response.data.status = "Done";
            }
            */
            
            if(response.data.status == "Done") {
                console.log("Allocation is done");
                this.getAllocation();
            }else if(response.data.status == "Running") {
                console.log("status is running, sleep for " + statusInterval);
                await new Promise(resolve => setTimeout(resolve, statusInterval));
                
                console.log("wakeup, calling getSolverStatus again");
                retryCount = retryCount+1;
                await this.getSolverStatus(retryCount);
            }else {
                //assume Error
                this.setState({
                    allocationProcess: viewState.ALLOCATION_ERROR
                });
            }
        }
    }
    
    /**
     * Call solver for re-allocation
     **/
    runAllocation() {
        console.log("runAllocation is called");
        this.setState({
            allocationProcess: viewState.ALLOCATION_RUNNING
        });
        
        //To improve: try to use promise chaining here if time permits
        this.startSolver();
    }
    

    /**
     * Construct and populate the table for rendering purpose
     * 
     * @param allocationList allocation objects retrieved in Main.js upon clicking the View Allocation tab
     *
     **/
    render() {
        console.log('render', this.state);
      
        let msg= '';
        if(this.state.allocationProcess == viewState.ALLOCATION_RUNNING) {
            msg = 'Allocation is in progress, this may take a while. Please wait...';
        } else if (this.state.allocationProcess == viewState.ALLOCATION_ERROR) {
            msg = 'There is an error while running the allocation, please contact your Administrator';
        } 
        
        
        return(
            <div className="pfContent">
              <h1 style={{color:"#555555"}}>Smart Invigilator Allocation System (SIAS)</h1>
              <div class='btnLeft'>
                <Button 
                  id="btnStart"
                  variant="contained" 
                  color="primary"
                  size="large"
                  onClick={() => { this.runAllocation() }}
                  disabled={this.state.allocationProcess == viewState.ALLOCATION_RUNNING}>
                  Run Allocation
                </Button>
                <span style={{ marginLeft:'50px'}}>{msg}</span>
              </div>
              
              {(this.state.allocationProcess == viewState.ALLOCATION_COMPLETED) && (
              <div id="tblAllocation" style={{ height: 650, width: '100%', marginTop:'50px', align:'center'}}>
                <DataGrid 
                  rows={this.state.rows} 
                  columns={columns} 
                  pageSize={10} 
                  disableMultipleSelection={true} 
                />
              </div>
              )}
          </div>
        )
    }  //end render
}


export default ViewAllocation;