import React, { useCallback, useState } from "react";
import { Button, Link, Textarea, Text, Flex } from "@chakra-ui/react";

import { ReplService } from "@/flows/unitmesh/ReplService";
import { ReplResult } from "@/flows/unitmesh/ascode";

export function ReplEmbed({ code, repl, index }: { code: string; repl: ReplService; index?: number }) {
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

  function displayResult(result: ReplResult) {
    if (result.content && result.content.hasOwnProperty("url")) {
      const url = (result.content as any)["url"];
      return (
        <Text>
          Online URL:{" "}
          <Link href={url} isExternal={true}>
            {url}
          </Link>
        </Text>
      );
    }

    return <Textarea defaultValue={JSON.stringify(result)}></Textarea>;
  }

  return (
    <Flex flexDirection={"row"} gap={4}>
      <Button onClick={runShell}>Run</Button>
      {isRunning && <Text>Running...</Text>}
      {result && displayResult(result)}
      {error && <Text>{error}</Text>}
    </Flex>
  );
}
