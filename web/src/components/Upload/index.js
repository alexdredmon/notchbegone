import { useRef } from 'react'
import { getBase64 } from '../../util/data'
import styles from './styles.module.css'


const Upload = props => {
  const {
    state: {
      image, setImage,
      setFile,
    }
  } = props

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

  const fileUpload = useRef(null)

  return (
    <section>
      <label htmlFor="file-upload">
        <input
          accept="*.csv"
          style={{ display: 'none' }}
          ref={fileUpload}
          alt="File Upload"
          type="file"
          onChange={e => handleSelectFile(e)}
        />
        <button
          title="Upload an image"
          className={styles.button}
          onClick={() => fileUpload.current.click()}
        >
          {image ? 'Reselect image' : 'Select an image'}
        </button>
      </label>
    </section>
  )
}

export default Upload
