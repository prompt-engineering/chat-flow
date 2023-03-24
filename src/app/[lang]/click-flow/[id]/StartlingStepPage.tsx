"use client";

import React, { useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  SimpleGrid,
  Container,
} from "@/components/ChakraUI";
import StartlingStepDetail from "@/app/[lang]/click-flow/[id]/StartlingStepDetail";
import { StartlingFlow } from "@/flows/types/click-flow";
import FlowExplain from "../../../../flows/explain/FlowExplain";
import { ReplService } from "@/flows/unitmesh/ReplService";
import { webSocket } from "rxjs/webSocket";
import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject";
import styled from "@emotion/styled";

type StepPageProps = {
  flow: StartlingFlow;
  id: string;
  i18n: GeneralI18nProps;
};

function StartlingStepPage({ flow, id, i18n }: StepPageProps) {
  const [conversationId, setConversationId] = React.useState<number | undefined>(undefined);
  const [cachedValue, setCachedValue] = React.useState<Record<number, any>>({});

  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const [replService, setReplService] = React.useState<ReplService | undefined>(undefined);
  useEffect(() => {
    if (flow.replService) {
      try {
        const host = process.env.REPL_SERVER ? process.env.REPL_SERVER : "127.0.0.1:8080";
        const subject = webSocket(`ws://${host}/repl`);

        setReplService(new ReplService(subject as WebSocketSubject<any>));
      } catch (e) {
        console.error("Failed to create repl service", e);
      }
    }
  }, []);

  const bottomAnchor = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!flow.stepGuide) {
      return;
    }

    let counter = 0;
    const id = setInterval(() => {
      if (bottomAnchor.current) {
        bottomAnchor.current.scrollIntoView({ behavior: "auto" });
      }

      counter++;
      // animation delay 500ms
      if (counter > 5) {
        clearInterval(id);
      }
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [currentStep]);

  const dict = i18n.i18n.dict;

  const updateCached = (index: number, value: any) => {
    setCachedValue((prev) => ({ ...prev, [index]: value }));
  };

  const updateConversationId = (conversationId: number) => {
    setConversationId(conversationId);
  };

  return (
    <Container marginTop='60px' minW='8xl' p={{ md: "2rem", base: "1rem" }}>
      {flow && (
        <>
          <Flex direction='column'>
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/click-flow/`}>{dict["by-each-step-samples"]}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${i18n.locale}/click-flow/${id}`}>{flow.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            <StyledHeading as='h4'>{flow.name}</StyledHeading>

            {flow.explain && (
              <Box style={{ position: "relative", height: "320px" }}>
                <FlowExplain step={flow} />
              </Box>
            )}

            <SimpleGrid>
              {flow.steps.map(
                (step, index) =>
                  (index <= currentStep || !flow.stepGuide) /** show all if stepGuide is falsey */ && (
                    <StartlingStepDetail
                      index={index}
                      flow={flow}
                      step={step}
                      key={index}
                      replService={replService}
                      onCache={updateCached}
                      cachedValue={cachedValue}
                      conversationId={conversationId}
                      updateConversationId={updateConversationId}
                      onStepComplete={(index) => setCurrentStep(index + 1)}
                    />
                  ),
              )}

              <div ref={bottomAnchor}></div>
            </SimpleGrid>
          </Flex>
        </>
      )}
    </Container>
  );
}

const StyledHeading = styled(Heading)`
  padding: 1rem 0;
  text-align: center;
`;

export default StartlingStepPage;
