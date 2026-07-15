import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@stonly/design-system/icons/CheckCircle-16';
import CloseIcon from '@stonly/design-system/icons/Close-16';

const Container = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: ${({ theme }) => theme.zIndex.notification};
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  min-width: 380px;
  max-width: 527px;
  background-color: ${({ theme }) => theme.color.textDark};
  border-radius: 4px;
  border-left: 4px solid ${({ theme }) => theme.color.borderSuccess};
  box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
  transform: translateY(${({ $visible }) => ($visible ? '0' : '100px')});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const IconWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  padding-top: 2px;

  path {
    fill: ${({ theme }) => theme.color.borderSuccess};
  }
`;

const Content = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textDefaultInverse};
`;

const ActionButton = styled.button`
  ${({ theme }) => theme.typography.uiElementSmallStrong};
  flex-shrink: 0;
  cursor: pointer;
  background: none;
  color: ${({ theme }) => theme.color.textDefaultInverse};
  border: 1px solid ${({ theme }) => theme.color.borderDefaultHover};
  border-radius: 50px;
  padding: 6px 12px;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.color.textPlaceholder};
    border-color: ${({ theme }) => theme.color.borderDefaultHover};
  }
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
  border: none;
  background: none;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.iconSubtle};
    transition: fill 0.2s;
  }

  &:hover path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

function ShallowCopyToast({ message, actionLabel, onActionClick, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const autoDismissRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    autoDismissRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(), 300);
    }, 5000);
    return () => clearTimeout(autoDismissRef.current);
  }, [onDismiss]);

  const handleDismissClick = () => {
    clearTimeout(autoDismissRef.current);
    setVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  return (
    <Container $visible={visible}>
      <IconWrap aria-hidden>
        <CheckCircleIcon />
      </IconWrap>
      <Content>{message}</Content>
      {actionLabel && onActionClick && (
        <ActionButton type="button" onClick={onActionClick}>
          {actionLabel}
        </ActionButton>
      )}
      <CloseButton type="button" onClick={handleDismissClick} aria-label="Dismiss" title="Dismiss">
        <CloseIcon />
      </CloseButton>
    </Container>
  );
}

export default ShallowCopyToast;
