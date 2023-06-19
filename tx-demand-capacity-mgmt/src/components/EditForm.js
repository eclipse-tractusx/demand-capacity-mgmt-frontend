import { Form, Button } from "react-bootstrap"

import {DemandContext} from '../contexts/DemandContextProvider';
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

const EditForm = ({theDemand}) =>{

    const id = theDemand.id;

    const [title, setTitle] = useState(theDemand.title);
    const [status, setStatus] = useState(theDemand.status);
    const [description, setDescription] = useState(theDemand.description);
    const [editor, setEditor] = useState(theDemand.editor);
    const [creator, setCreator] = useState(theDemand.creator);

    const [date, setDate] = useState(new Date(theDemand.year, theDemand.month, theDemand.day));

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const handleCreatorChange = (event) => {
        setEditor(event.target.value);
    }

    const handlePersonChange = (event) => {
        setCreator(event.target.value);
    }

    const [persons, setPersons] = useState([]);
    useEffect(() => {

        handleClick();
    }, [])
    async function handleClick() {
        const result = await axios.get(
            '/user');
        setPersons(result.data);
    }

    const {updateDemand} = useContext(DemandContext);

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDateObj = new Date();
        if (dateObj.getTime() > currentDateObj.getTime()) {
            updateDemand(id, title, status, description, editor, creator, day,month, year);
        } else {
            window.alert('Invalid Date')
        }

    }

    return (

        <Form onSubmit={handleSubmit}>
            <p>Title</p>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange = { (e) => setTitle(e.target.value)}

                />
            </Form.Group>
            <p/>
            <p>Status</p>
            <Form.Group>
                <Form.Control as="select" onChange={handleSelectChange}>
                <option>open</option>
                <option>closed</option>


                </Form.Control>
            </Form.Group>
            <p/>
            <p>Description</p>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange = { (e) => setDescription(e.target.value)}

                />
            </Form.Group>
            <p/>
            <p>Creator</p>
            <Form.Group>
                <Form.Control as="select" onChange={handlePersonChange}>
                    <option>{creator}</option>
                    {persons.map(option => (
                        <option key={option.firstname} value={option.firstname}>{option.firstname}</option>
                    ))}

                </Form.Control>
            </Form.Group>
            <p/>
            <p>Editor</p>
            <Form.Group>
                <Form.Control as="select" onChange={handleCreatorChange}>
                    <option>{editor}</option>
                    {persons.map(option => (
                        <option key={option.firstname} value={option.firstname}>{option.firstname}</option>
                    ))}


                </Form.Control>
            </Form.Group>
            <p/>
            <p>Expiration date</p>
            <Form.Group>

                <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}

                />

            </Form.Group>
            <p/>
            <Button variant="success" type="submit" block>
                Edit Demand
            </Button>
        </Form>

    )
}

export default EditForm;