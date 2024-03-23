import React from "react";

interface ILocation {
  hostname: string;
  pathname: string;
  hash: string;
  search: string;
}

const getLocationParams = (location: Location): ILocation => {
  const { hostname, pathname, hash, search } = location;
  const path = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return { hostname, pathname: path, hash, search };
};

export default function useLocation() {
  const [location, setLocation] = React.useState<ILocation>(
    getLocationParams(window.location)
  );

  const observer = React.useMemo(() => {
    return new window.MutationObserver(() => {
      const newLocation = getLocationParams(window.location);
      setLocation(newLocation);
    });

  }, []);

  React.useLayoutEffect(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    window.addEventListener("popstate", () => {
      const newLocation = getLocationParams(window.location);
      setLocation(newLocation);
    });
    return () => observer.disconnect();
  }, [observer]);

  return React.useMemo(() => [location], [location]);
}
