import { useRef, useEffect } from 'react';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDocumentTitle;
