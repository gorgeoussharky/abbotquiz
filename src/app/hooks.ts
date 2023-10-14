import { useState, useLayoutEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);
  
    useLayoutEffect(() => {
      const updateSize = (): void => {
        setIsMobile(window.matchMedia('(max-width: 768px)').matches);
      };
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);
  
    return isMobile;
  };