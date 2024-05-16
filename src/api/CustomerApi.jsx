import axios from "axios";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        'content-type': 'application/json',
        'accept': 'application/json',
    }
};

const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

export async function getProducts() {
    return await axios.get('http://localhost:8082/getAllProducts', config);
}

export async function addToCart(cart) {
    return await axios.post('http://localhost:8082/addToCart', cart, config);
}

export async function updateCart(cart) {
    return await axios.put('http://localhost:8082/updateCart', cart, config);
}

export async function getCart(userId) {
    return await axios.get('http://localhost:8082/getCart/' + userId, config);
}

export async function getCartItems(userId) {
    return await axios.get('http://localhost:8082/getCartItems/' + userId, config);
}

export async function IsitemInCart(cart) {
    return await axios.post('http://localhost:8082/isItemInCart', cart, config);
}

export async function removeFromCart(cart) {
    return await axios.delete('http://localhost:8082/removeFromCart', cart, config);
    
} 

export async function uploadExcel(file) {
    return await axios.post('http://localhost:8082/uploadfile',file, uploadConfig);
}

export async function placeOrder(billingDetails) {
    return await axios.post('http://localhost:8082/placeOrder', billingDetails, config);
}
