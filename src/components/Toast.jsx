import { useEffect, useState, useRef } from 'react';
import './Toast.css';

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 1.998V0.75C4.5 0.335786 4.83579 0 5.25 0H10.75C11.1642 0 11.5 0.335786 11.5 0.75V1.998H14.25C14.6642 1.998 15 2.33379 15 2.748C15 3.16221 14.6642 3.498 14.25 3.498H1.75C1.33579 3.498 1 3.16221 1 2.748C1 2.33379 1.33579 1.998 1.75 1.998H4.5ZM6 1.998H10V1.5H6V1.998ZM12.25 14V5.25C12.25 4.83579 12.5858 4.5 13 4.5C13.4142 4.5 13.75 4.83579 13.75 5.25V14.75C13.75 15.1642 13.4142 15.5 13 15.5H3C2.58579 15.5 2.25 15.1642 2.25 14.75V5.25C2.25 4.83579 2.58579 4.5 3 4.5C3.41421 4.5 3.75 4.83579 3.75 5.25V14H12.25ZM5.7461 6.748C5.7461 6.33379 6.08189 5.998 6.4961 5.998C6.91031 5.998 7.2461 6.33379 7.2461 6.748V11.248C7.2461 11.6622 6.91031 11.998 6.4961 11.998C6.08189 11.998 5.7461 11.6622 5.7461 11.248V6.748ZM8.75 6.748C8.75 6.33379 9.08579 5.998 9.5 5.998C9.91421 5.998 10.25 6.33379 10.25 6.748V11.248C10.25 11.6622 9.91421 11.998 9.5 11.998C9.08579 11.998 8.75 11.6622 8.75 11.248V6.748Z"
        fill="white"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071L2.29289 9.70711C1.90237 9.31658 1.90237 8.68342 2.29289 8.29289C2.68342 7.90237 3.31658 7.90237 3.70711 8.29289L6 10.5858L12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289Z"
        fill="white"
      />
    </svg>
  );
}

function Toast({ activeOperation, onAbort, onDismiss, onSeeDetails, detailsOpen, message }) {
  const [visible, setVisible] = useState(false);
  const autoDismissRef = useRef(null);
  const isSimple = !activeOperation && !!message;

  const items = activeOperation?.items || [];
  const totalCount = items.length;
  const completedCount = items.filter((i) => i.status === 'completed').length;
  const failedCount = items.filter((i) => i.status === 'failed').length;
  const cancelledCount = items.filter((i) => i.status === 'cancelled').length;
  const processedCount = completedCount + failedCount + cancelledCount;
  const isComplete = activeOperation?.complete;
  const isAborting = activeOperation?.aborting;
  const isAborted = activeOperation?.aborted;
  const hasErrors = failedCount > 0;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const shouldAutoDismiss = isSimple || (isComplete && !hasErrors && !isAborted && !detailsOpen);
    if (!shouldAutoDismiss) return undefined;
    autoDismissRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(), 300);
    }, 3000);
    return () => clearTimeout(autoDismissRef.current);
  }, [isSimple, isComplete, hasErrors, isAborted, detailsOpen, onDismiss]);

  const handleDismissClick = () => {
    clearTimeout(autoDismissRef.current);
    setVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  const handleAbort = () => {
    if (onAbort) onAbort();
  };

  if (isSimple) {
    return (
      <div className={`toast-container ${visible ? 'toast-container--visible' : ''}`}>
        <div className="toast">
          <div className="toast-icon">
            <CheckIcon />
          </div>
          <div className="toast-content">
            <span className="toast-message">{message}</span>
          </div>
          <div className="toast-actions-right">
            <button className="toast-close-btn" onClick={handleDismissClick} title="Dismiss">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  let statusMessage;
  if (isAborting) {
    statusMessage = 'Aborting...';
  } else if (isAborted) {
    statusMessage = `Aborted. ${completedCount} of ${totalCount} items deleted`;
  } else if (isComplete) {
    statusMessage = `${completedCount} item${completedCount !== 1 ? 's' : ''} deleted`;
  } else {
    statusMessage = `${processedCount} of ${totalCount} completed`;
  }

  return (
    <div className={`toast-container ${visible ? 'toast-container--visible' : ''}`}>
      <div className="toast">
        <div className="toast-icon">
          <DeleteIcon />
        </div>
        <div className="toast-content">
          <span className="toast-message">{statusMessage}</span>
          {hasErrors && (
            <span className="toast-error">
              {failedCount} item{failedCount !== 1 ? 's' : ''} failed
            </span>
          )}
          <button className="toast-details-link" onClick={onSeeDetails}>
            See details
          </button>
        </div>
        <div className="toast-actions-right">
          {!isComplete && !isAborting && !isAborted && (
            <button className="toast-abort-btn" onClick={handleAbort}>
              ABORT
            </button>
          )}
          <button className="toast-close-btn" onClick={handleDismissClick} title="Dismiss">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
