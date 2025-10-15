import { useCurrentUserStore } from "../currentUserStore/currentUserStore";

export const LoadingUser = (p: { children: React.ReactNode }) => {
  const currentUserStore = useCurrentUserStore();
  if (currentUserStore.data === undefined) return p.children;
};
