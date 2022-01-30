import axios from 'axios'
import { useRef } from 'react'
import Slider from '@mui/material/Slider'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import { If } from '../../util/data'
import Toggle from '../form/Toggle'

import styles from './styles.module.css'

var moment = require('moment')


const Preview = props => {
  const {
    state: {
      device, setDevice,
      file,
      generatedFile, setGeneratedFile,
      image,
      loading, setLoading,
      model, setModel,
      opacity, setOpacity,
    }
  } = props
  const downloadLink = useRef(null)

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
      setGeneratedFile(`data:image/jpeg;base64,${image}`)
      downloadLink.current.click()
      setLoading(false)
    })
  }

  if (! image) {
    return null
  }

  if (device === 'phone' && ['14', '16'].includes(model)) {
    setModel('13')
  }
  if (device === 'laptop' && ['13', '13pro', '12', '11'].includes(model)) {
    setModel('14')
  }

  const saveFileName = `notchbegone_background-${moment().format('YYYY-MM-DD_h-mm-ssa')}.jpg`

  return (
    <section className={styles.preview}>
      <summary className={styles.settings}>
        <div className={styles.device}>
          <label>
            Device:
          </label>
          <Toggle
            options={[
              {
                icon: LaptopMacIcon,
                value: 'laptop',
              },
              {
                icon: PhoneIphoneIcon,
                value: 'phone',
              },
            ]}
            setValue={setDevice}
            value={device}
          />
        </div>
        <div className={styles.model}>
          <label>
            Model:
          </label>
          <If condition={device==='laptop'}>
            <Toggle
              options={[
                {
                  label: '14"',
                  value: '14',
                },
                {
                  label: '16"',
                  value: '16',
                },
              ]}
              setValue={setModel}
              value={model}
            />
          </If>
          <If condition={device==='phone'}>
            <Toggle
              options={[
                {
                  label: '13',
                  value: '13',
                },
                {
                  label: '13 Pro',
                  value: '13pro',
                },
                {
                  label: '12',
                  value: '12',
                },
                {
                  label: '11',
                  value: '11',
                },
              ]}
              setValue={setModel}
              value={model}
            />
          </If>
        </div>
      </summary>
      <summary className={styles.settings}>
        <label>
          Bar Opacity: <figure>{opacity}%</figure>
        </label>
        <Slider
          value={opacity}
          onChange={e => setOpacity(e.target.value)}
          max={100}
          min={1}
          style={{
            color: '#e8d6ca',
          }}
        />
      </summary>
      <figure
        className={styles.image}
        style={{
          backgroundImage: `url(${image})`,
        }}
        // onClick={handleUploadFile}
      >
        <mark className={styles.notch} />
        <mark
          className={styles.bar}
          style={{
            opacity: opacity / 100,
          }}
        />
        <If condition={! loading}>
          <button
            title="Download Background"
            className={styles.download}
            onClick={handleUploadFile}
          >
            Generate Background
          </button>
        </If>
        <If condition={loading}>
          <summary className={styles.loading}>
            Crafting your image...
          </summary>
        </If>
      </figure>
      <a
        href={generatedFile}
        ref={downloadLink}
        download={saveFileName}
        style={{
          display: 'none',
        }}
      >
        Download File
      </a>
    </section>
  )
}

export default Preview
