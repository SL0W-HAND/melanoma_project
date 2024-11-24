import type { Route} from "./+types/home";
import { Welcome } from "../welcome/welcome";
import AboutPage from "../pages/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "about" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return <AboutPage/>;
}
