import styled from 'styled-components';
import { ModalWindow, ButtonOutline, ButtonPrimary } from '@stonly/design-system';
import DeleteIcon from '@stonly/design-system/icons/Delete-16';

const Panel = styled.div`
  width: 480px;
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
  align-items: center;
  gap: 32px;
  padding: 40px 32px;
`;

const IconCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.backgroundDangerSubtle};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  path {
    fill: ${({ theme }) => theme.color.iconDanger};
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: center;
`;

const Title = styled.p`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.textDark};
  margin: 0;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textDefault};
  margin: 0;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.color.borderSubtle};
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 32px;
`;

function DeleteShallowCopyModal({ item, onConfirm, onCancel }) {
  const itemTypeLabel = item.type === 'checklist' ? 'checklist' : 'guide';

  return (
    <ModalWindow onBackdropClick={onCancel}>
      <Panel role="alertdialog" aria-label="Delete selected item?">
        <Content>
          <IconCircle aria-hidden>
            <DeleteIcon />
          </IconCircle>
          <Text>
            <Title>Delete selected item?</Title>
            <Description>1 {itemTypeLabel} will be moved to the recycle bin for 14 days.</Description>
          </Text>
        </Content>
        <Divider />
        <Buttons>
          <ButtonOutline type="button" onClick={onCancel}>
            Cancel
          </ButtonOutline>
          <ButtonPrimary type="button" onClick={onConfirm}>
            Confirm
          </ButtonPrimary>
        </Buttons>
      </Panel>
    </ModalWindow>
  );
}

export default DeleteShallowCopyModal;
