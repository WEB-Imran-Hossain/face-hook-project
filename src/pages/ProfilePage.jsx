import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const {api}  = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted
  
    const fetchProfile = async () => {
      if (!auth?.user?.id) return;
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
  
        if (response.status === 200 && isMounted) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error?.message || "Unknown error occurred");
        if (isMounted) {
          dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: error?.message || "Error fetching profile data" });
        }
      }      
    };
  
    fetchProfile();
  
    return () => {
      isMounted = false; // Cleanup function to avoid setting state on unmounted component
    };
  }, [auth, api, dispatch]);
  
  

  if (state?.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="ml-2">Fetching your profile data...</p>
      </div>
    );
  }

  if (state?.error) {
    return <div className="text-red-500">Error: {state?.error}</div>;
  }

  return (
    <div className="p-4">
      <>
        <ProfileInfo />
        <MyPosts />
      </>
    </div>
  );
};

export default ProfilePage;
