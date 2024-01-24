import { Canvas } from "@react-three/fiber";
import { proxy } from "valtio";
import Items from "./components/Items";

export const state = proxy({
  clicked: null,
  urls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 5, 7, 8, 2, 4, 9, 6].map(
    (u) => `/${u}.jpg`
  ),
});

const App = () => (
  <Canvas
    gl={{ antialias: false }}
    dpr={[1, 1.5]}
    onPointerMissed={() => (state.clicked = null)}
  >
    <Items />
  </Canvas>
);

export default App;
