import { useState, useEffect } from 'react';
import './DetailsPopup.css';

function StatusBadge({ status, failReason }) {
  const classMap = {
    pending: 'status-badge--pending',
    in_progress: 'status-badge--progress',
    completed: 'status-badge--completed',
    failed: 'status-badge--failed',
    cancelled: 'status-badge--cancelled',
  };

  const labelMap = {
    pending: 'Pending',
    in_progress: 'Deleting',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
  };

  return (
    <div className="status-badge-wrapper">
      <span className={`status-badge ${classMap[status] || ''}`}>
        {status === 'in_progress' && <span className="status-badge-spinner" />}
        {status === 'completed' && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {status === 'failed' && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        {labelMap[status] || status}
      </span>
      {status === 'failed' && failReason && (
        <span className="status-fail-reason">{failReason}</span>
      )}
    </div>
  );
}

function DetailsPopup({ operation, onClose, onRetryItem, onRetryAll, onClearOperation }) {
  const [sortByPath, setSortByPath] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const items = operation?.items || [];
  const totalCount = items.length;
  const completedCount = items.filter((i) => i.status === 'completed').length;
  const failedCount = items.filter((i) => i.status === 'failed').length;
  const isComplete = operation?.complete;

  const sortedItems = [...items].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const pathA = (a.path || '').toLowerCase();
    const pathB = (b.path || '').toLowerCase();

    const [primaryA, primaryB, secondaryA, secondaryB] = sortByPath
      ? [pathA, pathB, nameA, nameB]
      : [nameA, nameB, pathA, pathB];

    let cmp = 0;
    if (primaryA < primaryB) cmp = -1;
    else if (primaryA > primaryB) cmp = 1;
    else if (secondaryA < secondaryB) cmp = -1;
    else if (secondaryA > secondaryB) cmp = 1;

    return sortAsc ? cmp : -cmp;
  });

  const toggleSortDirection = () => setSortAsc((prev) => !prev);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="details-overlay" onClick={handleOverlayClick}>
      <div className="details-popup">
        <div className="details-header">
          <h2 className="details-title">Delete items</h2>
          <button className="details-close-btn" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="#5d6169" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="details-summary">
          <span className="details-summary-text">
            {isComplete ? (
              <>
                <span className="details-summary-success">{completedCount} completed</span>
                {failedCount > 0 && (
                  <span className="details-summary-failed"> · {failedCount} failed</span>
                )}
                <span className="details-summary-total"> of {totalCount} items</span>
              </>
            ) : (
              <>
                {completedCount + failedCount} of {totalCount} processed
              </>
            )}
          </span>
          <div className="details-summary-actions">
            <div className="details-sort-toggle">
              <span className="details-sort-label">Sort by</span>
              <button
                className={`details-sort-btn ${!sortByPath ? 'details-sort-btn--active' : ''}`}
                onClick={() => setSortByPath(false)}
              >
                Name
              </button>
              <button
                className={`details-sort-btn ${sortByPath ? 'details-sort-btn--active' : ''}`}
                onClick={() => setSortByPath(true)}
              >
                Path
              </button>
            </div>
            {isComplete && failedCount > 0 && (
              <button
                className="details-retry-all-btn"
                onClick={onRetryAll}
                disabled={!isComplete}
              >
                Retry all failed
              </button>
            )}
          </div>
        </div>

        <div className="details-table-wrapper">
          <table className="details-table">
            <thead>
              <tr>
                <th className="details-th details-th--name details-th--sortable" onClick={toggleSortDirection}>
                  Name
                  <span className="sort-arrow">{sortAsc ? '↑' : '↓'}</span>
                </th>
                <th className="details-th details-th--status">
                  Status
                </th>
                <th className="details-th details-th--action" />
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item) => (
                <tr key={item.id} className="details-row">
                  <td className="details-td details-td--name">
                    <span className="details-item-icon">
                      {item.type === 'folder' ? '📁' : '📄'}
                    </span>
                    <span className="details-item-name-group">
                      <span className="details-item-name">{item.name}</span>
                      {item.path && (
                        <span className="details-item-path">{item.path}</span>
                      )}
                    </span>
                  </td>
                  <td className="details-td details-td--status">
                    <StatusBadge status={item.status} failReason={item.failReason} />
                  </td>
                  <td className="details-td details-td--action">
                    {item.status === 'failed' && (
                      <button
                        className="details-retry-btn"
                        onClick={() => onRetryItem(item.id)}
                        disabled={!isComplete}
                      >
                        Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="details-footer">
          <button className="details-ok-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPopup;
