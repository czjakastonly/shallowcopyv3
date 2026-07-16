import { useState } from 'react';
import styled from 'styled-components';
import { ModalWindow, ActionsDialog } from '@stonly/design-system';
import SearchIcon from '@stonly/design-system/icons/Search-16';
import Checkbox from './Checkbox';
import './FolderTree.css';
import folderIcon from '../icons/Icons/16px/Categories/Folder.svg';
import rootIcon from '../icons/Root.svg';
import chevronIcon from '../icons/Icons/16px/Common/Search Copy.svg';
import lockIcon from '../icons/Icons/16px/Common/Access rights.svg';
import collapse16Icon from '../icons/ds-missing/Collapse-16.svg';
import expand16Icon from '../icons/ds-missing/Expand-16.svg';

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 8px 4px;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;

  path {
    fill: ${({ theme }) => theme.color.iconSubtle};
  }
`;

const SearchInput = styled.input`
  ${({ theme }) => theme.typography.uiElement};
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.color.textDefault};

  &::placeholder {
    color: ${({ theme }) => theme.color.textPlaceholder};
  }
`;

const FilterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const TreeHeaderIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const TreeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
`;

const PublishToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const PublishToggleLabel = styled.span`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textDefault};
`;

function collectAllFolderIds(node, ids = []) {
  if (node.type !== 'home') ids.push(node.id);
  (node.children || []).forEach((child) => collectAllFolderIds(child, ids));
  return ids;
}

function findNode(node, id) {
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function findPath(node, id, ancestors = []) {
  const nextAncestors = node.type === 'home' ? ancestors : [...ancestors, node.name];
  if (node.id === id) return nextAncestors;
  for (const child of node.children || []) {
    const found = findPath(child, id, nextAncestors);
    if (found) return found;
  }
  return null;
}

function nodeMatchesQuery(node, query) {
  if (node.name.toLowerCase().includes(query)) return true;
  return (node.children || []).some((child) => nodeMatchesQuery(child, query));
}

// Direct port of FolderTree.jsx's TreeNode, extended with multiselect checkboxes.
function ModalTreeNode({ node, depth = 0, selectedIds, onToggleSelect, expandedIds, onToggleExpand, query }) {
  const isHome = node.type === 'home';
  const showChevron = !isHome;

  if (query && !nodeMatchesQuery(node, query)) return null;

  // Home and direct children: 12px, grandchildren: 36px (matches FolderTree.jsx exactly)
  const paddingLeft = depth >= 2 ? 36 : 12;

  const isExpanded = isHome || expandedIds.has(node.id) || !!query;

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    onToggleExpand(node.id);
  };

  const handleClick = () => {
    onToggleSelect(node.id);
  };

  return (
    <>
      <div className="tree-node" style={{ paddingLeft: `${paddingLeft}px` }} onClick={handleClick}>
        <div className="tree-node-left">
          {showChevron && (
            <button className="tree-toggle" onClick={handleToggleExpand}>
              <img
                src={chevronIcon}
                alt=""
                className={`tree-toggle-icon ${isExpanded ? 'tree-toggle-icon--expanded' : ''}`}
              />
            </button>
          )}

          <Checkbox
            state={selectedIds.has(node.id) ? 'checked' : 'default'}
            onChange={() => onToggleSelect(node.id)}
          />

          <img src={node.type === 'root' ? rootIcon : folderIcon} alt="" className="tree-node-icon" />

          <span className={`tree-node-name ${isHome ? 'tree-node-name--dark' : ''}`}>{node.name}</span>

          {node.type === 'root' && <span className="tree-root-badge">Root</span>}

          {node.locked && <img src={lockIcon} alt="Locked" className="tree-lock-icon" />}
        </div>
      </div>

      {isExpanded &&
        node.children &&
        node.children.map((child) => (
          <ModalTreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedIds={selectedIds}
            onToggleSelect={onToggleSelect}
            expandedIds={expandedIds}
            onToggleExpand={onToggleExpand}
            query={query}
          />
        ))}
    </>
  );
}

function CreateShallowCopyModal({ treeData, onConfirm, onCancel }) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedIds, setExpandedIds] = useState(new Set([treeData.children?.[0]?.id].filter(Boolean)));
  const [searchValue, setSearchValue] = useState('');
  const [publishInstantly, setPublishInstantly] = useState(false);

  const handleToggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedIds(new Set(collectAllFolderIds(treeData)));
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  const rootLabel = (treeData.name || '').split(' ')[0];

  const query = searchValue.trim().toLowerCase();

  const handleCreate = () => {
    const selectedList = [...selectedIds].map((id) => {
      const node = findNode(treeData, id) || { name: id, type: 'folder' };
      const ancestors = findPath(treeData, id) || [node.name];
      const path = [rootLabel, ...ancestors].join(' > ');
      return { id, name: node.name, isRoot: node.type === 'root', path };
    });
    onConfirm(selectedList, publishInstantly);
  };

  return (
    <ModalWindow onBackdropClick={onCancel}>
      <ActionsDialog
        title="Create shallow copy"
        size="large"
        primaryLabel={selectedIds.size > 0 ? `Create (${selectedIds.size})` : 'Create'}
        primaryIsDisabled={selectedIds.size === 0}
        primaryAction={handleCreate}
        secondaryLabel="Cancel"
        secondaryAction={onCancel}
        closeAction={onCancel}
        tertiaryRender={() =>
          selectedIds.size > 0 && (
            <PublishToggle>
              <Checkbox
                state={publishInstantly ? 'checked' : 'default'}
                onChange={() => setPublishInstantly((prev) => !prev)}
              />
              <PublishToggleLabel>Publish all instantly</PublishToggleLabel>
            </PublishToggle>
          )
        }
      >
        <FilterRow>
          <SearchWrap>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search folders"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search folders"
            />
          </SearchWrap>
          <FilterActions>
            <TreeHeaderIconButton type="button" onClick={handleCollapseAll} aria-label="Collapse all">
              <img src={collapse16Icon} alt="" width={16} height={16} />
            </TreeHeaderIconButton>
            <TreeHeaderIconButton type="button" onClick={handleExpandAll} aria-label="Expand all">
              <img src={expand16Icon} alt="" width={16} height={16} />
            </TreeHeaderIconButton>
          </FilterActions>
        </FilterRow>

        <TreeWrap>
          <ModalTreeNode
            node={treeData}
            depth={0}
            selectedIds={selectedIds}
            onToggleSelect={handleToggle}
            expandedIds={expandedIds}
            onToggleExpand={handleToggleExpand}
            query={query}
          />
        </TreeWrap>
      </ActionsDialog>
    </ModalWindow>
  );
}

export default CreateShallowCopyModal;
