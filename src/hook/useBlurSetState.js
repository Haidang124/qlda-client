import { useEffect, useCallback } from 'react';

// Mutate state if click occurs outside element with className
const useBlurSetState = (className, state, setState) => {
  const handleClick = useCallback((e) => {
    const elem = document.querySelector(className);
    if (!elem) {
      setState(false);
      return;
    }
    if (!elem.contains(e.target)) setState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
};

export default useBlurSetState;
