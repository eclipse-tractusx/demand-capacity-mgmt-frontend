import DemandsList from "./DemandsList";
import DemandContextProvider from "../contexts/DemandContextProvider";



function Home() {
    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <DemandContextProvider>
                        <DemandsList />
                    </DemandContextProvider>
                </div>
            </div>
        </div>

    );
}

export default Home;