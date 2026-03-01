import GrandYozakura from './GrandYozakura'

export default function App() {
  return <GrandYozakura
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
