import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'No.', type: 'number', width: 80 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'time', headerName: 'Time', width: 100 },
  { field: 'length', headerName: 'Length', width: 100},
  { field: 'group', headerName: 'Class Group', width: 150},
  { field: 'module', headerName: 'Module', sortable: true, width: 150},
  { field: 'type', headerName: 'Type', width: 100},
  { field: 'room', headerName: 'Room', sortable: true, width: 150},
  { field: 'nameI', headerName: 'I', sortable: true, width: 200},
  { field: 'nameSI', headerName: 'SI', sortable: true, width: 200},
  { field: 'nameCI', headerName: 'CI', sortable: true, width: 200}
];

//TODO: Retrieve from database once database data is ready
//Will change the function params then
function getAllocationList() {
  //Make a db call
  return [
    { 
      id: "1", 
      date: "12-Apr-21", 
      time: "8:30", 
      length: "1:30", 
      group: "DASE/FT/2A/01", 
      module: "ET0429", 
      type: "I", 
      room: "T611", 
      nameI: "",
      nameSI: "ARKR", 
      nameCI: "DADL"
      
    },
    { 
      id: "2", 
      date: "14-Apr-21", 
      time: "16:00", 
      length: "1:30", 
      group: "DASE/FT/2B/02", 
      module: "ET1006", 
      type: "I", 
      room: "T613", 
      nameI: "",
      nameSI: "GOBB", 
      nameCI: "DADL"
    }
  ];
}

const rows = getAllocationList()

export default function ViewAllocation() {
  return (
    <div className="pfContent">
      <h1 style={{color:"#555555"}}>Smart Invigilator Allocation System (SIAS)</h1>
      <div style={{ height: 400, width: '100%', marginTop:'50px'}}>
        <DataGrid rows={rows} columns={columns} pageSize={15} checkboxSelection />
      </div>
    </div>
  );
}