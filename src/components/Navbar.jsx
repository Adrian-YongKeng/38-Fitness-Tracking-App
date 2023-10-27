import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { UserContext } from '../contexts/UserContext';
import Timer from './Timer';
import { AuthContext } from '../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { resetTimer } from '../timerSlice';

export default function CustomNavbar() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const users = useContext(UserContext).users;
    const isSignUpPage = location.pathname === "/signup";
    const dispatch = useDispatch();

    const logout = () => {
      authContext.setToken(null);
      dispatch(resetTimer());

      navigate("/");
    }
  return (
    <Navbar  bg="dark" variant='dark' expand="xl">
    <Container >
      <Navbar.Brand href='/'>
        <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJoc2g3YXNsMnNiYzhzdW5xbGRrM3B3dWJoMGJzMTY5NWJrbjVpOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/dWxv9qa3x03vjZdjTb/giphy.gif' alt='welcome-page' height="38"/>
      </Navbar.Brand>
      {authContext.token && (
        <Navbar.Brand href='/plan'>Workout Plan</Navbar.Brand>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          {authContext.token && (
            <>
            <Nav.Link href='/add'>Add Workout</Nav.Link>
            <Nav.Link href='/bmi'>BMI Calculator</Nav.Link>
            </>
          )}
        </Nav>
        {authContext.token && (
            <>
            <Timer />
            <span className="text-light">Welcome {users} !</span>
            </>
          )}
        
        <Nav>
          {isSignUpPage ? ( 
            <Nav.Link href='/login'>
              <Button variant="primary">Login</Button>
            </Nav.Link>
          ) : ( !authContext.token && (
              <Nav.Link href='/signup'> <Button variant="warning">Sign Up</Button></Nav.Link>
            )
          )}
          {authContext.token && (
            <Button className="ms-5"variant="danger" onClick={logout}>
                Logout
            </Button>
          )}
        </Nav>
        
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

