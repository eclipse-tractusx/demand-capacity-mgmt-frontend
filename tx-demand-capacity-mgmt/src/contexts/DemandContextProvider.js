import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DemandContext = createContext();

const DemandContextProvider = (props) => {
    const api = axios.create({
        baseURL: 'http://localhost:8080', // Set the new port here
    });

    const [demands, setDemands] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await api.get('/demand', {
                params: {
                    project_id: 1,
                },
            });
            const result = response.data;
            setDemands(result);

        } catch (error) {
            // Handle the error
        }
    }

    useEffect(() => {
        const sortedDemands = demands.sort((a, b) => (a.name < b.name ? -1 : 1));
        // Do something with sortedDemands or remove the sorting logic if not needed
    }, [demands]);

    const deleteDemand = (id) => {
        deleteClick(id);
    }

    async function deleteClick(id) {
        try {
            await api.delete('/demand/' + id);
            setDemands(prevDemands => prevDemands.filter(demand => demand.id !== id));
        } catch (error) {
            // Handle the error
        }
    }

    return (
        <DemandContext.Provider value={{ demands, deleteDemand }}>
            {props.children}
        </DemandContext.Provider>
    );
};

export default DemandContextProvider;
