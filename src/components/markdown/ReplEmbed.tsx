import { ReplService } from "@/flows/unitmesh/ReplService";
import React, { useCallback, useState } from "react";
import { ReplResult } from "@/flows/unitmesh/ascode";
import { Button, Link, SimpleGrid, Textarea, Text, Grid, Flex } from "@chakra-ui/react";

export function ReplEmbed({ code, repl }: { code: string; repl: ReplService }) {
  const [result, setResult] = useState<ReplResult | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  repl.getSubject().subscribe({
    next: (msg: ReplResult) => {
      setResult(msg);
      setIsRunning(false);
    },
    error: () => {
      setError("Error");
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


  function displayResult(result: ReplResult) {
    if (result.content && result.content.hasOwnProperty("url")) {
      const url = (result.content as any)["url"];
      return <Text>Online URL: <Link href={ url } isExternal={ true }>{ url }</Link></Text>;
    }

    return <Textarea defaultValue={ JSON.stringify(result) }></Textarea>;
  }

  return (
    <Flex flexDirection={"row"} gap={ 4 }>
      <Button onClick={ runAllCell }>Run</Button>
      { isRunning && <Text>Running...</Text> }
      { result && displayResult(result) }
      { error && <Text>{ error }</Text> }
    </Flex>
  );
}
