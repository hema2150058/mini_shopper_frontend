import React, {useState} from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import axios from 'axios';

const PurchaseHistory = () => {

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const downloadPDF = () => {
    setLoader(true);
    setError('');
    const orderNumber=34883;
    if(orderNumber){
      const axiosPdfConfig = {
        responseType: 'blob',
        headers: {
          Accept: 'application/json',
        }
      }
      console.log('inside the handlePDF');
      axios.get('http://localhost:8082/receipt/'+ orderNumber,axiosPdfConfig)
        .then((response)=> {
          console.log('inside the axios then');
          setLoader(false);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download','MoneyReceipt.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
          setError(error.message);
        })
    }

  }

  return (
   
    <div style={{marginTop:'74px'}}>
       <CustomerNavHeader />
      Purchase History out
      <br/><br/>

      <div className='download-div'>
        <h5>Download the Money receipt</h5>
        <button onClick={downloadPDF}>
          {loader? (
            <>Downloading</>
          ):(
            <>Download</>
          )}
        </button>
        {error !== ''&&(
          <div className='error.msg'>{error}</div>
        )} 
      </div>


        <br/><br/>
      <div style={{top:'20%'}}>
      <p>check1</p><p>check2</p><p>check3</p><p>check4</p><p>check4</p>
      </div>
    </div>
  )
}

export default PurchaseHistory;
