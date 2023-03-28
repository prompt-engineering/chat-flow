import React, { useCallback, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

import { ReplService } from "@/flows/unitmesh/ReplService";
import { ReplResult } from "@/flows/unitmesh/ascode";
import { UnitResultDispatcher } from "@/components/UnitRuntime/UnitResultDispatcher";

export function UnitRenderer({ code, repl, index }: { code: string; repl: ReplService; index?: number }) {
  const [result, setResult] = useState<ReplResult | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  repl.getSubject().subscribe({
    next: (msg: ReplResult) => {
      if (msg.id == index) {
        setResult(msg);
        setIsRunning(false);
      }
    },
    error: () => {
      setError("Error");
      setIsRunning(false);
    },
    complete: () => {
      setIsRunning(false);
    },
  });

  const runShell = useCallback(() => {
    setIsRunning(true);
    repl.eval(code, index ?? 0);
  }, [setIsRunning, repl]);

  return (
    <Flex flexDirection={"column"} gap={4}>
      <Button onClick={runShell}>Run</Button>
      {isRunning && <Text>Running...</Text>}
      {result && UnitResultDispatcher(result)}
      {error && <Text>{error}</Text>}
    </Flex>
  );
}
