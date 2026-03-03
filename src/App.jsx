import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MaxFuelRX from './MaxFuelRX'
import Maxfuel from './Maxfuel'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MaxFuelRX
          heroVideo="/hero-video.mp4"
          bottleImage="/bottle.png"
          noteImages={[
            "/colour-shot.jpg",   
            "/nose-shot.jpg",     
            "/taste-shot.jpg",    
            "/finish-shot.jpg",   
          ]}
        />} />
        <Route path="/maxfuel" element={<Maxfuel />} />
      </Routes>
    </BrowserRouter>
  )
}
