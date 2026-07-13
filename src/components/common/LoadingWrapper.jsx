"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import GlobalLoader from './GlobalLoader';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingWrapper({ children }) {
  const [routeLoading, setRouteLoading] = useState(false);
  const pathname = usePathname();
  const { isLoading: contextLoading } = useLoading();
  const isFirstRender = useRef(true);

  // Handle route changes only (skip the initial mount — content is already
  // server-rendered, so blocking it behind a fake loader only hurts perceived
  // load speed / Lighthouse Speed Index for no benefit).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 500); // Shorter delay for route transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  // Show loader if any loading state is true
  const shouldShowLoader = routeLoading || contextLoading;

  return (
    <>
      <GlobalLoader isLoading={shouldShowLoader} />
      <div className={`${shouldShowLoader ? 'overflow-hidden' : ''}`}>
        {children}
      </div>
    </>
  );
}