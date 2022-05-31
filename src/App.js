import './App.css';
import React, { useState, useEffect } from "react"
import Home from './components/Home'
import { Grid } from '@mui/material';

function App() {
  const API = "https://api.hatchways.io/assessment/students"

  const [data, setData] = useState([])
  const [students, setStudents] = useState([])

  const getData = async () => {
    fetch(API)
    .then(res => res.json())
    .then(d => setData(d.students))
    .catch(e => console.log(e))
  }

  const calculateData = () => {
    data.forEach(student => {
      let sum = student.grades.reduce((c,p) => parseInt(c)+parseInt(p))
      let average = sum / student.grades.length
      student.tag = []
      student.average = average
    })
    setStudents(data)
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    calculateData() // eslint-disable-next-line
  },[data])

  return (
    <Grid container className='container'>
      <Grid item lg={3} md={2} sm={0}></Grid>
      <Grid item lg={6} md={8} sm={12} sx={{marginTop: '5rem'}} className='main'>
        <Home students={students} setStudents={setStudents} />
      </Grid>
      <Grid item lg={3} md={2} sm={0}></Grid>
    </Grid>
    
  );
}

export default App;