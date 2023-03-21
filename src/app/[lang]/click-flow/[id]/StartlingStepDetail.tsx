"use client";

import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Flex } from "@chakra-ui/react";

import { HumanBlock } from "@/components/chatgpt/HumanBlock";
import { AiBlock } from "@/components/chatgpt/AiBlock";
import { Avatar, Box } from "@/components/ChakraUI";
import SimpleMarkdown from "@/components/markdown/SimpleMarkdown";
import { ChatGptIcon } from "@/components/CustomIcon";
import { StartlingFlow } from "@/flows/types/click-flow";
import { ResponseSend } from "@/pages/api/chatgpt/chat";
import ExecutePromptButton from "@/components/ClickPrompt/ExecutePromptButton";
import { AskRenderer } from "@/app/[lang]/click-flow/[id]/AskRenderer";
import CopyComponent from "@/components/CopyComponent";
import PostFlowAction from "@/flows/components/PostFlowAction";
import PreFlowAction from "@/flows/components/PreFlowAction";
import { fillStepWithValued, FlowStep } from "@/flows/types/flow-step";
import { ReplService } from "@/flows/repl/ReplService";

type StepProps = {
  index: number;
  step: FlowStep;
  flow: StartlingFlow;
  cachedValue: Record<number, any>;
  onCache?: (step: number, response: string) => void;
  conversationId?: number;
  updateConversationId?: (conversationId: number) => void;
  onStepComplete: (step: number) => void;

  replService?: ReplService | undefined;
};

function StartlingStepDetail({
  index,
  step,
  flow,
  onCache,
  cachedValue,
  conversationId,
  updateConversationId,
  onStepComplete,
  replService,
}: StepProps) {
  const [response, setResponse] = React.useState<string | undefined>(undefined);

  const handleResponse = (response: ResponseSend) => {
    const assistantMessage = response.filter((message) => message.role === "assistant");
    const assistantResponse = assistantMessage[0].content;
    setResponse(assistantResponse);
    onStepComplete(index);

    if (!onCache || !step.cachedResponseRegex) {
      return;
    }

    // todo: check why regex not working well?
    const isMatchAll = step.cachedResponseRegex === ".*" || step.cachedResponseRegex === "(.*?)";
    if (isMatchAll) {
      onCache(index, assistantResponse);
    } else {
      const regex = new RegExp(step.cachedResponseRegex);
      const matched = assistantResponse.match(regex);
      if (matched) {
        onCache(index, matched[1]);
      }
    }
  };

  const [ask, setAsk] = React.useState<string>(step.ask);

  useEffect(() => {
    const askTask = fillStepWithValued(step, cachedValue);
    if (askTask.replaced) {
      setAsk(askTask.ask);
    }
  }, [cachedValue]);

  const updateValue = (response: string) => {
    if (onCache) {
      onCache(index, response);
    }
  };

  return (
    <AnimatedStepContainer>
      <StyledStepHeading>
        Step {index + 1}. {step.name}
      </StyledStepHeading>
      <HumanBlock direction='row' justify='space-between'>
        <Avatar bg='teal.500' name={flow.author} size='sm' mr={2} />
        <Box w='100%' h='100%'>
          <AskRenderer step={step} onAskUpdate={setAsk} cachedValue={cachedValue} replService={replService} />
        </Box>
        <CopyComponent value={step.ask} />
      </HumanBlock>
      {(!response || /** disable if stepGuide is false */ !flow.stepGuide) && !step.hiddenExecute && (
        <Flex flexDirection={"row"} gap={4} padding={8}>
          {step.preActions?.length > 0 && (
            <>
              {step.preActions.map((action, key) => (
                <PreFlowAction action={action} key={key} onResponse={updateValue} />
              ))}
            </>
          )}
          <ExecutePromptButton
            text={ask}
            name={flow.name}
            handleResponse={handleResponse}
            conversationId={conversationId}
            updateConversationId={updateConversationId}
          />
        </Flex>
      )}
      {!step.hiddenExecute && (
        <AiBlock direction='row' gap='2'>
          <Box>
            <ChatGptIcon />
          </Box>
          {response && (
            <>
              <Box gap='2' ml='2' flex='1'>
                <SimpleMarkdown content={response} />
              </Box>
              <CopyComponent value={response} />
            </>
          )}
        </AiBlock>
      )}
      {response && step.preActions?.length > 0 && (
        <>
          {step.preActions.map((action, key) => (
            <PostFlowAction action={action} response={response} key={key} />
          ))}
        </>
      )}
    </AnimatedStepContainer>
  );
}

const StyledStepHeading = styled.h4`
  font-size: 1.5rem;
  padding: 1rem 0;
`;

// ref: https://codepen.io/kiruu/pen/XWdYrEa
const AnimatedStepContainer = styled.div`
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 500ms;
  animation-name: fadeInLeft;
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
      transform: none;
    }
  }
`;

export default StartlingStepDetail;
