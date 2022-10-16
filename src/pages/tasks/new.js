import React, {useState, useEffect} from 'react'
import {  Form, Grid, GridRow, Button  } from 'semantic-ui-react';
import { useRouter } from 'next/router';


export default function TaskFormPage() {
    const {query, push} = useRouter();

    const [newTask, setNewTask] = useState({
        title: "",
        description : "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description : "",

    });

    useEffect(() => {
        if (query.id) {
            getTask();
        }
    }, []);

    const getTask = async () => {
        const res =  await fetch(`http://localhost:3000/api/tasks/${query.id}`)
        const data = await res.json();
        setNewTask(data );
    }
    

    const handleSumbit = async (e) => {
        e.preventDefault();
        let errors = validate();

        if (Object.keys(errors).length) { 
            setErrors(errors);
            console.log(errors);
         }
        
        if (query.id) {
            updateTask()
         } else {
         await createTask();
         
        }
        await push('/');
        console.log('submit');
    }

    const handleChange = (e) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const validate = () => {
        const errors = {};

        if(!newTask.title) {
            errors.title = "Title is required";
        }

        if(!newTask.description) {
            errors.description = "Description is required";
        }

        return errors;
    }

    const  createTask =  async () => {
        try {
            await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.log(error);

        }
    }

    const updateTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.log(error);

        }
    }


  return (
    <Grid
        centered
        verticalAlign='middle'
        columns={3}
        style={{height: '80vh'}}
    >
        <Grid.Row>
            <Grid.Column textAlign='center'>
                <h1> {query.id ? 'Update Task' : 'Create Task' } </h1>
                <Form onSubmit={handleSumbit}>
                    
                    <Form.Input label="Title" placeholder="Title"
                                error={errors.title ? {content: errors.title, pointing: 'below'} : null}
                    name="title" onChange={handleChange}
                    value={newTask.title}
                    />
                    
                    <Form.TextArea label="Description"
                                    error={errors.description ? {content: errors.description, pointing: 'below'} : null}
                                    onChange={handleChange} placeholder="Description"  
                                    value={newTask.description}
                                    name="description"/>
                    
                    <Form.Button primary>{query.id ? 'Update' : 'Create' }</Form.Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  );
}
