import React from 'react'
import Error from 'next/error';
import { Grid, Button, Confirm, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

export default function TaskDetail({task, error}) {
    const {query, push} = useRouter();
    const [confirm, setConfirm] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)

    const deleteTask = async () => {
          const {id} = query
          try {
              await fetch(`http://localhost:3000/api/tasks/${id}`, {
                  method: 'DELETE',
              });
              
          } catch (error) {
            console.log(error)
          }
    }

    const handleDelete = async () => {
        setLoading(true);
        deleteTask();
        close();
        push('/');
        setLoading(false);
    }

    if (error && error.statusCode) 
      return <Error statusCode={error.statusCode} title={error.statusText} />
    
    return (
          <Grid
                centered
                verticalAlign='middle'
                columns="1"
                style={{ height: '80vh' }}          
            >
            <Grid.Row>
              <Grid.Column textAlign='centered'>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <div>
                  <Button color="red" onClick={open}>Delete</Button>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Confirm
                header="Please confirm"
                content="Are you sure you want to delete this task?"
                open={confirm} onConfirm={handleDelete} onCancel={close}
            />
          </Grid>
          )
}

export async function getServerSideProps({query : {id}}) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  
  if(res.status ===200){
    const task = await res.json();
    return {
      props: {
        task
      }
    }
  }

  return {
    props: {
      error : {
        statusCode : res.status,
        statusText : "Invalid Id"
      }
    }
  }
}
