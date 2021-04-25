import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

/**
 * Page to display the list of lecturers' allocation to the duty
 * 
 * Using material UI for simplicity
 * https://material-ui.com/components/data-grid/columns/
 * 
 **/
const columns = [
  { field: 'id', headerName: 'No.', type: 'number', width: 80},
  { field: 'date', headerName: 'Date', type: 'date', width: 150},
  { field: 'time', headerName: 'Time', width: 100},
  { field: 'length', headerName: 'Length', width: 100},
  { field: 'group', headerName: 'Class Group', width: 150},
  { field: 'module', headerName: 'Module', sortable: true, width: 150},
  { field: 'type', headerName: 'Type', width: 100},
  { field: 'room', headerName: 'Room', sortable: true, width: 150},
  { field: 'nameI', headerName: 'Invigilator', sortable: true, width: 200},
  { field: 'nameSI', headerName: 'Senior Invigilator', sortable: true, width: 200},
  { field: 'nameCI', headerName: 'Chief Invigilator', sortable: true, width: 200}
];

/**
 * Store the duties list with the following Object
 * 
 **/
const rows = []

/**
 * Add duty object to the rows
 * //TODO: json returned from rest api is missing some fields, i.e. date, time group (also to clarify if read from duty table or merge with allocation table)
 * 
 * @param {object} allocation duty to lecturer allocation:  
 * {
 *  day: "Mon"
 *  length: "1:30"
 *  module: "ME0501"
 *  room: "T1754"
 *  time: "8:30"
 *  type: "Inv"
 *  staff: "ABCD"
 * }
 * 
 **/
function addList(duty, index) {
  if(duty) {
    duty.id = index+1 //for display purpose, rowNo
    if(duty.staff && duty.type == 'Inv') {
      duty.nameI = duty.staff
    }
    rows.push(duty)
  }
}

function processAllocation(list) {
  //Not optimize, but decent
  var invList = list.filter(list => list.type == 'Inv');
  var sInvList = list.filter(list => list.type == 'SI');
  
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
    }
  }
  
  invList.forEach(addList)
}

/**
 * Construct and populate the table for rendering purpose
 * 
 * @param allocationList allocation objects retrieved in Main.js upon clicking the View Allocation tab
 *
 **/
export default function ViewAllocation(allocationList) {
  //too nested, ignore for now
  if(allocationList && allocationList.allocationInfo && allocationList.allocationInfo.allocation) {
    processAllocation(allocationList.allocationInfo.allocation)
  }
  return (
    <div className="pfContent">
      <h1 style={{color:"#555555"}}>Smart Invigilator Allocation System (SIAS)</h1>
      <div style={{ height: 650, width: '100%', marginTop:'50px', align:'center'}}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          pageSize={10} 
          disableMultipleSelection={true} 
        />
      </div>
    </div>
  );
}