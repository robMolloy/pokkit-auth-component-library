import { useCurrentUserStore } from "../currentUserStore/currentUserStore";

export const SignedIn = (p: { children: React.ReactNode }) => {
  const currentUserStore = useCurrentUserStore();
  if (currentUserStore.data) return p.children;
};
