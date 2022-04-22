import { useEffect, useRef, useState } from "react";
import "./styles.scss";

const CustomCursor = () => {
  const cursor = useRef(null);
  const shadowCursor = useRef();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleOnMoveMouse = (e) => {
    if (cursor.current) {
      cursor.current.style.top = `${e.clientY}px`;
      cursor.current.style.left = `${e.clientX}px`;
      setPos({ x: e.clientX, y: e.clientY });
    }
  };

  // change the postion of the shadow
  useEffect(() => {
    if (shadowCursor.current) {
      setTimeout(() => {
        shadowCursor.current.style.top = `${pos.y}px`;
        shadowCursor.current.style.left = `${pos.x}px`;
      }, 100);
    }
  }, [pos]);

  const handleOnMouseEnter = () => {
    setVisible(true);
  };

  const handleOnMouseLeave = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (cursor.current && shadowCursor.current) {
      cursor.current.style.display = visible ? "block" : "none";
      shadowCursor.current.style.display = visible ? "block" : "none";
    }
  }, [visible, cursor]);

  useEffect(() => {
    const eventListeners = [
      {
        eventName: "mousemove",
        handler: handleOnMoveMouse,
        element: document,
      },
      {
        eventName: "mouseenter",
        handler: handleOnMouseEnter,
        element: document,
      },
      {
        eventName: "mouseleave",
        handler: handleOnMouseLeave,
        element: document,
      },
    ];

    eventListeners.forEach(({ eventName, handler, element }) => {
      element.addEventListener(eventName, handler);
    });
    return () => {
      eventListeners.forEach(({ eventName, element }) => {
        element.removeEventListener(eventName, () => {});
      });
    };
  }, []);

  return (
    <>
      <div ref={cursor} className="cursor" />
      <div ref={shadowCursor} className="shadow-cursor" />
    </>
  );
};

export default CustomCursor;
