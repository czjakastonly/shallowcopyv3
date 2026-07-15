import styled from 'styled-components';
import { ModalWindow, ButtonPrimary } from '@stonly/design-system';
import OpenIcon from '@stonly/design-system/icons/Open-16';
import shallowCopyIcon from '../icons/ds-missing/ShallowCopy-XL.svg';

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
  background: ${({ theme }) => theme.color.backgroundPinkSubtle};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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

const Breadcrumb = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textSubtle};
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
  padding: 24px 32px;
`;

const OpenButtonIcon = styled.span`
  display: inline-flex;
  margin-right: 8px;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

function ShallowCopyRestrictedModal({ item, breadcrumb, onOpenOriginal, onClose }) {
  return (
    <ModalWindow onBackdropClick={onClose}>
      <Panel role="dialog" aria-label={`${item.name} is a shallow copy`}>
        <Content>
          <IconCircle>
            <img src={shallowCopyIcon} alt="" width={40} height={40} />
          </IconCircle>
          <Text>
            <Title>{item.name}</Title>
            <Breadcrumb>{breadcrumb}</Breadcrumb>
            <Description>
              This is a shallow copy. To change its content, edit the original guide - updates will apply
              automatically.
            </Description>
          </Text>
        </Content>
        <Divider />
        <Buttons>
          <ButtonPrimary onClick={onOpenOriginal}>
            <OpenButtonIcon aria-hidden>
              <OpenIcon />
            </OpenButtonIcon>
            Open original guide
          </ButtonPrimary>
        </Buttons>
      </Panel>
    </ModalWindow>
  );
}

export default ShallowCopyRestrictedModal;
