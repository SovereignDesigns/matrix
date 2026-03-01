import MaxFuelRX from './MaxFuelRX'

export default function App() {
  return <MaxFuelRX
  heroVideo="/hero-video.mp4"
  bottleImage="/bottle.png"
  noteImages={[
    "/colour-shot.jpg",   // Colour tab
    "/nose-shot.jpg",     // Nose tab
    "/taste-shot.jpg",    // Taste tab
    "/finish-shot.jpg",   // Finish tab
  ]}
/>
}
