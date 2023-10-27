import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { Button, Modal } from "react-bootstrap";


export default function DeleteRoutineModal({ show, handleClose, todo}) {
    const setTodos = useContext(TodoContext).setTodos;

    const deleteTodo = () => {
        console.log("Delete button clicked");
        setTodos((prevTodos) => 
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
        );
    handleClose();
    };

    return (
        
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p>Are you sure you want to delete this exercise?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteTodo}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        
    );
}
