import styled from 'styled-components';
import { ButtonPrimary } from '@stonly/design-system';
import ChevronLeftIcon from '@stonly/design-system/icons/ChevronLeft-16';
import GuideLinkIcon from '@stonly/design-system/icons/GuideLink-16';
import EyeIcon from '@stonly/design-system/icons/Eye-16';
import ShareIcon from '@stonly/design-system/icons/Share-16';
import SettingsIcon from '@stonly/design-system/icons/Settings-16';
import MoreIcon from '@stonly/design-system/icons/More-16';
import ChecklistItemIcon from '@stonly/design-system/icons/ChecklistItem-color-16';
import OpenIcon from '@stonly/design-system/icons/Open-16';
import shallowCopyIcon from '../icons/ds-missing/ShallowCopy-XL.svg';

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

const GuideName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  path {
    fill: ${({ theme }) => theme.color.borderPrimary};
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

const TabsSpacer = styled.div`
  flex: 1;
  min-width: 0;
  height: 12px;
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

const DialogCard = styled.div`
  width: 480px;
  max-width: calc(100vw - 48px);
  background: ${({ theme }) => theme.color.backgroundDefault};
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const DialogContent = styled.div`
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

const DialogText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: center;
`;

const DialogTitle = styled.p`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.color.textDark};
  margin: 0;
`;

const DialogBreadcrumb = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textSubtle};
  margin: 0;
`;

const DialogDescription = styled.p`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textDefault};
  margin: 0;
`;

const DialogDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.color.borderSubtle};
`;

const DialogButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 32px;
`;

const DialogButtonIcon = styled.span`
  display: inline-flex;
  margin-right: 8px;

  path {
    fill: ${({ theme }) => theme.color.iconDefaultInverse};
  }
`;

function EditorView({ item, breadcrumb, onBack }) {
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
              <GuideTitle>{item.name}</GuideTitle>
              <ShallowCopyBadge>Shallow copy</ShallowCopyBadge>
            </GuideName>
          </Navigation>
          <SavingChanges>
            <SavingChangesText>Changes auto-saved - 4 minutes ago</SavingChangesText>
            <ChecklistItemIcon />
          </SavingChanges>
        </TopBar>
        <BottomBar>
          <TabsSpacer />
          <Actions>
            <IconButtonGroup>
              <IconButton type="button" aria-label="Preview">
                <EyeIcon />
              </IconButton>
              <IconButton type="button" aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton type="button" aria-label="Settings">
                <SettingsIcon />
              </IconButton>
            </IconButtonGroup>
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
        <DialogCard role="dialog" aria-label={`${item.name} is a shallow copy`}>
          <DialogContent>
            <IconCircle>
              <img src={shallowCopyIcon} alt="" width={40} height={40} />
            </IconCircle>
            <DialogText>
              <DialogTitle>{item.name}</DialogTitle>
              <DialogBreadcrumb>{breadcrumb}</DialogBreadcrumb>
              <DialogDescription>
                This is a shallow copy. To change its content, edit the original guide - updates will apply
                automatically.
              </DialogDescription>
            </DialogText>
          </DialogContent>
          <DialogDivider />
          <DialogButtons>
            <ButtonPrimary type="button" onClick={() => {}}>
              <DialogButtonIcon aria-hidden>
                <OpenIcon />
              </DialogButtonIcon>
              Open original guide
            </ButtonPrimary>
          </DialogButtons>
        </DialogCard>
      </Body>
    </Page>
  );
}

export default EditorView;
