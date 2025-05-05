import "@/assets/css/components/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ logOut }: { logOut: (data: boolean) => void }) {
  const links = document.getElementsByClassName("sidebar__link");
  const handleLinkClik = (element: HTMLAnchorElement) => {
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("sidebar__link--active");
    }

    element.classList.add("sidebar__link--active");
  };

  const handleLogOut = () => {
    logOut(false);
  };

  return (
    <nav className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <Link
            to="/dashboard"
            className="sidebar__link sidebar__link--active"
            onClick={(e) => handleLinkClik(e.currentTarget)}
          >
            <i className="bi bi-list-columns-reverse"></i>
            Products
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            to="/orders"
            className="sidebar__link"
            onClick={(e) => handleLinkClik(e.currentTarget)}
          >
            <i className="bi bi-box2-fill"></i>
            Orders
          </Link>
        </li>
        <li className="sidebar__item">
          <Link
            to="/statistics"
            className="sidebar__link"
            onClick={(e) => handleLinkClik(e.currentTarget)}
          >
            <i className="bi bi-graph-up"></i>
            Statistics
          </Link>
        </li>
      </ul>

      <button className="btn btn-danger" onClick={handleLogOut}>
        Log Out
      </button>
    </nav>
  );
}

export default Sidebar;
