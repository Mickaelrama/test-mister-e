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
  const [isActive, setIsActive] = useState(false);
  const [cursorType, setCursorType] = useState("");

  const handleOnMoveMouse = (e) => {
    if (cursor.current) {
      cursor.current.style.top = `${e.clientY}px`;
      cursor.current.style.left = `${e.clientX}px`;
      setPos({ x: e.clientX, y: e.clientY });
    }
  };
  const handleOnMouseOverInDocument = () => {
    setVisible(true);
  };

  const handleOnMouseOutInDocument = () => {
    setVisible(false);
  };

  const handleOnMouseUp = () => {
    setIsActive(false);
  };

  const handleOnMouseDown = () => {
    setIsActive(true);
    setVisible(true);
  };

  const handleOnMouseOverSpecifiedTag = (e) => {
    setCursorType(cursorTag[e.target.localName]);
  };
  const handleOnMouseOutSpecifiedTag = () => {
    setCursorType("");
  };

  const handleOpenContextMenu = () => {
    setIsActive(false);
    setVisible(false);
  };

  // shadowCursor effect
  useEffect(() => {
    if (shadowCursor.current) {
      setTimeout(() => {
        shadowCursor.current.style.top = `${pos.y - 8}px`;
        shadowCursor.current.style.left = `${pos.x - 8}px`;
        shadowCursor.current.style.transition = "0s";
      }, 100);
      shadowCursor.current.style.transform = isActive ? "scale(3)" : "scale(1)";
      shadowCursor.current.style.transition = "0.2s";
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
    document.addEventListener("mouseover", handleOnMouseOverInDocument);
    document.addEventListener("mouseout", handleOnMouseOutInDocument);
    document.addEventListener("mouseup", handleOnMouseUp);
    document.addEventListener("mousedown", handleOnMouseDown);
    document.addEventListener("contextmenu", handleOpenContextMenu);

    // cursor effect when it is over specified tag
    setTimeout(() => {
      document
        .querySelectorAll(Object.keys(cursorTag).join(","))
        .forEach((el) => {
          el.addEventListener("mouseover", handleOnMouseOverSpecifiedTag);
          el.addEventListener("mouseout", handleOnMouseOutSpecifiedTag);
        });
    }, 100);
    return () => {
      // remove alls events listeners
      document.removeEventListener("mousemove", handleOnMoveMouse);
      document.removeEventListener("mouseover", handleOnMouseOverInDocument);
      document.removeEventListener("mouseout", handleOnMouseOutInDocument);
      document.removeEventListener("mouseup", handleOnMouseUp);
      document.removeEventListener("mousedown", handleOnMouseDown);
      document.removeEventListener("contextmenu", handleOpenContextMenu);
      setTimeout(() => {
        document
          .querySelectorAll(Object.keys(cursorTag).join(","))
          .forEach((el) => {
            el.removeEventListener("mouseover", handleOnMouseOverSpecifiedTag);
            el.removeEventListener("mouseout", handleOnMouseOutSpecifiedTag);
          });
      }, 100);
    };
  }, [location.pathname]); // this effect run when page changes

  return (
    <>
      <div ref={cursor} className={cx("cursor", cursorType)} />
      <div
        ref={shadowCursor}
        className={cx("shadow-cursor", cursorType, {
          show: (cursorType === "" || cursorType === "pointer") && visible,
        })}
      />
      {children}
    </>
  );
};

export default CustomCursorProvider;
