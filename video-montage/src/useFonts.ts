import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

export const useFonts = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load(`900 100px Rubik`, "אבגד"),
      document.fonts.load(`700 100px Rubik`, "אבגד"),
      document.fonts.load(`900 100px Rubik`, "AI"),
    ]).then(() => {
      if (!document.fonts.check(`900 100px Rubik`, "א")) {
        throw new Error("Rubik font failed to load");
      }
      continueRender(handle);
    });
  }, [handle]);
};
