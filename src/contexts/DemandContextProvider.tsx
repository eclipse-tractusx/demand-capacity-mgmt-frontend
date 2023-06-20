import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export interface Demand {
  id: number;
  name: string;
  // Add more properties as needed
}

interface DemandContextData {
  demands: Demand[];
  deleteDemand: (id: number) => void;
  createDemand: (newDemand: Demand) => void;
  updateDemand: (updatedDemand: Demand) => void;
}

export const DemandContext = createContext<DemandContextData | undefined>(undefined);

const DemandContextProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const api = axios.create({
    baseURL: 'http://localhost:8080', // Set the new port here
  });

  const [demands, setDemands] = useState<Demand[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get('/demand', {
        params: {
          project_id: 1,
        },
      });
      const result: Demand[] = response.data;
      setDemands(result);
    } catch (error) {
      // Handle the error
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    demands.sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [demands]);

  const deleteDemand = async (id: number) => {
    try {
      await api.delete('/demand/' + id);
      setDemands((prevDemands) => prevDemands.filter((demand) => demand.id !== id));
    } catch (error) {
      // Handle the error
    }
  };

  const createDemand = async (newDemand: Demand) => {
    try {
      const response = await api.post('/demand', newDemand);
      const createdDemand: Demand = response.data;
      setDemands((prevDemands) => [...prevDemands, createdDemand]);
    } catch (error) {
      // Handle the error
    }
  };

  const updateDemand = async (updatedDemand: Demand) => {
    try {
      console.log(updatedDemand);
      const response = await api.put(`/demand/${updatedDemand.id}`, updatedDemand);

      const modifiedDemand: Demand = response.data;
      setDemands((prevDemands) =>
        prevDemands.map((demand) => (demand.id === modifiedDemand.id ? modifiedDemand : demand))
      );
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <DemandContext.Provider value={{ demands, deleteDemand, createDemand, updateDemand }}>
      {props.children}
    </DemandContext.Provider>
  );
};

export default DemandContextProvider;
