import { useState } from 'react';
import './RecentlyDeletedView.css';
import Checkbox from './Checkbox';
import guideIcon from '../icons/Icons/folder.svg';
import checklistLargeIcon from '../icons/Icons/folder-1.svg';

function RestoreBar({ selectedCount, onClearSelection, onRestore }) {
  return (
    <div className="rd-action-bar">
      <div className="rd-action-bar-left">
        <button className="rd-action-btn rd-action-btn--restore" onClick={onRestore}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14" stroke="#5d6169" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 4V8H6" stroke="#5d6169" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="rd-action-label">Restore</span>
        </button>
      </div>
      <div className="rd-action-bar-right">
        <button className="rd-action-close-btn" onClick={onClearSelection}>
          <span className="rd-action-count">
            {selectedCount} Item{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="#5d6169" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function formatDeletedDate(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function RecentlyDeletedRow({ item, isSelected, onToggleSelect, onRestoreSingle }) {
  const [showMenu, setShowMenu] = useState(false);
  const icon = item.type === 'checklist' ? checklistLargeIcon : guideIcon;

  return (
    <div className={`rd-row ${isSelected ? 'rd-row--selected' : ''}`}>
      <Checkbox
        state={isSelected ? 'checked' : 'default'}
        onChange={() => onToggleSelect(item.id)}
      />
      <div className="rd-row-info">
        <div className="rd-row-icon-wrapper">
          <img src={icon} alt="" className="rd-row-icon" />
        </div>
        <div className="rd-row-details">
          <span className="rd-row-title">{item.name}</span>
          <span className="rd-row-path">{item.originalPath || '-'}</span>
        </div>
      </div>
      <div className="rd-row-tags">
        <span className="rd-row-tags-text">{item.tags}</span>
      </div>
      <div className="rd-row-deleted-date">
        <span className="rd-row-date-text">{formatDeletedDate(item.deletedDate)}</span>
      </div>
      <div className="rd-row-days-remaining">
        <span
          className={`rd-row-days-text ${item.daysRemaining <= 3 ? 'rd-row-days-text--urgent' : ''}`}
          title="Item will be permanently deleted after this period"
        >
          {item.daysRemaining} day{item.daysRemaining !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="rd-row-actions">
        <button
          className="rd-row-more"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.5" fill="#8B8E95" />
            <circle cx="8" cy="8" r="1.5" fill="#8B8E95" />
            <circle cx="8" cy="13" r="1.5" fill="#8B8E95" />
          </svg>
        </button>
        {showMenu && (
          <>
            <div className="rd-menu-backdrop" onClick={() => setShowMenu(false)} />
            <div className="rd-row-menu">
              <button
                className="rd-menu-item"
                onClick={() => {
                  setShowMenu(false);
                  onRestoreSingle(item.id);
                }}
              >
                Restore
              </button>
              <button className="rd-menu-item" onClick={() => setShowMenu(false)}>
                Preview
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rd-empty">
      <div className="rd-empty-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="12" y="8" width="24" height="32" rx="2" fill="#f2f2f4" stroke="#d0d1d4" strokeWidth="1.5" />
          <path d="M18 6H30V10H18V6Z" fill="#e3e5e9" stroke="#d0d1d4" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M18 20H30" stroke="#d0d1d4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 26H26" stroke="#d0d1d4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="rd-empty-title">No recently deleted items</h3>
      <p className="rd-empty-text">
        Items you delete will appear here for 14 days before being permanently removed.
      </p>
    </div>
  );
}

function RecentlyDeletedView({
  items,
  selectedItems,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onRestore,
  onRestoreSingle,
}) {
  const hasSelection = selectedItems.size > 0;
  const allSelected = items.length > 0 && selectedItems.size === items.length;
  const someSelected = hasSelection && !allSelected;

  const headerCheckboxState = allSelected
    ? 'checked'
    : someSelected
    ? 'partial'
    : 'default';

  if (items.length === 0) {
    return (
      <div className="rd-view">
        <div className="rd-view-inner">
          <div className="rd-header-title">Recently deleted</div>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="rd-view">
      <div className="rd-view-inner">
        <div className="rd-header-section">
          {hasSelection ? (
            <RestoreBar
              selectedCount={selectedItems.size}
              onClearSelection={onClearSelection}
              onRestore={onRestore}
            />
          ) : (
            <div className="rd-header-title">Recently deleted</div>
          )}
        </div>

        <div className="rd-column-headers">
          <div className="rd-columns-inner">
            <Checkbox state={headerCheckboxState} onChange={onSelectAll} />
            <span className="rd-col-header rd-col--name">NAME</span>
            <span className="rd-col-header rd-col--tags">TAGS</span>
            <span className="rd-col-header rd-col--deleted">DELETED DATE</span>
            <span
              className="rd-col-header rd-col--days"
              title="Item will be permanently deleted after this period"
            >
              DAYS REMAINING
            </span>
          </div>
        </div>

        <div className="rd-rows">
          {items.map((item) => (
            <RecentlyDeletedRow
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onToggleSelect={onToggleSelect}
              onRestoreSingle={onRestoreSingle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentlyDeletedView;
