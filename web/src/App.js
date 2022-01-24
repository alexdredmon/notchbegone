import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Slider from '@mui/material/Slider'


import If from './util'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const DEFAULT_OPACITY = 75
function App() {
  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY)

  const handleUploadFile = () => {
    setLoading(true)
    let formData = new FormData()
    formData.append(
      'opacity',
      opacity,
    )
    formData.append(
      'file',
      file,
      file.name,
    )
    const headers = {
      "Content-Type": file.type,
    }
    axios.post(
      `${process.env.REACT_APP_NOTCHBEGONE_API_URL}/upload`,
      formData,
      headers,
    ).then(response => {
      const image = response.data.image
      setImage(`data:image/jpeg;base64,${image}`)
      setTimeout(() => {
        document.getElementById('download-link').click()
        setLoading(false)
        setImage(null)
        setFile(null)
        setOpacity(DEFAULT_OPACITY)
      }, 200)
    })
    const uploadInput = document.getElementById('file-upload')
    if (uploadInput) {
      uploadInput.value = null
    }
  }

  const handleSelectFile = e => {
    const upload = e.target.files[0]
    if (! upload) {
      return false
    }
    setFile(upload)
    getBase64(upload).then(data => {
      setImage(`${data}`)
    })
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
      <If condition={! image}>
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
      <If condition={image}>
        <div className="OpacityRow">
          <label>
            Overlay Opacity: {opacity}%
          </label>
          <Slider
            value={opacity}
            onChange={e => setOpacity(e.target.value)}
            max={100}
            min={1}
            style={{
              color: '#000000',
            }}
          />
        </div>
        <div
          className="PreviewImage"
          id="img"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="PreviewNotch" />
          <div
            className="PreviewBar"
            style={{
              opacity: opacity / 100,
            }}
          />
        </div>
      </If>
      <If condition={image && ! loading}>
        <button
          className="DownloadButton"
          onClick={handleUploadFile}
        ></button>
      </If>
      <If condition={loading}>
        <h1>
          Crafting your image...
        </h1>
      </If>
        <a
          href={image}
          id="download-link"
          download="NotchBeGoneBackground.jpg"
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
