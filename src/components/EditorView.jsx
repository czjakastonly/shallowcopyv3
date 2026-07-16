import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '@stonly/design-system';
import ChevronLeftIcon from '@stonly/design-system/icons/ChevronLeft-16';
import GuideLinkIcon from '@stonly/design-system/icons/GuideLink-16';
import EditIcon from '@stonly/design-system/icons/Edit-16';
import EyeIcon from '@stonly/design-system/icons/Eye-16';
import ShareIcon from '@stonly/design-system/icons/Share-16';
import AiSummaryIcon from '@stonly/design-system/icons/AiSummary-16';
import SettingsIcon from '@stonly/design-system/icons/Settings-16';
import MoreIcon from '@stonly/design-system/icons/More-16';
import ChecklistItemIcon from '@stonly/design-system/icons/ChecklistItem-color-16';
import OpenIcon from '@stonly/design-system/icons/Open-16';
import layersIcon from '../icons/ds-missing/Layers-16.svg';
import emptyEditorIcon from '../icons/ds-missing/EmptyEditor-72.svg';

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.backgroundDefault};
`;

const Header = styled.div`
  background: ${({ theme }) => theme.color.backgroundBrand};
  flex-shrink: 0;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 106px;
  padding: 16px 24px 0;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

const EditIconWrap = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.15s;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

const GuideName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  path {
    fill: ${({ theme }) => theme.color.borderPrimary};
  }

  &:hover ${EditIconWrap} {
    opacity: 1;
  }
`;

const GuideTitle = styled.p`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EditButton = styled.button`
  display: inline-flex;
  border: none;
  background: none;
  padding: 4px;
  margin: -4px;
  cursor: pointer;
  flex-shrink: 0;
`;

const GuideTitleInput = styled.input`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.color.borderDefaultHover};
  border-radius: 4px;
  padding: 0 4px;
  margin: 0 -4px;
  min-width: 0;
  max-width: 480px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.borderFocus};
  }
`;

const ShallowCopyBadge = styled.span`
  ${({ theme }) => theme.typography.paragraphSmall};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  background: ${({ theme }) => theme.color.borderPrimary};
  padding: 0 4px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const SavingChanges = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

const SavingChangesText = styled.p`
  ${({ theme }) => theme.typography.uiElementStrong};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  margin: 0;
  white-space: nowrap;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 24px 8px;
  gap: 16px;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  flex: 1;
  min-width: 0;
  padding-left: 42px;
`;

const Tab = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 4px;
  border: none;
  background: none;
  cursor: pointer;
  ${({ theme }) => theme.typography.uiElementLabel};
  color: ${({ theme, $active }) => ($active ? theme.color.textDefaultInverse : 'rgba(255, 255, 255, 0.7)')};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -12px;
    height: 2px;
    background: ${({ theme, $active }) => ($active ? theme.color.backgroundPrimary : 'transparent')};
  }
`;

const TabBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -16px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.backgroundPrimary};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

const IconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.3);
`;

const LanguageButton = styled.button`
  ${({ theme }) => theme.typography.uiElementStrong};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.textDefaultInverse};
  border: none;
  background: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SplitButton = styled.div`
  display: flex;
  align-items: stretch;
`;

const SplitButtonMain = styled.button`
  ${({ theme }) => theme.typography.uiElementStrong};
  background: ${({ theme }) => theme.color.backgroundPrimary};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  border: none;
  padding: 8px 24px;
  border-radius: 18px 0 0 18px;
  cursor: pointer;
`;

const SplitButtonMore = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.backgroundPrimary};
  border: none;
  padding: 0 12px;
  border-radius: 0 18px 18px 0;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 566px;
  max-width: calc(100vw - 48px);
`;

const EmptyStateText = styled.p`
  ${({ theme }) => theme.typography.h3};
  color: ${({ theme }) => theme.color.textDefault};
  text-align: center;
  margin: 0 0 16px;
`;

const DialogButtonIcon = styled.span`
  display: inline-flex;
  margin-right: 8px;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

function EditorView({ item, onBack, onRename }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(item.name);
  const [activeTab, setActiveTab] = useState('editor');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditingName) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditingName]);

  const handleStartEditing = () => {
    setNameDraft(item.name);
    setIsEditingName(true);
  };

  const commitRename = () => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== item.name) {
      onRename?.(trimmed);
    } else {
      setNameDraft(item.name);
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitRename();
    } else if (e.key === 'Escape') {
      setNameDraft(item.name);
      setIsEditingName(false);
    }
  };

  return (
    <Page>
      <Header>
        <TopBar>
          <Navigation>
            <BackButton type="button" onClick={onBack} aria-label="Back to content management">
              <ChevronLeftIcon width={24} height={24} />
            </BackButton>
            <GuideName>
              <GuideLinkIcon width={32} height={32} />
              {isEditingName ? (
                <GuideTitleInput
                  ref={inputRef}
                  value={nameDraft}
                  size={Math.max(nameDraft.length, 1)}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={handleNameKeyDown}
                  aria-label="Shallow copy name"
                />
              ) : (
                <>
                  <GuideTitle>{item.name}</GuideTitle>
                  <EditButton type="button" onClick={handleStartEditing} aria-label="Rename this shallow copy">
                    <EditIconWrap aria-hidden>
                      <EditIcon />
                    </EditIconWrap>
                  </EditButton>
                </>
              )}
              <ShallowCopyBadge>Shallow copy</ShallowCopyBadge>
            </GuideName>
          </Navigation>
          <SavingChanges>
            <SavingChangesText>Changes auto-saved - 4 minutes ago</SavingChangesText>
            <ChecklistItemIcon />
          </SavingChanges>
        </TopBar>
        <BottomBar>
          <Tabs>
            <Tab type="button" $active={activeTab === 'editor'} onClick={() => setActiveTab('editor')}>
              Editor
            </Tab>
            <Tab type="button" $active={activeTab === 'insights'} onClick={() => setActiveTab('insights')}>
              Insights
              <TabBadge>3</TabBadge>
            </Tab>
          </Tabs>
          <Actions>
            <IconButtonGroup>
              <IconButton type="button" aria-label="Preview">
                <EyeIcon />
              </IconButton>
              <IconButton type="button" aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton type="button" aria-label="AI summary">
                <AiSummaryIcon />
              </IconButton>
              <IconButton type="button" aria-label="Settings">
                <SettingsIcon />
              </IconButton>
            </IconButtonGroup>
            <Divider />
            <IconButton type="button" aria-label="Layers">
              <img src={layersIcon} alt="" width={16} height={16} />
            </IconButton>
            <Divider />
            <LanguageButton type="button">EN</LanguageButton>
            <SplitButton>
              <SplitButtonMain type="button">Save and publish</SplitButtonMain>
              <SplitButtonMore type="button" aria-label="More publish options">
                <MoreIcon />
              </SplitButtonMore>
            </SplitButton>
          </Actions>
        </BottomBar>
      </Header>
      <Body>
        <EmptyState>
          <img src={emptyEditorIcon} alt="" width={72} height={72} />
          <EmptyStateText>
            Editor unavailable for shallow copy.
            <br />
            To change content, edit the original guide.
          </EmptyStateText>
          <ButtonPrimary type="button" onClick={() => {}}>
            <DialogButtonIcon aria-hidden>
              <OpenIcon />
            </DialogButtonIcon>
            Open original guide
          </ButtonPrimary>
        </EmptyState>
      </Body>
    </Page>
  );
}

export default EditorView;
