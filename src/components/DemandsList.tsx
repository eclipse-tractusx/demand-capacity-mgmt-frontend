import React, { useContext, useState, useMemo, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DemandContext } from '../contexts/DemandContextProvider';
import DemandComponent from './Demand';
import AddForm from './AddForm';
import Pagination from './Pagination';

const DemandsList: React.FC = () => {
  const { demands } = useContext(DemandContext)!;

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const demandsPerPage = 20;

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const slicedDemands = useMemo(() => {
    const indexOfLastDemand = currentPage * demandsPerPage;
    const indexOfFirstDemand = indexOfLastDemand - demandsPerPage;
    return demands.slice(indexOfFirstDemand, indexOfLastDemand);
  }, [demands, currentPage, demandsPerPage]);

  const totalPagesNum = useMemo(() => Math.ceil(demands.length / demandsPerPage), [demands, demandsPerPage]);

  const DemandComponentMemoized = useMemo(() => React.memo(DemandComponent), []);

  const demandItems = useMemo(
    () =>
      slicedDemands.map((demand) => (
        <tr key={demand.id}>
          <DemandComponentMemoized demand={demand} />
        </tr>
      )),
    [slicedDemands, DemandComponentMemoized]
  );

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
        <tbody>{demandItems}</tbody>
      </table>

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentDemands={slicedDemands}
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
