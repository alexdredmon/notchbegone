import { useState } from 'react'
import './App.css'

import Layout from './components/Layout'


const DEFAULT_OPACITY = 75
function App() {
  const [device, setDevice] = useState('laptop')
  const [file, setFile] = useState()
  const [generatedFile, setGeneratedFile] = useState()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState("14")
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY)
  const state = {
    device, setDevice,
    file, setFile,
    generatedFile, setGeneratedFile,
    image, setImage,
    loading, setLoading,
    model, setModel,
    opacity, setOpacity,
  }

  return <Layout state={state} />
}

export default App
