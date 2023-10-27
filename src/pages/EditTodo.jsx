import { useContext, useEffect, useState } from "react";
import { Container ,Button , Form} from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  const currentTodo = todos.filter((todo) => todo.id === id)[0];
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const [completed, setCompleted] = useState(currentTodo.completed);
  const [sets, setSets] = useState(currentTodo.sets);
  const [imageUrl, setImageUrl] = useState(currentTodo.imageUrl);

  // Update completed status when sets change
  useEffect(() => {
    setCompleted(sets === 0 || completed);
  }, [sets, completed]);

  const updateTodo = (event) => {
    event.preventDefault();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { id, title, description, completed, sets, imageUrl };
      }
      return todo;
    });
    setTodos(updatedTodos);
    navigate("/plan");
  }

  return (
    <Container>
      <h1 className="my-3">Edit Workout Routine</h1>
      <Form onSubmit={updateTodo}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Exercise</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Incline Bench Press"
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
