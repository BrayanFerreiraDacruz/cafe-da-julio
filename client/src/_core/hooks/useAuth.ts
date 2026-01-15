import { useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

/**
 * useAuth hook - Returns null user since we're not using OAuth
 * This is kept for compatibility with existing code
 */
export function useAuth(options?: UseAuthOptions) {
  const state = useMemo(() => {
    return {
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    };
  }, []);

  return {
    ...state,
    refresh: () => {},
    logout: async () => {},
  };
}
