import { useState } from 'react';
import './BulkActionsBar.css';
import moveToIcon from '../icons/Basic/Move-to-16.svg';
import copyIcon from '../icons/Basic/Copy-16.svg';
import checklistIcon from '../icons/Colored/Checklist-item-16.svg';
import deleteIcon from '../icons/Basic/Delete-16.svg';
import moreIcon from '../icons/Basic/More-16.svg';
import closeIcon from '../icons/Basic/Close-12.svg';

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <span className="tooltip-bubble">{text}</span>}
    </span>
  );
}

function CheckStatusButton({ onClick }) {
  return (
    <button className="bulk-action-check-status-btn" onClick={onClick}>
      Check status
    </button>
  );
}

function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onDelete,
  isOperationActive,
  showSpinner,
  onOpenDetails,
}) {
  return (
    <div className="bulk-actions-bar">
      <div className="bulk-actions-left">
        <Tooltip text="Coming soon">
          <button className="bulk-action-btn bulk-action-btn--disabled" disabled>
            <img src={moveToIcon} alt="" className="bulk-action-icon" />
            <span className="bulk-action-label">Move to...</span>
          </button>
        </Tooltip>
        <Tooltip text="Coming soon">
          <button className="bulk-action-btn bulk-action-btn--disabled" disabled>
            <img src={copyIcon} alt="" className="bulk-action-icon" />
            <span className="bulk-action-label">Duplicate</span>
          </button>
        </Tooltip>
        <Tooltip text="Coming soon">
          <button className="bulk-action-btn bulk-action-btn--disabled" disabled>
            <img src={checklistIcon} alt="" className="bulk-action-icon" />
            <span className="bulk-action-label">Publish last version</span>
          </button>
        </Tooltip>
        {isOperationActive ? (
          <Tooltip text="Bulk delete in progress">
            <button className="bulk-action-btn bulk-action-btn--disabled" disabled>
              <img src={deleteIcon} alt="" className="bulk-action-icon" />
              <span className="bulk-action-label">Delete</span>
            </button>
          </Tooltip>
        ) : (
          <button className="bulk-action-btn" onClick={onDelete}>
            <img src={deleteIcon} alt="" className="bulk-action-icon" />
            <span className="bulk-action-label">Delete</span>
          </button>
        )}
        <Tooltip text="Coming soon">
          <button className="bulk-action-more bulk-action-btn--disabled" disabled>
            <img src={moreIcon} alt="More" className="bulk-action-icon" />
          </button>
        </Tooltip>
        {showSpinner && <CheckStatusButton onClick={onOpenDetails} />}
      </div>
      <div className="bulk-actions-right">
        <button className="bulk-action-close-btn" onClick={onClearSelection}>
          <span className="bulk-action-count">
            {selectedCount} Item{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <img src={closeIcon} alt="Close" className="bulk-action-close-icon" />
        </button>
      </div>
    </div>
  );
}

export default BulkActionsBar;
