import { useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

/**
 * useAuth hook - Returns null user since we're not using OAuth
 * This is kept for compatibility with existing code
 */
import { useBaristaAuth } from "./useBaristaAuth";

export function useAuth(options?: UseAuthOptions) {
  const { barista, loading, error, isAuthenticated, logout, refresh } = useBaristaAuth();
  
  const user = useMemo(() => {
    if (!barista) return null;
    return {
      ...barista,
      role: "admin"
    };
  }, [barista]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    refresh,
    logout,
  };
}
