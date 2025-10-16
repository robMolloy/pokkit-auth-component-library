import { useCurrentUserStore } from "../currentUserStore/currentUserStore";

export const UnverifiedUser = (p: { children: React.ReactNode }) => {
  const currentUserStore = useCurrentUserStore();
  if (currentUserStore.data && !currentUserStore.data.verified) return p.children;
};
