import type { Route} from "./+types/home";
import { Welcome } from "../pages/welcome";
import About from "../pages/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Skin cancer detection" },
  ];
}

export default function Home() {
  return <Welcome />;
}




