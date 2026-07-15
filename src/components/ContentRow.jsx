import { useState } from 'react';
import './ContentRow.css';
import Checkbox from './Checkbox';
import RowActionsMenu from './RowActionsMenu';
import folderLargeIcon from '../icons/Icons/16px/Categories/Folder.svg';
import guideIcon from '../icons/Icons/folder.svg';
import checklistLargeIcon from '../icons/Icons/folder-1.svg';
import shallowCopyLargeIcon from '../icons/ds-missing/ShallowCopy-XL.svg';
import lockIcon from '../icons/Icons/16px/Common/Access rights.svg';
import dotSeparator from '../icons/Ellipse 2.svg';
import dotPublished from '../icons/Dot.svg';
import dotDraft from '../icons/Dot-1.svg';

function ContentRow({
  item,
  isSelected,
  isProcessing,
  operationStatus,
  onToggleSelect,
  onFolderClick,
  onOpenShallowCopy,
  onRowPreview,
  onRowEditRights,
  onRowMoveTo,
  onRowDuplicate,
  onRowCreateShallowCopy,
  onRowViewOccurrences,
  onRowSettings,
  onRowDelete,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getItemIcon = () => {
    if (item.isShallowCopy) return shallowCopyLargeIcon;
    if (item.type === 'folder') return folderLargeIcon;
    if (item.type === 'checklist') return checklistLargeIcon;
    return guideIcon;
  };

  const handleRowClick = () => {
    if (isProcessing) return;
    if (item.isShallowCopy) {
      onOpenShallowCopy?.(item);
    } else if (item.type === 'folder') {
      onFolderClick(item);
    }
  };

  const rowClassName = [
    'content-row',
    isSelected && 'content-row--selected',
    isProcessing && 'content-row--processing',
  ]
    .filter(Boolean)
    .join(' ');

  const statusLabel = operationStatus === 'in_progress' ? 'Deleting' : 'Pending';
  const statusClass = operationStatus === 'in_progress' ? 'processing' : 'pending';

  return (
    <div
      className={rowClassName}
      data-item-id={item.id}
      onClick={handleRowClick}
      onMouseEnter={() => isProcessing && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {isProcessing ? (
        <Checkbox state="default" onChange={() => {}} disabled />
      ) : (
        <Checkbox
          state={isSelected ? 'checked' : 'default'}
          onChange={() => onToggleSelect(item.id)}
        />
      )}

      <div className="content-row-info">
        <div className="content-row-icon-wrapper">
          <img src={getItemIcon()} alt="" className="content-row-icon" />
        </div>
        <div className="content-row-details">
          <div className="content-row-title-row">
            <span className="content-row-title">{item.name}</span>
            {item.isShallowCopy && <span className="content-row-shallow-copy-badge">Shallow copy</span>}
            {item.locked && !isProcessing && (
              <img src={lockIcon} alt="Locked" className="content-row-lock" />
            )}
          </div>
          <div className="content-row-meta">
            {item.type === 'folder' ? (
              <>
                <span className="content-row-meta-text">{item.guides} guides</span>
                <img src={dotSeparator} alt="" className="content-row-dot-separator" />
                <span className="content-row-meta-text">{item.folders} folders</span>
              </>
            ) : (
              <span className="content-row-meta-text">
                {item.steps} {item.steps === 1 ? 'Step' : 'steps'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="content-row-tags">
        <span className="content-row-tags-text">{item.tags}</span>
      </div>

      <div className="content-row-status">
        {isProcessing ? (
          <>
            <span className={`content-row-status-dot content-row-status-dot--${statusClass}`} />
            <span className={`content-row-status-text content-row-status-text--${statusClass}`}>
              {statusLabel}
            </span>
          </>
        ) : item.status ? (
          <>
            <img
              src={item.status === 'published' ? dotPublished : dotDraft}
              alt=""
              className="content-row-status-dot"
            />
            <span className="content-row-status-text">
              {item.status === 'published' ? 'Published' : 'Draft'}
            </span>
          </>
        ) : (
          <span className="content-row-status-text">-</span>
        )}
      </div>

      <div className="content-row-edited">
        <span className="content-row-edited-text">{item.lastEdited}</span>
      </div>

      <RowActionsMenu
        item={item}
        disabled={isProcessing}
        onPreview={onRowPreview}
        onEditRights={onRowEditRights}
        onMoveTo={onRowMoveTo}
        onDuplicate={onRowDuplicate}
        onCreateShallowCopy={onRowCreateShallowCopy}
        onViewOccurrences={onRowViewOccurrences}
        onSettings={onRowSettings}
        onDelete={onRowDelete}
      />

      {isProcessing && showTooltip && (
        <div className="content-row-processing-tooltip">
          Bulk delete in progress
        </div>
      )}
    </div>
  );
}

export default ContentRow;
