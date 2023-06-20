import React, { useContext, useState, useEffect } from 'react';
import { DemandContext } from '../contexts/DemandContextProvider';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm';

const Demand = ({ demand }) => {
    const { deleteDemand } = useContext(DemandContext);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose();
    }, [demand]);

    const startDate = new Date(demand.startDate);
    const endDate = new Date(demand.endDate);

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

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
                    }
                >
                    <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal">
                        <i className="material-icons">&#xE254;</i>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }
                >
                    <button onClick={() => deleteDemand(demand.id)} className="btn text-danger btn-act" data-toggle="modal">
                        <i className="material-icons">&#xE872;</i>
                    </button>
                </OverlayTrigger>
            </td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Demand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm theDemand={demand} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Demand;
