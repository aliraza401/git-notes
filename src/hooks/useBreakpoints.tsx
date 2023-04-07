import React from "react";
import { throttle } from "lodash";

const SCREEN_RESIZE_THROTTLE_TIME = 200;

const getDeviceConfig = (width: number) => {
  if (width < 320) {
    return "xs";
  } else if (width >= 320 && width < 720) {
    return "sm";
  } else if (width >= 720 && width < 1024) {
    return "md";
  } else if (width >= 1024 && width < 1280) {
    return "lg";
  } else if (width >= 1280 && width < 1536) {
    return "xl";
  } else if (width >= 1536) {
    return "2xl";
  }
};

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = React.useState(() =>
    getDeviceConfig(window.innerWidth)
  );

  React.useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, SCREEN_RESIZE_THROTTLE_TIME);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return brkPnt;
};

export default useBreakpoint;
