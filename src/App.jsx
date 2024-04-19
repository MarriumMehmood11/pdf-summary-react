import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [openAiSummary, setOpenAiSummary] = useState('');
  const handleFileSelect = event => {
    setFile(event.target.files[0]); // Capture the first file
  };

  const handleSummerize = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // 'file' is the key expected on the server side

    try {
      const response = await axios.post('http://localhost:5000/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if(response.data.summary) {
        setOpenAiSummary(response.data.summary)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div>
        <input type="file" name="pdf_file" id="pdf_file" onChange={handleFileSelect} accept="application/pdf" />
        <button onClick={handleSummerize}>Summarize</button>
      </div>
      <div>
        <div>
          <h1>OpenAI results</h1>
          <p>{openAiSummary}</p>
        </div>
        <div>
          <h1>LLM results</h1>
        </div>
      </div>
    </div>
  )
}

export default App
