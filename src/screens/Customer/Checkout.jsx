import React, {useEffect, useState} from 'react';
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import axios from 'axios';

const Checkout = () => {

  const [updateAddress, setUpdateAddress] = useState();
  const token = localStorage.getItem('token');
  const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
};
  const address = {
    "addressLine": "river bank12",
    "street": "river road",
    "city": "hyd",
    "state": "TS",
    "pincode": 5550808
}
  // useEffect(() => {
    const fetchAddress = async () => {
      const userId = localStorage.getItem('userName');
      console.log(userId,'  ',token)
      try{
        if(userId !== 'Shopper123'){
          await axios.put('http://localhost:8083/updateAddress/'+userId,address,config)
            .then(response => {
                if(response.status===200){
                  console.log('updated address',response.data);
                }
            })
        }else{console.log('You are not a authorized user.')}

      }catch(error) {
        console.log('error updating address details', error);
      }
    }
  // })

  return (
    <div style={{marginTop: '74px'}}>
      <CustomerNavHeader />
      Check out
      <div style={{top:'20%'}}>
      <button type='submit' onClick={fetchAddress}>submit address</button>
      </div>
    </div>
  )
}

export default Checkout;
