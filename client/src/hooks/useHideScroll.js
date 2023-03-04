import { useEffect } from "react";

function useHideScroll() {
  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('no-scroll');

    return () => body.classList.remove('no-scroll');
  }, []);
}

export default useHideScroll;