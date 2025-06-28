import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { useState, createContext, useContext } from "react";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { checkDefaultTheme } from "../App";
import Chatbot from "../components/Chatbot";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

// Create a global context for the dashboard
const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const navigate = useNavigate();

  // Function to toggle the dark theme state
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme; //darktheme = true
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch("/auth/logout");
    toast.success("Logging out...", { autoClose: 2000 });
  };

  return (
    // Provide the global dashboard context to all child components
    <DashboardContext.Provider
      value={{
        user, // The current user object
        showSidebar, // Whether the sidebar is visible
        isDarkTheme, // Whether the dark theme is enabled
        toggleDarkTheme, // Function to toggle the dark theme
        toggleSidebar, // Function to toggle the sidebar
        logoutUser, // Function to handle user logout
      }}
    >
      {/* Dashboard layout wrapper */}
      <Wrapper>
        <main className="dashboard">
          {/* SmallSidebar component with context-based functionality */}
          <SmallSidebar />
          {/* BigSidebar component with context-based functionality */}
          <BigSidebar />
          <div>
            {/* Navbar component with context-based functionality */}
            <Navbar />
            <div className="dashboard-page">
              {/* Dynamic rendering of child routes using Outlet */}
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
      <Chatbot />
    </DashboardContext.Provider>
  );
};

// Custom hook to access the DashboardContext globally
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
