import { useState } from 'react';
import './FolderTree.css';
import folderIcon from '../icons/Icons/16px/Categories/Folder.svg';
import rootIcon from '../icons/Root.svg';
import chevronIcon from '../icons/Icons/16px/Common/Search Copy.svg';
import addIcon from '../icons/Icons/16px/General/Add small.svg';
import lockIcon from '../icons/Icons/16px/Common/Access rights.svg';

function hasHighlightedDescendant(node, highlightedFolderIds) {
  return (node.children || []).some(
    (child) => highlightedFolderIds.has(child.id) || hasHighlightedDescendant(child, highlightedFolderIds)
  );
}

function TreeNode({ node, depth = 0, activeFolderId, onNodeClick, highlightedFolderIds }) {
  const [expanded, setExpanded] = useState(node.expanded || false);
  const isActive = node.id === activeFolderId;
  const isHome = node.type === 'home';
  const showChevron = !isHome;
  const isHighlighted = highlightedFolderIds.has(node.id);
  const forceExpanded = hasHighlightedDescendant(node, highlightedFolderIds);

  // Home and direct children: 12px, grandchildren: 36px
  const paddingLeft = depth >= 2 ? 36 : 12;

  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleClick = () => {
    onNodeClick(node.id);
    if (!isHome) {
      setExpanded(!expanded);
    }
  };

  // Home node always shows its children; auto-expand to reveal a freshly highlighted descendant
  const showChildren = isHome || expanded || forceExpanded;

  return (
    <>
      <div
        className={`tree-node ${isActive ? 'tree-node--active' : ''} ${isHighlighted ? 'tree-node--highlight' : ''}`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleClick}
      >
        <div className="tree-node-left">
          {showChevron && (
            <button className="tree-toggle" onClick={handleToggle}>
              <img
                src={chevronIcon}
                alt=""
                className={`tree-toggle-icon ${expanded ? 'tree-toggle-icon--expanded' : ''}`}
              />
            </button>
          )}

          <img
            src={node.type === 'root' ? rootIcon : folderIcon}
            alt=""
            className="tree-node-icon"
          />

          <span className={`tree-node-name ${isHome ? 'tree-node-name--dark' : ''}`}>
            {node.name}
          </span>

          {node.type === 'root' && (
            <span className="tree-root-badge">Root</span>
          )}

          {node.locked && (
            <img src={lockIcon} alt="Locked" className="tree-lock-icon" />
          )}
        </div>

        {isHome && (
          <button className="tree-add-btn" onClick={(e) => e.stopPropagation()}>
            <img src={addIcon} alt="Add" className="tree-add-icon" />
          </button>
        )}
      </div>

      {showChildren && node.children && node.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          activeFolderId={activeFolderId}
          onNodeClick={onNodeClick}
          highlightedFolderIds={highlightedFolderIds}
        />
      ))}
    </>
  );
}

function FolderTree({ data, activeFolderId, onNodeClick, highlightedFolderIds = new Set() }) {
  return (
    <div className="folder-tree">
      <div className="folder-tree-content">
        <TreeNode
          node={data}
          depth={0}
          activeFolderId={activeFolderId}
          onNodeClick={onNodeClick}
          highlightedFolderIds={highlightedFolderIds}
        />
      </div>
    </div>
  );
}

export default FolderTree;
