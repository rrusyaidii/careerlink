import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout"; // Custom hook to access global DashboardContext
import Logo from "./Logo";
import links from "../utils/links"; // Array of link objects for navigation
import { NavLink } from "react-router-dom"; // Component for navigation with active styling
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  // Destructure values from DashboardContext to manage sidebar state and functionality
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      {/* Dynamic className to toggle the sidebar's visibility */}
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          {/* Close button to toggle the sidebar's state */}
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            {/* Reusable Logo component */}
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
