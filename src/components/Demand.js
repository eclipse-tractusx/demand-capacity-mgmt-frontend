import {useContext, useState, useEffect} from 'react';
import {DemandContext} from '../contexts/DemandContextProvider';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import EditForm from './EditForm'



const Demand = ({demand}) => {

    const {deleteDemand, updateStatus} = useContext(DemandContext)

    const [show, setShow] = useState(false);


    const [selectedItem, setSelectedItem] = useState('');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSelect = (eventKey) => {
        setSelectedItem(eventKey);
        updateStatus(demand.id, eventKey);

    };

    useEffect(() => {
        handleClose()
    }, [demand])

    var startDate = new Date(demand.startDate);
    var endDate = new Date(demand.endDate);

    var formattedStartDate = startDate.toISOString().split('T')[0];
    var formattedEndDate = endDate.toISOString().split('T')[0];

    return (
        <>
            <td>{demand.id}</td>
            <td>{demand.product}</td>
            <td>{demand.companyId}</td>
            <td>{demand.requiredValue}</td>
            <td>{demand.deliveredValue}</td>
            <td>{demand.maximumValue}</td>
            <td>{demand.demandCategory}</td>
            <td>{demand.description}</td>
            <td>{formattedStartDate}</td>
            <td>{formattedEndDate}</td>

            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => deleteDemand(demand.id)} className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
                </OverlayTrigger>


            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Demand
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theDemand={demand} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Demand;