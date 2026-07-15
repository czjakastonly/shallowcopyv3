import { useEffect } from 'react';
import './ContentArea.css';
import Checkbox from './Checkbox';
import BulkActionsBar from './BulkActionsBar';
import ContentRow from './ContentRow';
import sortIcon from '../icons/Icons/16/01 - general/drop-down/gray.svg';

function BreadcrumbChevron() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="breadcrumb-separator">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.64645 1.14645C2.45118 1.34171 2.45118 1.65829 2.64645 1.85355L4.79289 4L2.64645 6.14645C2.45118 6.34171 2.45118 6.65829 2.64645 6.85355C2.84171 7.04882 3.15829 7.04882 3.35355 6.85355L5.85355 4.35355C6.04882 4.15829 6.04882 3.84171 5.85355 3.64645L3.35355 1.14645C3.15829 0.951184 2.84171 0.951184 2.64645 1.14645Z"
        fill="#8B8E95"
      />
    </svg>
  );
}

function Breadcrumb({ path, onBreadcrumbClick }) {
  return (
    <div className="breadcrumb">
      {path.map((item, index) => (
        <span key={item.id} className="breadcrumb-segment">
          {index > 0 && <BreadcrumbChevron />}
          <span
            className="breadcrumb-text"
            onClick={() => onBreadcrumbClick(index)}
          >
            {item.name}
          </span>
        </span>
      ))}
    </div>
  );
}

function ContentArea({
  items,
  breadcrumb,
  selectedItems,
  processingIds,
  operationStatusMap,
  isOperationActive,
  showSpinner,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onFolderClick,
  onOpenShallowCopy,
  onBreadcrumbClick,
  onDelete,
  onOpenDetails,
  onRowPreview,
  onRowEditRights,
  onRowMoveTo,
  onRowDuplicate,
  onRowCreateShallowCopy,
  onRowViewOccurrences,
  onRowSettings,
  onRowDelete,
  scrollToItemId,
  onScrollToItemHandled,
}) {
  const selectableItems = items.filter((i) => !processingIds.has(i.id));

  useEffect(() => {
    if (!scrollToItemId) return;
    const row = document.querySelector(`[data-item-id="${scrollToItemId}"]`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.add('content-row--highlight');
      setTimeout(() => row.classList.remove('content-row--highlight'), 1600);
    }
    onScrollToItemHandled?.();
  }, [scrollToItemId, onScrollToItemHandled]);
  const hasSelection = selectedItems.size > 0;
  const allSelected =
    selectableItems.length > 0 && selectedItems.size === selectableItems.length;
  const someSelected = hasSelection && !allSelected;

  const showBar = hasSelection || showSpinner;

  const headerCheckboxState = allSelected
    ? 'checked'
    : someSelected
    ? 'partial'
    : 'default';

  return (
    <div className="content-area">
      <div className="content-area-inner">
        <div className="content-list">
          <div className="content-header-section">
            {showBar ? (
              <BulkActionsBar
                selectedCount={selectedItems.size}
                onClearSelection={onClearSelection}
                onDelete={onDelete}
                isOperationActive={isOperationActive}
                showSpinner={showSpinner}
                onOpenDetails={onOpenDetails}
              />
            ) : (
              <div className="content-breadcrumb-wrapper">
                <Breadcrumb path={breadcrumb} onBreadcrumbClick={onBreadcrumbClick} />
              </div>
            )}
          </div>

          <div className="content-column-headers">
            <div className="content-columns-inner">
              <Checkbox state={headerCheckboxState} onChange={onSelectAll} />
              <span className="column-header column-header--name">NAME</span>
              <span className="column-header column-header--tags">TAGS</span>
              <div className="column-header column-header--status">
                <span>STATUS</span>
              </div>
              <div className="column-header column-header--edited">
                <span>LAST EDITED</span>
                <img src={sortIcon} alt="" className="column-sort-icon" />
              </div>
            </div>
          </div>

          <div className="content-rows">
            {items.map((item) => (
              <ContentRow
                key={item.id}
                item={item}
                isSelected={selectedItems.has(item.id)}
                isProcessing={processingIds.has(item.id)}
                operationStatus={operationStatusMap?.get(item.id) || null}
                onToggleSelect={onToggleSelect}
                onFolderClick={onFolderClick}
                onOpenShallowCopy={onOpenShallowCopy}
                onRowPreview={onRowPreview}
                onRowEditRights={onRowEditRights}
                onRowMoveTo={onRowMoveTo}
                onRowDuplicate={onRowDuplicate}
                onRowCreateShallowCopy={onRowCreateShallowCopy}
                onRowViewOccurrences={onRowViewOccurrences}
                onRowSettings={onRowSettings}
                onRowDelete={onRowDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentArea;
