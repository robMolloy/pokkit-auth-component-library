import { useCurrentUserStore } from "@/modules/auth/currentUserStore/currentUserStore";
import { useReactivePocketBaseAuthStore } from "@/modules/auth/reactivePocketBaseAuthStore/reactivePocketBaseAuthStore";

const LogPage = () => {
  const currentUserStore = useCurrentUserStore();
  const reactivePocketBaseAuthStore = useReactivePocketBaseAuthStore();

  return (
    <div>
      <pre>{JSON.stringify({ currentUserStore, reactivePocketBaseAuthStore }, undefined, 2)}</pre>
    </div>
  );
};

export default LogPage;
