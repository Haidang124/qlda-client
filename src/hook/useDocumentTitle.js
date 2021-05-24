import React, { useRef, useEffect } from "react";

const useDocumentTitle = (title, retainOnUnmount = false) => {
  const defaultTitle = useRef(document.title).current;
  console.log(defaultTitle);
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!retainOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, []);
};

export default useDocumentTitle;
