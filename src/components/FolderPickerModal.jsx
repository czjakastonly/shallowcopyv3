import { useState, useEffect } from 'react';
import './FolderPickerModal.css';

function FolderIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M1.5 3.5C1.5 2.94772 1.94772 2.5 2.5 2.5H6L7.5 4H13.5C14.0523 4 14.5 4.44772 14.5 5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V3.5Z"
        fill="#FFD166"
        stroke="#E6B84D"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function ChevronIcon({ expanded }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      className={`fp-chevron ${expanded ? 'fp-chevron--expanded' : ''}`}
    >
      <path
        d="M2 3L4 5L6 3"
        stroke="#8B8E95"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TreeNode({ node, depth, selectedId, onSelect }) {
  const [expanded, setExpanded] = useState(node.expanded || depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;
  const isHome = node.type === 'home';

  if (isHome) {
    return (
      <div className="fp-tree-section">
        {hasChildren &&
          node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="fp-tree-node-wrapper">
      <div
        className={`fp-tree-node ${isSelected ? 'fp-tree-node--selected' : ''}`}
        style={{ paddingLeft: `${12 + depth * 20}px` }}
        onClick={() => onSelect(node.id, node.name)}
      >
        {hasChildren ? (
          <button
            className="fp-tree-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            <ChevronIcon expanded={expanded} />
          </button>
        ) : (
          <span className="fp-tree-toggle-spacer" />
        )}
        <FolderIcon />
        <span className="fp-tree-label">{node.name}</span>
      </div>
      {expanded && hasChildren && (
        <div className="fp-tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FolderPickerModal({ treeData, itemCount, mode = 'restore', onConfirm, onCancel }) {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState('');

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

  const handleSelect = (id, name) => {
    setSelectedFolderId(id);
    setSelectedFolderName(name);
  };

  const actionLabel = mode === 'move' ? 'Move' : 'Restore';

  return (
    <div className="fp-overlay" onClick={handleOverlayClick}>
      <div className="fp-dialog">
        <div className="fp-header">
          <h2 className="fp-title">
            {actionLabel} {itemCount} item{itemCount !== 1 ? 's' : ''}
          </h2>
          <button className="fp-close" onClick={onCancel}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="#5d6169" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="fp-subtitle">Select a destination folder</p>

        <div className="fp-tree-container">
          <TreeNode
            node={treeData}
            depth={0}
            selectedId={selectedFolderId}
            onSelect={handleSelect}
          />
        </div>

        {selectedFolderName && (
          <div className="fp-selected-info">
            Restore to: <strong>{selectedFolderName}</strong>
          </div>
        )}

        <div className="fp-actions">
          <button className="fp-btn fp-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="fp-btn fp-btn--confirm"
            onClick={() => onConfirm(selectedFolderId, selectedFolderName)}
            disabled={!selectedFolderId}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FolderPickerModal;
