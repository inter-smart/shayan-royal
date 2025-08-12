"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import GlobalLoader from './GlobalLoader';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingWrapper({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const pathname = usePathname();
  const { isLoading: contextLoading } = useLoading();

  // Handle initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500); // Show loader for 1.5 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 500); // Shorter delay for route transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  // Show loader if any loading state is true
  const shouldShowLoader = initialLoading || routeLoading || contextLoading;

  return (
    <>
      <GlobalLoader isLoading={shouldShowLoader} />
      <div className={`${shouldShowLoader ? 'overflow-hidden' : ''}`}>
        {children}
      </div>
    </>
  );
}