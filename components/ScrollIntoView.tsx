import { useEffect, useRef } from "react";

type Props = {};

function ScrollIntoView(props: Props) {
  const scroll = useRef<any>(null);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    return () => {};
  }, []);
  return <div ref={scroll}> </div>;
}

export default ScrollIntoView;
