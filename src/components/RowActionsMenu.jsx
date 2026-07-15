import { Menu, Action, ActionDelete, ListDivider, ButtonMinimal } from '@stonly/design-system';
import MoreIcon from '@stonly/design-system/icons/More-16';
import OpenIcon from '@stonly/design-system/icons/Open-16';
import EditIcon from '@stonly/design-system/icons/Edit-16';
import MoveToIcon from '@stonly/design-system/icons/MoveTo-16';
import CopyIcon from '@stonly/design-system/icons/Copy-16';
import GuideLinkIcon from '@stonly/design-system/icons/GuideLink-16';
import TipIcon from '@stonly/design-system/icons/Tip-16';
import SettingsIcon from '@stonly/design-system/icons/Settings-16';

function RowActionsMenu({
  item,
  disabled,
  onPreview,
  onEditRights,
  onMoveTo,
  onDuplicate,
  onCreateShallowCopy,
  onViewOccurrences,
  onSettings,
  onDelete,
}) {
  if (disabled) {
    return <div className="content-row-more content-row-more--disabled" />;
  }

  return (
    <div className="content-row-more" onClick={(e) => e.stopPropagation()}>
      <Menu as={ButtonMinimal} size="small" iconOnly={<MoreIcon />} aria-label={`Actions for ${item.name}`}>
        <Action label="Preview" iconLeft={<OpenIcon />} action={() => onPreview?.(item)} />
        <Action label="Edit rights" iconLeft={<EditIcon />} action={() => onEditRights?.(item)} />
        <Action label="Move to..." iconLeft={<MoveToIcon />} action={() => onMoveTo?.(item)} />
        <Action label="Duplicate" iconLeft={<CopyIcon />} action={() => onDuplicate?.(item)} />
        {!item.isShallowCopy && (
          <Action
            label="Create shallow copy"
            iconLeft={<GuideLinkIcon />}
            action={() => onCreateShallowCopy?.(item)}
          />
        )}
        <Action label="View occurrences" iconLeft={<TipIcon />} action={() => onViewOccurrences?.(item)} />
        <Action label="Settings" iconLeft={<SettingsIcon />} action={() => onSettings?.(item)} />
        <ListDivider />
        <ActionDelete label="Delete" action={() => onDelete?.(item)} />
      </Menu>
    </div>
  );
}

export default RowActionsMenu;
