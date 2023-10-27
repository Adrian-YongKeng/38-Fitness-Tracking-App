import {  useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import DeleteTodoModal from "./DeleteTodoModal";

export default function TodoCard({ todo }) {
  const [completed, setCompleted] = useState(todo.completed);
  const border = todo.completed ? "success" : "danger";
  const [timer, setTimer] = useState(15);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const bg = todo.completed ? "success" : "danger";
  const initialSets = localStorage.getItem(`sets_${todo.id}`) || "0";
  const [sets, setSets] = useState(parseInt(initialSets));

//sets
  const incrementSets = () => {
    if (sets < todo.sets) {
      const newSets = sets + 1;
      setSets(sets + 1);
      localStorage.setItem(`sets_${todo.id}`, newSets.toString());
    if (sets + 1 === todo.sets) {
      setCompleted(true);
      localStorage.setItem(`completed_${todo.id}`, 'true');
    }
  }
  };
  const resetSets = () => {
    setSets(0);
    setCompleted(false);
    localStorage.removeItem(`sets_${todo.id}`);
    localStorage.removeItem(`completed_${todo.id}`);
  };

  useEffect(() => {
    // Check if "completed" state is stored in localStorage
    const completedState = localStorage.getItem(`completed_${todo.id}`);
    if (completedState === 'true') {
      setCompleted(true);
    }
  }, [todo.id]);

//Timer
  const startTimer = () => {
    if (timerInterval === null  && timer > 0) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(intervalID); // Stop the timer when it reaches 0
            return 0;
          } 
          return prevTimer - 1; });
      }, 1000);
      setTimerInterval(intervalID);
    }
  };
  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };
  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(15);
  };

//DeleteModal
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
//Timer
  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>
          <Badge bg={bg}> {todo.completed ? "Completed" : "Not Completed"}</Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={8}>
              <Card.Title>{todo.title}</Card.Title>
              <Card.Text>{todo.description}</Card.Text>
              <Card.Text>
                {todo.sets > 0 && `${sets}/${todo.sets} Sets`} 
                <Button onClick={incrementSets} className="ms-3 " variant="light">
                  <i className="bi bi-plus-circle"></i>
                </Button>
                <Button onClick={resetSets} variant="light">
                  <i className="bi bi-arrow-clockwise" ></i>
                </Button>
              </Card.Text>
              <p>
                  {timer === 0 ? 
                    <span style={{ color: 'green' }}>Time&apos;s up! Keep going 💪🏻</span> : 
                    `Rest Timer: ${timer} seconds`}
              </p>

              <Button onClick={startTimer}>
                <i className="bi bi-play"></i>
              </Button>
              <Button onClick={pauseTimer} className="ms-2">
                <i className="bi bi-pause-fill"></i>
              </Button>
              <Button onClick={resetTimer} className="ms-2">
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
              <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
                <i className="bi bi-pencil"></i>
              </Button>
              <Button variant="danger" onClick={handleShowDeleteModal} className="ms-2">
                <i className="bi bi-trash3"></i>
              </Button>
            </Col>
            <Col sm={4}>
              {todo.imageUrl && (
              <img
                src={todo.imageUrl}
                alt=""
                style={{ width: "100%" }}
              />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <DeleteTodoModal
            show={showDeleteModal}
            handleClose={() => handleCloseDeleteModal(false)}
            todo={todo}
          />
    </>
  );
}
