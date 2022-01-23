import { useState } from 'react'
import axios from 'axios'
import './App.css'

import If from './util'

function App() {
  const [image, setImage] = useState()
  const handleSelectFile = e => {
    const file = e.target.files[0]
    if (! file) {
      return false
    }
    let formData = new FormData()
    formData.append(
      'file',
      file,
      file.name,
    )
    const headers = {
      "Content-Type": file.type,
    }
    axios.post(
      // TODO: move to env var
      // 'http://localhost:7001/upload/',
      'https://us-central1-notch-be-gone.cloudfunctions.net/upload',
      formData,
      headers,
    ).then(response => {
      const image = response.data.image
      setImage(`data:image/jpeg;base64,${image}`)
      setTimeout(() => {
        document.getElementById('download-link').click()
      }, 200)
    })
    const uploadInput = document.getElementById('file-upload')
    if (uploadInput) {
      uploadInput.value = null
    }
  }
  return (
    <div className="App">
      <header>
        <img
          alt="Notch Be Gone"
          className="AppLogo"
          src="/img/logo.png"
        />
        <img
          className="AppTitle"
          src="/img/title.png"
          alt="Free notchless background generator"
        />
      </header>
      <If condition={true || ! image}>
        <img
          className="AppDemo"
          src="/img/demo.png"
          alt=""
        />
        <input
          accept="*.csv"
          style={{ display: 'none' }}
          id="file-upload"
          multiple
          type="file"
          onChange={e => handleSelectFile(e)}
        />
        <label htmlFor="file-upload">
          <button
            className="UploadButton"
            onClick={() => document.getElementById('file-upload').click()}
          ></button>
        </label>
      </If>
        <a
          href={image}
          id="download-link"
          download
          style={{
            display: 'none',
          }}
        >
          Download file
        </a>
    </div>
  );
}

export default App;
