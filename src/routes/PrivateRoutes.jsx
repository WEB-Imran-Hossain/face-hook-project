import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../common/Header";
import ProfileProvider from "../providers/ProfileProvider";
const PrivateRoutes = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <>
          <ProfileProvider>
            <Header />
            <main className="mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
