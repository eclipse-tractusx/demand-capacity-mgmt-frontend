import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {DemandContext} from '../contexts/DemandContextProvider';

const AddForm = () => {
    const { createDemand } = useContext(DemandContext);

    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [requiredValue, setRequiredValue] = useState('');
    const [deliveredValue, setDeliveredValue] = useState('');
    const [maximumValue, setMaximumValue] = useState('');
    const [productId, setProductId] = useState('1');
    const [projectId, setProjectId] = useState('1');
    const [demandCategory, setDemandCategory] = useState('');
    const [companyId, setCompanyId] = useState('1');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDemand = {
            startDate,
            endDate,
            requiredValue: parseInt(requiredValue),
            deliveredValue: parseInt(deliveredValue),
            maximumValue: parseInt(maximumValue),
            productId,
            projectId,
            demandCategory,
            companyId,
            description,
        };
        createDemand(newDemand);
        resetForm();
    };

    const resetForm = () => {
        setDescription('');
        setStartDate('');
        setEndDate('');
        setRequiredValue('');
        setDeliveredValue('');
        setMaximumValue('');
        setDemandCategory('');
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'description':
                setDescription(value);
                break;
            case 'startDate':
                setStartDate(value);
                break;
            case 'endDate':
                setEndDate(value);
                break;
            case 'requiredValue':
                if (value >= 0) {
                    setRequiredValue(value);
                }
                break;
            case 'deliveredValue':
                if (value >= 0) {
                    setDeliveredValue(value);
                }
                break;
            case 'maximumValue':
                if (value >= 0) {
                    setMaximumValue(value);
                }
                break;
            case 'demandCategory':
                setDemandCategory(value);
                break;
            default:
                break;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <p>Description *</p>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>
            <p />
            <p>Start Date *</p>
            <Form.Group>
                <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    value={startDate}
                    pattern="\d{4}-\d{2}-\d{2}"
                    onChange={onInputChange}
                    required
                />
            </Form.Group>
            <p />
            <p>End Date *</p>
            <Form.Group>
                <Form.Control
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    value={endDate}
                    onChange={onInputChange}
                    pattern="\d{4}-\d{2}-\d{2}"
                    required
                />
            </Form.Group>
            <p />
            <p>Required Value *</p>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Required Value"
                    name="requiredValue"
                    value={requiredValue}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>
            <p />
            <p>Delivered Value *</p>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Delivered Value"
                    name="deliveredValue"
                    value={deliveredValue}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>
            <p />
            <p>Maximum Value *</p>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Maximum Value"
                    name="maximumValue"
                    value={maximumValue}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>
            <p />

            <p>Demand Category *</p>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Demand Category"
                    name="demandCategory"
                    value={demandCategory}
                    onChange={onInputChange}
                    required
                />
            </Form.Group>
            <p />

            <Button variant="success" type="submit" block>
                Add New Demand
            </Button>
        </Form>
    );
};

export default AddForm;
