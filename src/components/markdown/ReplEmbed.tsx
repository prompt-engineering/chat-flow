import { ReplService } from "@/flows/repl/ReplService";
import React, { useCallback, useState } from "react";
import { ReplResult } from "@/flows/repl/ascode";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";

export function ReplEmbed({ code, repl }: { code: string; repl: ReplService }) {
  const [result, setResult] = useState<string | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);

  repl.getSubject().subscribe({
    next: (msg: ReplResult) => {
      setResult(JSON.stringify(msg));
      setIsRunning(false);
    },
    error: () => {
      setResult("Error");
      setIsRunning(false);
    },
    complete: () => {
      setIsRunning(false);
    },
  });

  const runAllCell = useCallback(() => {
    setIsRunning(true);
    repl.eval(code, -1);
  }, [setIsRunning, repl]);

  return (
    <Box>
      <Button onClick={runAllCell}>Run</Button>
      {isRunning && <Text>Running...</Text>}
      {result && <Textarea defaultValue={result}></Textarea>}
    </Box>
  );
}
