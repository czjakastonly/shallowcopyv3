import { useEffect, useRef } from 'react';
import './ConfirmDeleteModal.css';

function WarningIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
        fill="#FFF0F1"
      />
      <path
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
        stroke="#D92034"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFF0F1"
      />
      <path d="M16 10v6" stroke="#D92034" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="21" r="1.25" fill="#D92034" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 3.5C1.5 2.94772 1.94772 2.5 2.5 2.5H6L7.5 4H13.5C14.0523 4 14.5 4.44772 14.5 5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V3.5Z"
        fill="#8B8E95"
        stroke="#8B8E95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConfirmDeleteModal({
  itemCount,
  selectedFolders,
  guidesCount,
  folderGuidesCount,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);
  const hasFolders = selectedFolders && selectedFolders.length > 0;

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const title = `Delete ${itemCount} item${itemCount !== 1 ? 's' : ''}?`;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-dialog"
        role="alertdialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
      >
        <div className="modal-icon">
          <WarningIcon />
        </div>
        <h2 className="modal-title" id="modal-title">
          {title}
        </h2>

        {hasFolders ? (
          <div className="modal-body" id="modal-body">
            <div className="modal-warning-block">
              <div className="modal-warning-header">
                <span className="modal-warning-icon-text">⚠</span>
                <span className="modal-warning-title">
                  {selectedFolders.length} folder
                  {selectedFolders.length !== 1 ? 's' : ''} will be permanently
                  deleted
                </span>
              </div>
              <p className="modal-warning-subtitle">
                Folders cannot be recovered once deleted.
              </p>
              <div className="modal-folder-list">
                {selectedFolders.map((folder) => (
                  <div key={folder.id} className="modal-folder-item">
                    <FolderIcon />
                    <span className="modal-folder-name">{folder.name}</span>
                    <span className="modal-folder-count">
                      {folder.guides} guide{folder.guides !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {(guidesCount > 0 || folderGuidesCount > 0) && (
              <p className="modal-info-text">
                {guidesCount + folderGuidesCount} guide
                {guidesCount + folderGuidesCount !== 1 ? 's' : ''} will be
                moved to Recently Deleted (recoverable for 14 days).
              </p>
            )}
            <p className="modal-info-text modal-info-text--muted">
              Folder structure will not be preserved.
            </p>
          </div>
        ) : (
          <p className="modal-body modal-body--simple" id="modal-body">
            {itemCount === 1
              ? 'This item will be moved to Recently Deleted and permanently removed after 14 days.'
              : 'These items will be moved to Recently Deleted and permanently removed after 14 days.'}
          </p>
        )}

        <div className="modal-actions">
          <button
            ref={cancelRef}
            className="modal-btn modal-btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="modal-btn modal-btn--delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
