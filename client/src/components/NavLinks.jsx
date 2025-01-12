import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = (isBigSidebar) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {/* Dynamically generate navigation links from the links array */}
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path} // Path for navigation
            key={text} // Unique key for each link
            className="nav-link" // Class for styling
            onClick={isBigSidebar ? null : toggleSidebar} // Close the sidebar on link click
          >
            <span className="icon">{icon}</span> {/* Display icon */}
            {text} {/* Display link text */}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
