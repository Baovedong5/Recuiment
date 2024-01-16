import Footer from "components/client/footer.client";
import Header from "components/client/header.client";
import LoginPage from "pages/auth/login";
import RegisterPage from "pages/auth/register";
import { useEffect, useRef } from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

import style from "styles/app.module.scss";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { fetchAccount } from "./redux/slice/accountSlice";
import Loading from "./components/share/loading";
import NotFound from "./components/share/notFound";

const LayoutClient = () => {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="layout-app" ref={rootRef}>
      <Header />
      <div className={style["content-app"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const isAuthentocated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    dispatch(fetchAccount());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutClient />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isAuthentocated === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
