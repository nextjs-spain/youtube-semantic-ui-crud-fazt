import {Menu, Container, Button} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Navbar = () => {
    const router = useRouter();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <Link href="/">
                        <img src="/favicon.ico" alt="logo" style={{marginRight: '1em'}}/>
                    </Link>
          
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button primary onClick={()=> router.push('/tasks/new')}>Create a Task</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}


