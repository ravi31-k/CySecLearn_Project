import React,{useState} from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; 
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; 
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; 

export const FileUpload = ({socket}) => {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [selectPdfFile, setSelectPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(null);

  // onchange event
  const fileObj=['application/pdf'];


  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileObj.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setSelectPdfFile(e.target.result);
          setPdfFileError('');
          setViewPdf(selectPdfFile);
          // Send the PDF data to the server
          socket.current.emit('uploadPdf', e.target.result);
        };
      } else {
        setSelectPdfFile(null);
        setPdfFileError('Please select a valid PDF file');
      }
    } else {
      alert('Select a PDF file');
    }
  };
  if(socket.current!==null){
  socket.current.on('newPdf', (pdfData) => {
    setViewPdf(pdfData);
  });
}

  // form submit
  const handleSubmit=(e)=>{
    
  }


  return (
    <div className='container'>
    
      <form className='form-group' onSubmit={handleSubmit}>
        <input type="file" className='form-control'
          required onChange={handleFileChange}
         
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        {/* <button type="submit" className='btn2 btn-success btn-lg'>
          UPLOAD
        </button> */}
      </form>
      
      <div className='pdf-container' style={{"height":"80vh"}}>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file choosen </>}
      </div>

    </div>
  )
}

export default FileUpload
