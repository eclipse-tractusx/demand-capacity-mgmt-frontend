import { Modal,ModalHeader, ModalBody, ModalTitle,ModalFooter, Button, Alert} from 'react-bootstrap';
import {useContext, useEffect, useState } from 'react';
import {DemandContext} from '../contexts/DemandContextProvider';
import Demand from './Demand';
import AddForm from './AddForm';
import Pagination from './Pagination';

const DemandsList = () => {

    const {demands} = useContext(DemandContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [demandsPerPage] = useState(20)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [demands])

    const indexOfLastDemand = currentPage * demandsPerPage;
    const indexOfFirstDemand = indexOfLastDemand - demandsPerPage;
    let currentDemands;


    if (indexOfFirstDemand === 0 || indexOfLastDemand !== 0) {
        currentDemands = demands.slice(indexOfFirstDemand, indexOfLastDemand);
    } else {
        currentDemands = [];
    }

    const totalPagesNum = Math.ceil(demands.length / demandsPerPage);


    return (
        <>
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage Demands </h2>
                    </div>
                    <div className="col-sm-6">
                        <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Demand</span></Button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                Demand List Updated Successfully!
            </Alert>

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Project Id</th>
                    <th>Company Id</th>
                    <th>Required Value</th>
                    <th>Delivered Value</th>
                    <th>Maximum Value</th>
                    <th>Demand Category</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>

                </tr>
                </thead>
                <tbody>

                {
                    currentDemands.map(demand => (
                        <tr key={demand.id}>
                            <Demand demand={demand} />
                        </tr>
                    ))
                }


                </tbody>
            </table>

            <Pagination pages = {totalPagesNum}
                        setCurrentPage={setCurrentPage}
                        currentDemands ={currentDemands}
                        demands = {demands} />

            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>
                        Add Demand
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <AddForm />
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default DemandsList;