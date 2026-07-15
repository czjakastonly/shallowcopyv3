import './AppHeader.css';
import logoWhite from '../icons/Logo/white.svg';
import triangleArrowDown from '../icons/Basic/Triangle-arrow-down-12.svg';
import searchIcon from '../icons/Basic/Search-16.svg';
import chevronBottom from '../icons/Basic/Chevron-bottom-16.svg';
import chevronDown12 from '../icons/Basic/Chevron-down-12.svg';

function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-top-line">
        <div className="header-top-left">
          <img src={logoWhite} alt="Stonly" className="header-logo" />
          <nav className="main-navigation">
            <span className="nav-item nav-item--active">Content</span>
            <span className="nav-item">Knowledge base</span>
            <span className="nav-item">Widget</span>
            <span className="nav-item">AI &amp; Automation</span>
            <span className="nav-item">Insights</span>
          </nav>
        </div>
        <div className="header-top-right">
          <div className="account-menu">
            <span className="account-name">John Doe</span>
            <img src={chevronDown12} alt="" className="account-chevron" />
          </div>
        </div>
      </div>
      <div className="header-bottom-line">
        <div className="team-selector">
          <span className="team-name">Design team</span>
          <img src={triangleArrowDown} alt="" className="team-arrow" />
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <div className="search-bar-content">
              <img src={searchIcon} alt="" className="search-icon" />
              <span className="search-placeholder">Search for guides</span>
            </div>
          </div>
          <button className="btn-primary">
            <span className="btn-label">New content</span>
            <img src={chevronBottom} alt="" className="btn-chevron" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
