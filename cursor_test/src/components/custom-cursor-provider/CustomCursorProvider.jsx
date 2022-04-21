import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import "./styles.scss";
import { useLocation } from "react-router-dom";

const cursorTag = {
  a: "pointer",
  button: "pointer",
  p: "text",
  input: "text",
  textarea: "text",
};

const CustomCursorProvider = ({ children }) => {
  const location = useLocation();
  const cursor = useRef(null);
  const shadowCursor = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [cursorType, setCursorType] = useState("");

  const handleOnMoveMouse = (e) => {
    if (cursor.current) {
      cursor.current.style.top = `${e.clientY}px`;
      cursor.current.style.left = `${e.clientX}px`;
      setPos({ x: e.clientX, y: e.clientY });
    }
  };

  // shadowCursor effect
  useEffect(() => {
    if (shadowCursor.current) {
      setTimeout(() => {
        shadowCursor.current.style.top = `${pos.y - 8}px`;
        shadowCursor.current.style.left = `${pos.x - 8}px`;
      }, 100);
      shadowCursor.current.style.transform = !isActive
        ? "scale(2)"
        : "scale(1)";
    }
  }, [pos, isActive]);

  useEffect(() => {
    if (cursor.current && shadowCursor.current) {
      cursor.current.style.display = visible ? "block" : "none";
      shadowCursor.current.style.display = visible ? "block" : "none";
    }
  }, [visible]);

  useEffect(() => {
    document.addEventListener("mousemove", handleOnMoveMouse);
    document.addEventListener("mouseenter", () => {
      setVisible(true);
    });
    document.addEventListener("mouseleave", () => {
      setVisible(false);
    });
    document.addEventListener("mouseup", () => {
      setIsActive(true);
    });
    document.addEventListener("mousedown", () => {
      setIsActive(false);
      setVisible(true);
    });

    // cursor effect when it is over specified tag
    setTimeout(() => {
      document
        .querySelectorAll(Object.keys(cursorTag).join(","))
        .forEach((el) => {
          el.addEventListener("mouseover", (e) => {
            setCursorType(cursorTag[e.target.localName]);
          });
          el.addEventListener("mouseout", (e) => {
            setCursorType("");
          });
        });
    }, 100);
  }, [location.pathname]); // this effect run when page changes

  return (
    <>
      <div ref={cursor} className={cx("cursor", cursorType)} />
      <div
        ref={shadowCursor}
        className={cx("shadow-cursor", cursorType, {
          show: cursorType === "" || cursorType === "pointer",
        })}
      />
      {children}
    </>
  );
};

export default CustomCursorProvider;
