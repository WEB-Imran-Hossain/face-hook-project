import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import {useProfile} from "../hooks/useProfile";
import { actions } from "../actions";

const ProfilePage = () => {
const {state, dispatch} = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.user?.id) return; // Avoid making the request if user is not logged in
      dispatch({type: actions.profile.DATA_FETCHING})
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
          
        );
        
       if (response.status === 200) {
        dispatch({type: actions.profile.DATA_FETCHED, data: response.data});
       }
      } catch (error) {
        console.error(error);
        dispatch({type: actions.profile.DATA_FETCH_ERROR, error: error});
      } 
    };
    fetchProfile();
  }, []); // Add dependencies to avoid stale data

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
          <h1 className="text-xl font-bold">Welcome, {state?.user?.firstName}</h1>
          <p className="mt-2">You have {state?.posts?.length}</p>
        </>
    </div>
  );
};

export default ProfilePage;
