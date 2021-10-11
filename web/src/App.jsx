import './App.css';
import { useFormik } from "formik";
import { Grid } from '@mui/material';
import Item from '@mui/material/Grid'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useEffect, useState } from "react"
import {
  collection, addDoc, onSnapshot,
  query, serverTimestamp, orderBy, deleteDoc, updateDoc, doc
} from "firebase/firestore"
import { db } from './firebase'

const todoApp = collection(db, "todos")

const validationSchema = yup.object({
  todoItem: yup
    .string('add something todo')
    .required('required*'),
});

async function del(id) {
  await deleteDoc(doc(todoApp, id)

  );
}

// async function update(data) {
//   await updateDoc(doc(todoApp,data.id{
//     todoItem: data.todoItem,
//   })

//   );
// }
// async function update() {
//   todoApp.doc(data.id)
//   await updateDoc(doc(todoApp,{
//     todoItem: todoItem.index,
//   })

//   );
// }
// async function 

// const todoApp = doc(db, "todos", data);

// // Set the "capital" field of the city 'DC'
// await updateDoc(todoApp, {
//   todoItem: data.todoItem,b  b
// });


// async function update(index) {
//   await updateDoc(doc(todoApp,{
//     todoItem: true,
//   } )
//   ,
//   );
// }

// function update(index){
//   var updatevalue=
//     prompt
//     ("enter value")

//   console.log(index)

// }

function update(){
  setTimeout(function(){ alert("edit is not responding"); }, 2000);

}

function App() {
  const [todo, settodo] = useState([])

  useEffect(() => {
    const q = query(todoApp, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      let todo = [];
      snapshot.forEach((doc) => {

        let id = doc.id;
        let data = doc.data();

        todo.unshift({
          id: id,
          todoItem: data.todoItem,

        });
      })
      settodo(todo)
    });

    return () => {
      unsubscribe()
      console.log("unsub")
    };
  }, []);

  const formik = useFormik({

    initialValues: {
      todoItem: ""
    },
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(todoApp, {
          timestamp: serverTimestamp(),
          todoItem: values.todoItem
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ margin: "auto", padding: "1rem", textAlign: "center" }}>TODO APP</h1>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div >
          <Grid container spacing={1} sx={{ paddingLeft: "10%", paddingRight: "10%" }} >
            <Grid item xl={10} lg={10} xs={12} sm={12} md={10}  >
              <Item  >
                <Stack spacing={3}  >
                  <TextField
                    color="primary"
                    id="outlined-basic"
                    variant="standard"
                    placeholder="Enter text here"
                    name="todoItem"
                    inputProps={{
                      maxlength: 20
                    }}
                    value={formik.values.todoItem}
                    onChange={formik.handleChange}
                    error={formik.touched.todoItem && Boolean(formik.errors.todoItem)}
                    helperText={formik.touched.todoItem && formik.errors.todoItem}
                  />
                </Stack>
              </Item >
            </Grid>
            <Grid item xl={2} lg={2} xs={6} sm={6} md={2} >
              <Item>
                <Button sx={{ height: "25px", width: "100%", }} variant="contained" color="success" type="submit">Add TODO</Button>
              </Item >
            </Grid>
          </Grid>
        </div>
      </form>

      <div >
        <br />
        <Grid container spacing={1} sx={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <Grid item xl={12} lg={12} xs={12} sm={12} md={12} sx={{ textAlign: "left", margin: "auto" }}   >
            <Item   >
              <Stack spacing={1}  >
                {todo.map((eachTodo, i) => {
                  return (<div key={i}>
                    <ul>
                      <li style={{ fontSize: "24px" }}>
                        {eachTodo.todoItem }  <Button sx={{ background: "#c42c2c", color: "white", width: "8%", fontSize: "10px" }} variant="contained" color="error" onClick={() => { del(eachTodo.id) }}>delete </Button>
                        &nbsp;&nbsp;<Button sx={{ background: "purple", color: "white", width: "8%", fontSize: "10px" }} variant="contained" color="secondary"
                          onClick={() => {update() }}>Edit </Button>
                        <hr />
                      </li>
                    </ul>
                  </div>)
                })}
              </Stack>
            </Item >
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;