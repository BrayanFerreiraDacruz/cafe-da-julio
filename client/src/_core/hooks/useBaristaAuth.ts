import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useMemo } from "react";

type UseBaristaAuthOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useBaristaAuth(options?: UseBaristaAuthOptions) {
  const utils = trpc.useUtils();

  const meQuery = trpc.barista.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = trpc.barista.login.useMutation({
    onSuccess: () => {
      utils.barista.me.invalidate();
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(new Error(error.message));
    },
  });

  const logoutMutation = trpc.barista.logout.useMutation({
    onSuccess: () => {
      utils.barista.me.setData(undefined, null);
    },
  });

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await loginMutation.mutateAsync({ email, password });
      } catch (error: unknown) {
        if (error instanceof TRPCClientError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        return;
      }
      throw error;
    } finally {
      utils.barista.me.setData(undefined, null);
      await utils.barista.me.invalidate();
    }
  }, [logoutMutation, utils]);

  const state = useMemo(() => {
    return {
      barista: meQuery.data ?? null,
      loading: meQuery.isLoading || loginMutation.isPending || logoutMutation.isPending,
      error: meQuery.error ?? loginMutation.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(meQuery.data),
    };
  }, [
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    loginMutation.error,
    loginMutation.isPending,
    logoutMutation.error,
    logoutMutation.isPending,
  ]);

  return {
    ...state,
    login,
    logout,
    refresh: () => meQuery.refetch(),
  };
}
