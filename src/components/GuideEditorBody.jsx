import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@stonly/design-system/icons/Search-16';
import CopyIcon from '@stonly/design-system/icons/Copy-16';
import DeleteIcon from '@stonly/design-system/icons/Delete-16';
import TagIcon from '@stonly/design-system/icons/Tag-16';
import BoldIcon from '@stonly/design-system/icons/Bold-16';
import ItalicsIcon from '@stonly/design-system/icons/Italics-16';
import UnderlineIcon from '@stonly/design-system/icons/Underline-16';
import TextAlignLeftIcon from '@stonly/design-system/icons/TextAlignLeft-16';
import BulletListIcon from '@stonly/design-system/icons/BulletList-16';
import LinkIcon from '@stonly/design-system/icons/Link-16';
import ImageIcon from '@stonly/design-system/icons/Image-16';
import TipIcon from '@stonly/design-system/icons/Tip-16';
import WarningIcon from '@stonly/design-system/icons/Warning-16';
import QuoteIcon from '@stonly/design-system/icons/Quote-16';
import CodeBlockIcon from '@stonly/design-system/icons/CodeBlock-16';
import MoreIcon from '@stonly/design-system/icons/More-16';

const DUMMY_STEP_CONTENT = [
  {
    title: 'Welcome',
    body: "This is the first step of the guide. It gives users a quick overview of what they're about to learn and sets expectations for the rest of the flow.",
  },
  {
    title: 'Getting set up',
    body: 'Walk the user through any prerequisites or setup steps they need to complete before moving forward, such as creating an account or installing a tool.',
  },
  {
    title: 'Doing the thing',
    body: 'The core instructional content of the guide lives here — a clear, numbered set of actions the user should take, with screenshots or callouts as needed.',
  },
  {
    title: 'Wrapping up',
    body: "A short recap of what was covered, plus a pointer to related guides or a call to action for what to do next.",
  },
  {
    title: 'Troubleshooting',
    body: 'Common issues users might run into at this stage, along with quick fixes or links to support resources.',
  },
];

function buildDummySteps(count) {
  const total = Math.max(count || 3, 1);
  return Array.from({ length: total }, (_, index) => {
    const template = DUMMY_STEP_CONTENT[index % DUMMY_STEP_CONTENT.length];
    return {
      id: index,
      title: total > DUMMY_STEP_CONTENT.length ? `${template.title} ${Math.floor(index / DUMMY_STEP_CONTENT.length) + 1}` : template.title,
      body: template.body,
    };
  });
}

const Body = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
  background: ${({ theme }) => theme.color.backgroundDefault};
`;

const StepsSidebar = styled.div`
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.backgroundDefaultHover};
  border-right: 1px solid ${({ theme }) => theme.color.borderSubtle};
`;

const StepsSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  flex-shrink: 0;

  path {
    fill: ${({ theme }) => theme.color.iconSubtle};
  }
`;

const StepsSearchText = styled.span`
  ${({ theme }) => theme.typography.uiElement};
  color: ${({ theme }) => theme.color.textPlaceholder};
`;

const StepsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StepRow = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? 'rgba(211, 213, 218, 0.3)' : 'transparent')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(211, 213, 218, 0.2);
  }
`;

const StepDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ theme, $active }) => ($active ? theme.color.iconSuccess : theme.color.iconSubtle)};
`;

const StepLabel = styled.span`
  ${({ theme }) => theme.typography.uiElementStrong};
  color: ${({ theme }) => theme.color.textDefault};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddStepFooter = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.borderSubtle};
  background: none;
  cursor: pointer;
  flex-shrink: 0;
  ${({ theme }) => theme.typography.uiElementStrong};
  color: ${({ theme }) => theme.color.textLink};
`;

const StepMain = styled.div`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 24px 48px 40px;
`;

const StepTopIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StepActionsPill = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.color.borderSubtle};
  border-radius: 18px;
`;

const StepActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: none;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.iconDefault};
  }

  &:hover {
    background: ${({ theme }) => theme.color.backgroundDefaultHover};
  }
`;

const StepTagsPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.color.borderSubtle};
  border-radius: 18px;
  ${({ theme }) => theme.typography.uiElementSmall};
  color: ${({ theme }) => theme.color.textSubtle};

  path {
    fill: ${({ theme }) => theme.color.iconSubtle};
  }
`;

const StepTitle = styled.h1`
  ${({ theme }) => theme.typography.h0};
  color: ${({ theme }) => theme.color.textDark};
  margin: 0 0 24px;
`;

const EditorBox = styled.div`
  background: ${({ theme }) => theme.color.backgroundDefault};
  border-radius: 4px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderSubtle};
  overflow-x: auto;
`;

const ToolbarBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border: none;
  border-radius: 4px;
  background: none;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.color.iconDefault};
  }

  &:hover {
    background: ${({ theme }) => theme.color.backgroundDefaultHover};
  }
`;

const ToolbarSep = styled.div`
  width: 1px;
  height: 20px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.color.borderSubtle};
  margin: 0 4px;
`;

const BoxContent = styled.div`
  padding: 8px 16px 24px;
`;

const SectionLabel = styled.p`
  ${({ theme }) => theme.typography.uiElementLabel};
  color: ${({ theme }) => theme.color.textSubtle};
  margin: 0 0 12px;
`;

const StepBodyText = styled.p`
  ${({ theme }) => theme.typography.paragraph1};
  color: ${({ theme }) => theme.color.textDefault};
  margin: 0;
`;

function GuideEditorBody({ item }) {
  const steps = buildDummySteps(item.steps);
  const [activeStepId, setActiveStepId] = useState(steps[0].id);
  const activeStep = steps.find((step) => step.id === activeStepId) || steps[0];

  return (
    <Body>
      <StepsSidebar>
        <StepsSearchBox>
          <SearchIcon />
          <StepsSearchText>Search for step</StepsSearchText>
        </StepsSearchBox>
        <StepsList>
          {steps.map((step, index) => (
            <StepRow
              key={step.id}
              type="button"
              $active={step.id === activeStepId}
              onClick={() => setActiveStepId(step.id)}
            >
              <StepDot $active={step.id === activeStepId} />
              <StepLabel>
                {index + 1}. {step.title}
              </StepLabel>
            </StepRow>
          ))}
        </StepsList>
        <AddStepFooter type="button">+ Add next step</AddStepFooter>
      </StepsSidebar>

      <StepMain>
        <StepTopIcons>
          <StepActionsPill>
            <StepActionButton type="button" aria-label="Duplicate step">
              <CopyIcon />
            </StepActionButton>
            <StepActionButton type="button" aria-label="Delete step">
              <DeleteIcon />
            </StepActionButton>
          </StepActionsPill>
          <StepTagsPill>
            <TagIcon />
            No tags
          </StepTagsPill>
        </StepTopIcons>

        <StepTitle>{activeStep.title}</StepTitle>

        <EditorBox>
          <Toolbar>
            <ToolbarBtn type="button" aria-label="Bold">
              <BoldIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Italics">
              <ItalicsIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Underline">
              <UnderlineIcon />
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn type="button" aria-label="Align">
              <TextAlignLeftIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Bullet list">
              <BulletListIcon />
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn type="button" aria-label="Link">
              <LinkIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Image">
              <ImageIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Tip">
              <TipIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Warning">
              <WarningIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Quote">
              <QuoteIcon />
            </ToolbarBtn>
            <ToolbarBtn type="button" aria-label="Code block">
              <CodeBlockIcon />
            </ToolbarBtn>
            <ToolbarSep />
            <ToolbarBtn type="button" aria-label="More">
              <MoreIcon />
            </ToolbarBtn>
          </Toolbar>
          <BoxContent>
            <SectionLabel>Content</SectionLabel>
            <StepBodyText>{activeStep.body}</StepBodyText>
          </BoxContent>
        </EditorBox>
      </StepMain>
    </Body>
  );
}

export default GuideEditorBody;
