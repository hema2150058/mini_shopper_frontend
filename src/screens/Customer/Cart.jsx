import React, {useState} from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import axios from 'axios';
import { uploadExcel } from '../../api/CustomerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'

const Cart = () => {
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  async function handleSubmit(event) {
    event.preventDefault()
    //const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await uploadExcel(formData).then((response) => {
      console.log(response.data);
      localStorage.setItem('orderNumber',response.data);

    });

  }

  // const handleFileUpload = (event) => {
  //   // get the selected file from the input
  //   const file = event.target.files[0];
  //   // create a new FormData object and append the file to it
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   // make a POST request to the File Upload API with the FormData object and Rapid API headers
  //   axios
  //     .post("https://file-upload8.p.rapidapi.com/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "x-rapidapi-host": "file-upload8.p.rapidapi.com",
  //         "x-rapidapi-key": "your-rapidapi-key-here",
  //       },
  //     })
  //     .then((response) => {
  //       // handle the response
  //       alert('uploaded file');
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle errors
  //       console.log(error);
  //     });
  // };
  return (
    <div style={{ marginTop: '74px' }}>
      <CustomerNavHeader />
      <div style={{ top: '20%', backgroundColor: 'navy' }}>
        <p>check1</p><p>check2</p><p>check3</p><p>check4</p>

      </div>
&nbsp;&nbsp;


      {/* <span className='uploadfile-container'>
        <label  className='upload-label'>      
          Upload File <span className='icon-span' >
        <FontAwesomeIcon color='dimgray' className='upload-icon' size='5x' icon={faUpload} /></span> </label></span>

        <input type='file' className='upload' onChange={handleFileUpload} name='upload' style={{ border: 'none' }}></input> */}

        <br>
        </br>
        <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" accept=".xl*" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
    </div>

  )
}

export default Cart;
