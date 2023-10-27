import { useContext, useState } from "react";
import { Button,Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();
  const [sets, setSets] = useState("")
  const [imageUrl, setImageUrl] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), title, description, completed, sets, imageUrl }]);
    navigate("/plan");
  }

  return (
    <Container>
      <h1 className="my-3">Add Workout</h1>
      <Form onSubmit={addTodo}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Exercise</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Incline Bench Press / Standing Press"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={4}
            placeholder={`1. Muscles Targeted: Chest, shoulders, triceps.\n2. Grip the barbell slightly wider than shoulder-width.\n3. Lower the bar to your chest, then push it up.\n4. Aim for 3-4 sets of 6-8 reps for strength, or 3 sets of 8-12 reps for muscle endurance.`}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sets">
          <Form.Label>Sets</Form.Label>
          <Form.Control
            type="number"
            placeholder="How many sets ?"
            value={sets}
            onChange={(e) => setSets(parseInt(e.target.value))}
            min={0}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mb-3"
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
