import React from 'react'
import { Button, Card, Container, Grid } from 'semantic-ui-react';
import { useRouter } from 'next/router';

export default function HomePage({tasks}) {
  const router = useRouter();

  // render list tasks

  if (tasks.length === 0) return (
    <Grid centered verticalAlign="middle" columns={1} 
      style={{ height: '80vh' }}>
        <Grid.Row>
            <Grid.Column textAlign='center'>
                <h1>There are not task yet</h1>
                <img src="https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png"
                alt="Not task yet"/>
                <div>
                <Button primary onClick={()=> router.push('/tasks/new')}>Create a Task</Button>
                </div>
            </Grid.Column> 
        </Grid.Row>
    </Grid>
  )

  return (
    <Container style={{ padding : 100 }}>
        <Card.Group itemsPerRow={4}>
            {
                tasks.map(task => (
                    <Card key={task._id}>
                        <Card.Content>
                            <Card.Header>{task.title}</Card.Header>
                            <Card.Meta>{task.description}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color="primary" onClick={()=>router.push(`/tasks/${task._id}`)}>View</Button>
                            <Button color="secondary" onClick={()=>router.push(`/tasks/${task._id}/edit`)}  >Edit</Button>
                        </Card.Content>
                    </Card>  
                ))
            }
        </Card.Group>  
    </Container>
  )
}


export async function getServerSideProps(ctx) {
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();

  console.log(tasks)

  return {
    props: {
      tasks
    }
  }
}



// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:3000/api/tasks')
//   const tasks = await res.json()

//   console.log(tasks)

//   return {
//     props: {
//       tasks
//     }
//   }
// }
