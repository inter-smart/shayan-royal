"use client";

import { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

// Hook for page-level loading states
export function usePageLoading(isLoading, loadingText = 'Loading...') {
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    if (isLoading) {
      showLoader(loadingText);
    } else {
      hideLoader();
    }

    // Cleanup on unmount
    return () => {
      hideLoader();
    };
  }, [isLoading, loadingText, showLoader, hideLoader]);
}

// Hook for async operations with automatic loading states
export function useAsyncOperation() {
  const { showLoader, hideLoader } = useLoading();

  const executeWithLoading = async (operation, loadingText = 'Processing...') => {
    try {
      showLoader(loadingText);
      const result = await operation();
      return result;
    } catch (error) {
      throw error;
    } finally {
      hideLoader();
    }
  };

  return { executeWithLoading };
}

// Hook for form submissions
export function useFormLoading() {
  const { showLoader, hideLoader } = useLoading();

  const submitWithLoading = async (submitFn, loadingText = 'Submitting...') => {
    try {
      showLoader(loadingText);
      const result = await submitFn();
      return result;
    } catch (error) {
      throw error;
    } finally {
      // Add a small delay to show success state
      setTimeout(() => {
        hideLoader();
      }, 500);
    }
  };

  return { submitWithLoading };
}