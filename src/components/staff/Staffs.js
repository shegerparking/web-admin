import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditStaff, NewStaff, ShowStaffs } from './staffActions';

import {baseURL} from '../../sourceData/data'


export default function Staffs() {
  let [staffList, setStaffList] = useState([]);
  let [selectedStaffList, setSelectedStaffList] = useState([]);

  let [branches, setBranches] = useState([]);
  let [branchIdVN, setbranchIdVN] =useState({});

  let [presentable, setPresentable] =useState({});


  async function FetchAdmins() {
    useEffect(() => {
      fetch(`${baseURL}/staffs`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((resp) => {
          setStaffList(resp);
          setSelectedStaffList(resp);
        });
    }, []);

    useEffect(() => {

    fetch(`${baseURL}/branches`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((resp) => {
          setBranches(resp);
      });
    }, []);
      useEffect(() => {
        var branchDict = {}
        branches.map((item)=>{
            branchDict[item.id]=item.name;
        })
        setbranchIdVN(branchDict)
  
      
    },[branches])

    
  }


  

  FetchAdmins();

  

  setInterval(() => {
    FetchAdmins();
  }, 60000);


//   useEffect(() => {
//     var presentableList = []
//     staffList.map((item)=>{
//         presentableList.push({
//           "id":item.id,
//           "fullName": item.fullName,
//           "phone": item.phone,
//           "email": item.email,
//           "passwordHash": item.passwordHash,
//           "branch": branchIdVN[item.branch]

//         })
//     })
//     setPresentable(presentableList)

  
// },[staffList,branchIdVN])

  

  // console.log("hello")
  // console.log(branches)
  console.log(presentable)
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ShowStaffs
            staffList={staffList}
            selectedStaffList={selectedStaffList}
            setSelectedStaffList={setSelectedStaffList}
            branchIdVN={branchIdVN}
          />
        }
      />
      <Route
        path="/edit/"
        element={
          <EditStaff
            staffList={staffList}
            selectedStaffList={selectedStaffList}
            setSelectedStaffList={setSelectedStaffList}
            branchIdVN={branchIdVN}
            branches={branches}
          />
        }
      />
      <Route
        path="/new/"
        element={
          <NewStaff
            staffList={staffList}
            selectedStaffList={selectedStaffList}
            setSelectedStaffList={setSelectedStaffList}
            branches ={branches}
          />
        }
      />
    </Routes>
  );
}
