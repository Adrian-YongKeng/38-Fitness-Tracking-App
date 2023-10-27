import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Container, Form } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
    const [username, setUsername ] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    const login = () => {
        const isCorrectUsername = username === "Adrian" || username === "adrian@adrian.com";
        const isCorrectPassword = password === "123";
        // Check against user-created accounts
        const userAccounts = JSON.parse(localStorage.getItem("userData")) || {};
        const isUserCorrectPassword = userAccounts[username] === password;

    if (isCorrectUsername && isCorrectPassword) {
      authContext.setToken(password);
      userContext.setUsers(username);
      alert("Login successful!");
      navigate("/plan");
    } else if (isUserCorrectPassword) {
      authContext.setToken(password);
      userContext.setUsers(username);
      alert("Login successful!");
      navigate("/plan");
    } else {
      alert("Wrong username or password.");
    }
    }

    return (
        <Container className="my-3 text-center">
            <img src="./src/muscle.gif" height="200px" />
            <h1 className='my-3'>Login to your account</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username | Email address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="adrian@email.com || Adrian"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mx-auto text-center"
                    style={{ width: "420px" }}
                />
                <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="123" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-auto text-center"
                    style={{ width: "420px" }}
                    />
            </Form.Group>
        
            <Button variant="primary" onClick={login} >
                Login
            </Button>
            </Form>
        </Container>
    )
}    