import styled from 'styled-components';
import { ModalWindow, ButtonMinimal, ButtonPrimary } from '@stonly/design-system';
import GuideColorIcon from '@stonly/design-system/icons/Guide-color-16';
import OpenIcon from '@stonly/design-system/icons/Open-16';
import shallowCopyIcon from '../icons/ds-missing/ShallowCopy-16.svg';

const Panel = styled.div`
  width: 560px;
  max-width: calc(100vw - 48px);
  background: ${({ theme }) => theme.color.backgroundDefault};
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 32px 24px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.textDark};
  margin: 0 0 8px;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textDefault};
  margin: 0;
`;

const SectionLabel = styled.p`
  ${({ theme }) => theme.typography.uiElementStrong};
  color: ${({ theme }) => theme.color.textDefault};
  margin: 0;
`;

const ListBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.borderSubtle};
  border-radius: 4px;
  max-height: 320px;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;

  &:hover {
    background: ${({ theme }) => theme.color.backgroundDefaultHover};
  }
`;

const ItemIcon = styled.div`
  display: flex;
  padding-top: 4px;
  flex-shrink: 0;
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

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.color.borderSubtle};
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px 32px;
`;

function GuideInUseModal({ occurrences, onOpen, onCancel }) {
  const count = occurrences.length;

  return (
    <ModalWindow onBackdropClick={onCancel}>
      <Panel role="alertdialog" aria-label="Guide in use">
        <Content>
          <div>
            <Title>Guide in use</Title>
            <Description>
              This guide is currently used inside {count} other guide{count === 1 ? '' : 's'}.
              <br />
              To delete it, you must first remove it from the guides listed below.
            </Description>
          </div>
          <SectionLabel>Embedded in: ({count})</SectionLabel>
          <ListBox>
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
          </ListBox>
        </Content>
        <Divider />
        <Buttons>
          <ButtonMinimal type="button" onClick={onCancel}>
            Cancel
          </ButtonMinimal>
          <ButtonPrimary type="button" disabled>
            Delete
          </ButtonPrimary>
        </Buttons>
      </Panel>
    </ModalWindow>
  );
}

export default GuideInUseModal;
