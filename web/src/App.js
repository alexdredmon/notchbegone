import { useState } from 'react'
import axios from 'axios'
import './App.css'

import If from './util'

function App() {
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [opacity, setOpacity] = useState(75)

  const handleSelectFile = e => {
    setLoading(true)
    const file = e.target.files[0]
    if (! file) {
      return false
    }
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
      <If condition={! loading}>
        <img
          className="AppDemo"
          src="/img/demo.png"
          alt=""
        />
        <div className="OpacityRow">
          <label>
            Overlay Opacity:
          </label>
          <input
            className="OpacitySetting"
            type="number"
            onChange={e => setOpacity(e.currentTarget.value)}
            max="100"
            min="1"
            value={opacity}
          />
          <label>%</label>
        </div>
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
