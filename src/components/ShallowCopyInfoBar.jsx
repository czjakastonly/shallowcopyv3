import styled from 'styled-components';
import GuideLinkIcon from '@stonly/design-system/icons/GuideLink-16';

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.notification};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  background: ${({ theme }) => theme.color.backgroundActive};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrap = styled.div`
  display: flex;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

const Text = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textDefaultInverse};
  margin: 0;
`;

function ShallowCopyInfoBar({ itemName }) {
  return (
    <Bar>
      <Content>
        <IconWrap aria-hidden>
          <GuideLinkIcon />
        </IconWrap>
        <Text>Shallow copy of: &ldquo;{itemName}&rdquo;</Text>
      </Content>
    </Bar>
  );
}

export default ShallowCopyInfoBar;
