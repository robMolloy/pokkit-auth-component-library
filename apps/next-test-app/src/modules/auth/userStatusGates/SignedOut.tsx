import { useCurrentUserStore } from "../currentUserStore/currentUserStore";

export const SignedOut = (p: { children: React.ReactNode }) => {
  const currentUserStore = useCurrentUserStore();
  if (currentUserStore.data === null) return p.children;
};
