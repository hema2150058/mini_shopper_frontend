import React, {useState} from 'react';
import { uploadExcel } from '../api/CustomerApi';
import axios from 'axios';

function FileUpload() {

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
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await uploadExcel(formData)
        .then((response) => {

          console.log(response.data);
          localStorage.setItem('orderNumber', response.data);
          alert('File uploaded successfully and ' + response.data);
          event = '';
        })
        .catch(error => {
          alert('Error uploading file', error);
        })

  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default FileUpload;