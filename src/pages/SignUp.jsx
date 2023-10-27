import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Alert } from "react-bootstrap";

export default function SignUp() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signUp = () => {
    setError(null); // Reset any previous error messages
    if (!formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    // Get the existing user data from local storage
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || {};
    // Check if the username already exists
    if (existingUserData[formData.username]) {
        alert("Username already exists. Please enter a different one.");
        return;
      }
    // Add the new user data to existing user data
    existingUserData[formData.username] = formData.password;

    // Store the updated user data in local storage
    localStorage.setItem("userData", JSON.stringify(existingUserData));

    alert("Sign-up successful!");
    navigate("/login");
  };

  return (
    <Container className="my-3 text-center">
      <h1 className="my-3">Adrian&apos;s Fitness App</h1>
      <img src="./src/muscle.gif" height="200px" />
      <h1 className="my-3">Sign-Up</h1>
      <Form>
        <Form.Group controlId="formBasicUsername" className="mb-3 ">
          <Form.Label>Username | Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="mx-auto text-center "
            style={{ width: "420px" }}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mx-auto text-center"
            style={{ width: "420px" }}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="warning" onClick={signUp} className="mt-2">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
