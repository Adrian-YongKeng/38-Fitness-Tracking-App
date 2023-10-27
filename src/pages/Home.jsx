import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { Col, Container, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard";

export default function Home() {
    const todos = useContext(TodoContext).todos;
    
    return (
      <Container>
        <h1 className="my-3">Workout Routine
             <img src="./src/routine.gif"
            height="40"
            />
        </h1>
        <Row>
          <CardGroup todos={todos} />
        </Row>
      </Container>
    );
  }
  
  function CardGroup({ todos }) {
    return todos.map((todo) => {
      return (
        <Col md={6} key={todo.id}>
          <TodoCard todo={todo} />
        </Col>
      );
    });
  }