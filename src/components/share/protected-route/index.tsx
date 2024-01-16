import { useAppSelector } from "@/redux/hook";
import NotPermitted from "./not-permitted";
import Loading from "../loading";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = (props: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.account.user);
  const role = user.role.name;
  if (role !== "NORMAL_USER") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const isLoading = useAppSelector((state) => state.account.isLoading);
  return (
    <>
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated === true ? (
            <>
              <RoleBaseRoute>{props.children}</RoleBaseRoute>
            </>
          ) : (
            <Navigate to="/login" replace />
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
