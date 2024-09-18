import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.user?.id) return; // Avoid making the request if user is not logged in
      setLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
          
        );
        
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [auth]); // Add dependencies to avoid stale data

  if (loading) {
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

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {user ? (
        <>
          <h1 className="text-xl font-bold">Welcome, {user?.firstName} {user?.lastName}</h1>
          <p className="mt-2">You have {posts?.length} {posts?.length === 1 ? 'post' : 'posts'}</p>
        </>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
