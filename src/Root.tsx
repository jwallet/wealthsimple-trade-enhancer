import Base from "./components/Base";
import useLocation from "./hooks/locationHooks";

export default function Root() {
  const [location] = useLocation();
  return <Base location={location} />;
}
