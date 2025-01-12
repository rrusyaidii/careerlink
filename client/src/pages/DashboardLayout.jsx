import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from "../App";

// Create a global context for the dashboard
const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  // Temporary user object for demonstration purposes
  const user = { name: "john" };

  // State to manage whether the sidebar is shown or hidden
  const [showSidebar, setShowSidebar] = useState(false);

  // State to manage whether the dark theme is enabled or not
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

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

  // Function to handle user logout (placeholder functionality for now)
  const logoutUser = async () => {
    console.log("logout user");
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
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// Custom hook to access the DashboardContext globally
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
