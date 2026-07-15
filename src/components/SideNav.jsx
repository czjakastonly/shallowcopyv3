import './SideNav.css';
import coloredFolder from '../icons/Colored/Folder-32.svg';
import funnelIcon from '../icons/Basic/Funnel-16.svg';
import transparencyIcon from '../icons/Basic/Transparency-24.svg';
import templatesIcon from '../icons/Basic/Templates-16.svg';
import documentsIcon from '../icons/Basic/Documents stack-24.svg';
import tagIcon from '../icons/Basic/Tag-16.svg';
import deleteIcon from '../icons/Basic/Delete-16.svg';

function SideNav({ currentView, onViewChange }) {
  const navItems = [
    { id: 'all-content', icon: coloredFolder, label: 'All content', view: 'content' },
    { id: 'views', icon: funnelIcon, label: 'Views' },
    { id: 'content-snippets', icon: transparencyIcon, label: 'Content snippets' },
    { id: 'custom-templates', icon: templatesIcon, label: 'Custom\ntemplates' },
    { id: 'translation-glossary', icon: documentsIcon, label: 'Translation\nglossary' },
    { id: 'tags', icon: tagIcon, label: 'Tags' },
    { id: 'recently-deleted', icon: deleteIcon, label: 'Recently\ndeleted', view: 'recentlyDeleted' },
  ];

  return (
    <aside className="side-nav">
      <div className="side-nav-items">
        {navItems.map((item, index) => {
          const isActive =
            (item.view === 'content' && currentView === 'content') ||
            (item.view === 'recentlyDeleted' && currentView === 'recentlyDeleted');
          const showDivider = item.id === 'recently-deleted';

          return (
            <div key={item.id}>
              {showDivider && <div className="side-nav-divider" />}
              <div
                className={`side-nav-item ${isActive ? 'side-nav-item--active' : ''}`}
                onClick={() => {
                  if (item.view && onViewChange) {
                    onViewChange(item.view);
                  }
                }}
              >
                <img src={item.icon} alt="" className="side-nav-icon" />
                <span className="side-nav-label">
                  {item.label.split('\n').map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default SideNav;
