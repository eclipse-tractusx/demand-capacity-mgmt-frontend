import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DemandContext } from '../contexts/DemandContextProvider';

const EditForm = ({ theDemand }) => {
    const { updateDemand } = useContext(DemandContext);

    const [requiredValue, setRequiredValue] = useState(theDemand.requiredValue);

    useEffect(() => {
        setRequiredValue(theDemand.requiredValue);
    }, [theDemand]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (requiredValue <= 0) {
            // Handle the error, display a message, or prevent form submission
            console.log('Required value must be greater than 0');
            return;
        }

        const updatedDemand = {
            id: theDemand.id,
            requiredValue,
        };
        updateDemand(updatedDemand);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <p>Required Value</p>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Required Value"
                    name="requiredValue"
                    value={requiredValue}
                    onChange={(e) => setRequiredValue(e.target.value)}
                />
            </Form.Group>

            <p />
            <Button variant="primary" type="submit" block={true.toString()}>
                Save Changes
            </Button>
        </Form>
    );
};

export default EditForm;
