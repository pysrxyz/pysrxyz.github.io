import { Scroll, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import Minimap from "./Minimap";
import Item from "./Item";
import { state } from "../App";

export default function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  return (
    <ScrollControls
      horizontal
      damping={0.1}
      pages={(width - xW + urls.length * xW) / width}
    >
      <Minimap />
      <Scroll>
        {
          urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
}
