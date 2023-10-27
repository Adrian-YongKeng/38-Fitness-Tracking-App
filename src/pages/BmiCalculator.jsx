import { useState } from "react";
import { Container ,Button , Form, ProgressBar} from "react-bootstrap";
import "react-router-dom";

export default function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [classification, setClassification] = useState('');

    const calculateBMI = () => {
      if (!weight || !height) {
        return; // Don't calculate BMI if weight or height is not entered
      }
      const heightMeters = height/100;
      const calculatedBMI = weight / (heightMeters * heightMeters);
      setBMI(calculatedBMI);

      if (calculatedBMI < 18.5) {
        setClassification('Underweight');
      } else if (calculatedBMI < 25) {
        setClassification('Normal Weight');
      } else if (calculatedBMI < 30) {
        setClassification('Overweight');
      } else if (calculatedBMI < 35){
        setClassification('Obese');
      } else {
        setClassification('Extremely Obese')
      }
    };

    const getBarVariant = () => {
      if (bmi === null) return "secondary";
      if (bmi < 18.5) return "info";
      if (bmi < 25) return "success";
      if (bmi < 30) return "warning";
      if (bmi < 35) return "danger";
      return "dark";
    };

  return (
    <Container className="my-3 text-center">
      <h1 className="my-3">BMI Calculator</h1>
      {bmi !== null  && weight && height && (
        <div className="mt-5">
          <h4 className={`text-${getBarVariant()}`}>BMI: {bmi.toFixed(2)}</h4>
          <ProgressBar 
            now={bmi} 
            max={40} 
            variant={getBarVariant()} 
            label={`${bmi !== null ? bmi.toFixed(2) : "0"}`}
            style={{ height: "28px" }}
            className="my-4"
           />
          <h4 className={`text-${getBarVariant()}`}>You are {classification}.</h4>
        </div>
      )}
      <Form className="my-5">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Height (cm):</Form.Label>
          <Form.Control
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mx-auto text-center"
            style={{ width: "420px" }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Weight (kg):</Form.Label>
          <Form.Control
             type="number"
             value={weight}
             onChange={(e) => setWeight(e.target.value)}
             className="mx-auto text-center"
            style={{ width: "420px" }}
            required
          />
        </Form.Group>
        
        <Button variant="primary"  onClick={calculateBMI}>
          Submit
        </Button>
      </Form>
      
    </Container>
  );
}
