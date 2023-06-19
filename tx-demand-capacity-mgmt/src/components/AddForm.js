import { Form, Button } from "react-bootstrap"
import {DemandContext} from '../contexts/DemandContextProvider';
import React, {useContext, useEffect, useState} from 'react';
//import axios from "axios";



const AddForm = () =>{

    const [editor, setEditor] = useState(null);
    const handleCreatorChange = (event) => {
        setEditor(event.target.value);
    }


    const [creator, setCreator] = useState(null);
    const handlePersonChange = (event) => {
        setCreator(event.target.value);
    }

    const [persons, setPersons] = useState([]);
    useEffect(() => {

        handleClick();
    }, [])

    async function handleClick() {
      //  const result = await axios.get('/user');
      //  setPersons(result.data);
        setPersons(["Pedro"]);
    }

    const {addTask} = useContext(DemandContext);

    const [newTask, setNewTask] = useState({
        title:"", status:"", description:"", editor:"", creator:"", day:"",month:"", year:""
    });

    const onInputChange = (e) => {
        setNewTask({...newTask,[e.target.name]: e.target.value})
    }



    const {title, description}= newTask;
    const status = 'open';

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDateObj = new Date();
        if (dateObj.getTime() > currentDateObj.getTime()) {
            addTask(title, status, description, editor, creator, day,month, year);

        } else {
            window.alert('Invalid Date')
        }

       }

    const [date, setDate] = useState("");

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
    const year = dateObj.getFullYear();



    return (

        <Form onSubmit={handleSubmit}>
            <p>Title *</p>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <p/>
            <p>Description *</p>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <p/>
            <p>Creator *</p>
            <Form.Group>

                    <Form.Control as="select" onChange={handlePersonChange}>
                        <option></option>
                        {persons.map(option => (
                            <option key={option.firstname} value={option.firstname}>{option.firstname}</option>
                        ))}


                    </Form.Control>
            </Form.Group>
            <p/>
            <p>Editor *</p>
            <Form.Group>
                <Form.Control as="select" onChange={handleCreatorChange}>
                    <option></option>
                    {persons.map(option => (
                        <option key={option.firstname} value={option.firstname}>{option.firstname}</option>
                    ))}


                </Form.Control>
            </Form.Group>
            <p/>
            <p>Expiration date *</p>
            <Form.Group>

                <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required

                />

            </Form.Group>
            <p/>
            <Button variant="success" type="submit" block>
                Add New Task
            </Button>
        </Form>

    )
}

export default AddForm;