import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { DemandContext } from '../contexts/DemandContextProvider';
import Demand from './Demand';
import AddForm from './AddForm';
import Pagination from './Pagination';

const DemandsList: React.FC = () => {
  const { demands } = useContext(DemandContext)!;

  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [demandsPerPage] = useState(20);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    handleClose();

    return () => {
      handleShowAlert();
    };
  }, [demands]);

  const indexOfLastDemand = currentPage * demandsPerPage;
  const indexOfFirstDemand = indexOfLastDemand - demandsPerPage;
  

  
  demands.slice(indexOfFirstDemand, indexOfLastDemand);
 

  const totalPagesNum = Math.ceil(demands.length / demandsPerPage);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>Manage Demands</h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i> <span>Add New Demand</span>
            </Button>
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
          {demands.map(demand => (
            <tr key={demand.id}>
              <Demand demand={demand} />
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentDemands={demands}
        demands={demands}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Demand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DemandsList;
