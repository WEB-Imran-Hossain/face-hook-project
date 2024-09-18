import React from 'react';
import LogOutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    // Clear authentication data
    setAuth({});
    
    // Optionally, you can add a feedback or loading state here
    // For example: setLoading(true);

    // Navigate to login page
    navigate("/login");
  };

  return (
    <button
      className="icon-btn"
      onClick={handleLogout}
      aria-label="Logout"
    >
      <img src={LogOutIcon} alt="Logout" />
    </button>
  );
};

export default Logout;