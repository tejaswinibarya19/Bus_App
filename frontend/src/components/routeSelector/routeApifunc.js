
import axios from 'axios';

export async function getRoutesFromApi(startCity, destination) {
    console.log("Start city:", startCity);
    console.log("Destination:", destination);

    const baseURL = `http://localhost:8080/booking/?startCity=${encodeURIComponent(startCity)}&destination=${encodeURIComponent(destination)}`;

    try {
        let response = await axios.post(baseURL);  // ✅ Use GET instead of POST
        return response.data;
    } catch (error) {
        console.error("Error fetching routes:", error.response?.data || error.message);
        return { status: false, message: "Failed to fetch routes" };
    }
}
