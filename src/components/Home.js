import { IconButton, List, ListItemText, TextField, Chip, Grid } from "@mui/material"
import { Container } from "@mui/system"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

export default function Home({students,setStudents}) {

    const [expand, setExpand] = useState(new Array(students.length).fill(false))
    const [nameSearch, setNameSearch] = useState("")
    const [tagSearch, setTagSearch] = useState("")

    const filterByName = (student) => {
        let fullName = student.firstName.toLowerCase() + ' ' + student.lastName.toLowerCase()
        return fullName.indexOf(nameSearch.toLowerCase()) > -1 
    }

    const filterByTag = (student) => {
        if (tagSearch === "") return true
        if (student.tag.length === 0) return false
        for (let t of student.tag) {
            if (t.toLowerCase().indexOf(tagSearch.toLowerCase()) > -1) return true
        }
        return false
    }

    const handleExpand = (index) => {
        let e = [...expand]
        e[index] = !e[index]
        setExpand(e)
    }

    const handleTag = (e, index) => {
        if (e.key === "Enter") {
            let s = [...students]
            s[index].tag.push(e.target.value)
            setStudents(s)
            e.target.value = ""
        }
    }
    
    const studentList = students.filter(filterByName).filter(filterByTag).map((student,index) =>
        <>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{border:'1px black solid',marginTop: '1rem',marginBottom:'1rem'}}>
            <Grid item xs={3} alignItems="center" justifyContent="center">
                <img alt="image" src={student.pic}></img>
            </Grid>
            <Grid item xs={8}>
            <ListItemText>
                <h1 id="name">{student.firstName} { student.lastName }</h1>
                <p>Email: { student.email }</p>
                <p>Company: { student.company }</p>
                <p>Skill: { student.skill }</p>
                <p>Average: { student.average }%</p>
                <div>{ student.tag?.map(t => <Chip className="tag" label={t}></Chip>)}</div>
                { expand[index] &&
                <div>
                { student.grades.map((grade,i) => 
                    <p>Test {i}: { grade }%</p>
                )}
                </div>
                }
                <TextField onKeyDown={(e) => handleTag(e, index)} id="outlined-basic" label="Tag" variant="outlined" />
            </ListItemText>
            </Grid>
            <Grid item xs={1}>
            <IconButton onClick={() => handleExpand(index)}>
                { !expand[index] && <AddIcon />}
                { expand[index] && <RemoveIcon />}
            </IconButton>
            </Grid>
        </Grid>
        </>
    )
    return (
        <Container>
            <div>
            <TextField sx={{width:'100%',marginTop:'1rem'}} onChange={(e) => setNameSearch(e.target.value)} label="Search by name" />
            </div>
            <div>
            <TextField sx={{width:'100%',marginTop:'1rem'}} onChange={(e) => setTagSearch(e.target.value)} label="Search by tag" />
            </div>
            <List sx={{ width: '100%'}}>
                {studentList}
            </List>
        </Container>
    )
}