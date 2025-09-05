import React, { useState } from 'react';
import './Routeselector.css';
import * as apiCall from './routeApifunc';
import BusList from '../BusList/BusList';

export default function Routeselector() {
    const [dataInp, setData] = useState(null);
    const [startCity, setStartCity] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const handleFromCity = (e) => {
        setStartCity(e.target.value);
        localStorage.setItem("start", e.target.value);
    };

    const handleToCity = (e) => {
        setDestination(e.target.value);
        localStorage.setItem("destination", e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
        localStorage.setItem("date", e.target.value);
    };

    const getRoutes = async (e) => {
        e.preventDefault();

        if (!startCity || !destination) {
            alert("Please select both start city and destination.");
            return;
        }

        try {
            console.log("Fetching routes for:", startCity, destination);
            const response = await apiCall.getRoutesFromApi(startCity, destination);
            console.log("API Response:", response);

            if (response.status && response.buses) {
                setData(response.buses);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
            setData([]);
        }
    };

    const renderBusList = () => {
        if (!dataInp) return null;
        if (dataInp.length > 0) {
            return <BusList value={dataInp} />;
        }
        return <div className="text-dark text-center mt-3">No buses available for this route</div>;
    };

    return (
        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={getRoutes}>
                    <select name="from_city" className="selectpicker" onChange={handleFromCity}>
                        <option value="">FROM</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                    </select>

                    <select name="to_city" className="selectpicker" onChange={handleToCity}>
                        <option value="">TO</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Vishakapatnam">Vishakapatnam</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                    </select>

                    <input type="date" onChange={handleDate} />

                    <button type="submit" className="btn btn-primary btn-md getRoute">Find Buses</button>
                </form>

                <div>{renderBusList()}</div>
            </div>
        </div>
    );
}
