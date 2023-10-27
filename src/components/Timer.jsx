import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  incrementTimer,
} from '../timerSlice';

export default function Timer () {
  const dispatch = useDispatch();
  const { seconds, isRunning } = useSelector((state) => state.timer);
  
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
              dispatch(incrementTimer());
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    },  [isRunning, dispatch]);

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    
      return (
          <Row className="d-flex justify-content-center me-5">
            <Col className="d-flex justify-content-center">
              <div style={{ color: 'white', fontSize: '28px' }} className="timer-content">
                <Button variant="dark" onClick={() => {
                    if (isRunning) {
                      dispatch(pauseTimer());
                    } else {
                      dispatch(startTimer());
                    }
                  }}
                >
                  {isRunning ? <i className="bi bi-stopwatch"></i> : <i className="bi bi-stopwatch"></i>}
                </Button>
                <span>{formatTime(seconds)}</span>
                <Button variant="dark" onClick={() => {
                  dispatch(resetTimer());
                }}>
                  <i className="bi bi-arrow-clockwise"></i>
                </Button>
              </div>
            </Col>
          </Row>
      );
}