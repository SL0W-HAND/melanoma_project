import type { Route} from "./+types/home";
import { Welcome } from "../pages/welcome";
import Detection from "../pages/detection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detection of skin lesion" },
  ];
}

export default function DetectionPage() {
  return <Detection />;
}
