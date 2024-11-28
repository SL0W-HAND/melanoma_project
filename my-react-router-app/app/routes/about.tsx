import type { Route} from "./+types/home";
import AboutPage from "../pages/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "about" },
  ];
}

export default function About() {
  return <AboutPage/>;
}
