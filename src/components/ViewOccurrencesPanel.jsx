import { useState } from 'react';
import styled from 'styled-components';
import GuideColorIcon from '@stonly/design-system/icons/Guide-color-16';
import OpenIcon from '@stonly/design-system/icons/Open-16';
import CloseIcon from '@stonly/design-system/icons/Close-16';
import shallowCopyIcon from '../icons/ds-missing/ShallowCopy-16.svg';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color.backgroundBrand};
  opacity: 0.6;
`;

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  width: 480px;
  background: ${({ theme }) => theme.color.backgroundDefault};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.div`
  position: relative;
  padding: 80px 24px 0 32px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.color.backgroundGrayDefault};
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }

  &:hover {
    background: ${({ theme }) => theme.color.backgroundGrayBold};
  }
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.color.textDark};
  margin: 0 0 8px;
`;

const Tabs = styled.div`
  display: flex;
  padding-left: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderSubtle};
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  ${({ theme }) => theme.typography.uiElementStrong};
  color: ${({ theme, $active }) => ($active ? theme.color.textActive : theme.color.textDefault)};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    background: ${({ theme, $active }) => ($active ? theme.color.backgroundActive : 'transparent')};
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 16px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.color.backgroundDefaultHover};
  }
`;

const ItemIcon = styled.div`
  display: flex;
  padding-top: 4px;
  flex-shrink: 0;
`;

const EmptyState = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textSubtle};
  text-align: center;
  padding: 32px 16px;
  margin: 0;
`;

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const ItemTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemTitle = styled.p`
  ${({ theme }) => theme.typography.paragraph1};
  color: ${({ theme }) => theme.color.textDark};
  margin: 0;
`;

const ShallowCopyBadge = styled.span`
  ${({ theme }) => theme.typography.paragraphSmall};
  color: ${({ theme }) => theme.color.borderPrimary};
  background: ${({ theme }) => theme.color.backgroundPinkSubtle};
  padding: 0 4px;
  border-radius: 4px;
  white-space: nowrap;
`;

const ItemDescription = styled.p`
  ${({ theme }) => theme.typography.uiElementSmall};
  color: ${({ theme }) => theme.color.textSubtle};
  margin: 0;
`;

const ItemOpenButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border: none;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  visibility: hidden;

  path {
    fill: ${({ theme }) => theme.color.iconDefault};
  }

  ${Item}:hover & {
    visibility: visible;
  }
`;

function ViewOccurrencesPanel({ occurrences, onOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('embedded');

  return (
    <>
      <Backdrop onClick={onClose} />
      <Panel role="dialog" aria-label="View occurrences">
        <Header>
          <CloseButton type="button" onClick={onClose} aria-label="Close">
            <CloseIcon width={12} height={12} />
          </CloseButton>
          <Title>View occurrences</Title>
        </Header>
        <Tabs>
          <Tab type="button" $active={activeTab === 'trigger'} onClick={() => setActiveTab('trigger')}>
            Trigger
          </Tab>
          <Tab type="button" $active={activeTab === 'embedded'} onClick={() => setActiveTab('embedded')}>
            Embedded in
          </Tab>
        </Tabs>
        {activeTab === 'embedded' && occurrences.length === 0 && (
          <EmptyState>No occurrences found for this guide yet.</EmptyState>
        )}
        {activeTab === 'embedded' && occurrences.length > 0 && (
          <List>
            {occurrences.map((occ) => (
              <Item key={occ.id}>
                <ItemIcon>
                  {occ.isShallowCopy ? (
                    <img src={shallowCopyIcon} alt="" width={16} height={16} />
                  ) : (
                    <GuideColorIcon />
                  )}
                </ItemIcon>
                <ItemBody>
                  <ItemTitleRow>
                    <ItemTitle>{occ.name}</ItemTitle>
                    {occ.isShallowCopy && <ShallowCopyBadge>Shallow Copy</ShallowCopyBadge>}
                  </ItemTitleRow>
                  <ItemDescription>{occ.path}</ItemDescription>
                </ItemBody>
                <ItemOpenButton type="button" onClick={() => onOpen?.(occ)} aria-label={`Open ${occ.name}`}>
                  <OpenIcon />
                </ItemOpenButton>
              </Item>
            ))}
          </List>
        )}
      </Panel>
    </>
  );
}

export default ViewOccurrencesPanel;
