import axios from "axios";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        'content-type': 'application/json',
        'accept': 'application/json',
    }
};

export async function getAllOrders() {
    return await axios.get('http://localhost:8082/orderHistory', config);
}

export async function getAllPendingOrders() {
    return await axios.get('http://localhost:8082/pendingOrders', config);
}

export async function statusChangeToReview(orderNumber) {
    return await axios.patch('http://localhost:8082/statusChangeToReview/'+orderNumber, config);
}

export async function statusChangeToRejected(orderNumber) {
    return await axios.patch('http://localhost:8082/statusChangeToRejected/'+orderNumber, config);
}

export async function statusChangeToSuccess(orderNumber) {
    return await axios.patch('http://localhost:8082/statusChangeToSuccess/'+orderNumber, config);
}
