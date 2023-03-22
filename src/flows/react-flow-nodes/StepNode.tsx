import styled from "@emotion/styled";
import React from "react";
import { Handle, Position } from "reactflow";
import { FormControl, FormLabel, Switch, Input, Button } from "@chakra-ui/react";
import { useFormik } from "formik";

type TextNodeProps = {
  isConnectable: boolean;
  data: { label: string };
};

function StepNode(props: TextNodeProps) {
  const { isConnectable } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      ask: "",
      hiddenExecute: false,
      markdownEditor: false,
      cachedResponseRegex: "",
      values: [],
      preActions: [],
      postActions: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <TextNodeStyle>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <CardTitle>Step</CardTitle>

      <form onSubmit={formik.handleSubmit}>
        <FormControl id='name'>
          <FormLabel>Name</FormLabel>
          <Input type='text' name='name' onChange={formik.handleChange} value={formik.values.name} />
        </FormControl>

        <FormControl id='ask'>
          <FormLabel>Ask</FormLabel>
          <Input type='text' name='ask' onChange={formik.handleChange} value={formik.values.ask} />
        </FormControl>

        <FormControl id='hiddenExecute'>
          <FormLabel>Hidden Execute</FormLabel>
          <Switch name='hiddenExecute' onChange={formik.handleChange} isChecked={formik.values.hiddenExecute} />
        </FormControl>

        <FormControl id='markdownEditor'>
          <FormLabel>Markdown Editor</FormLabel>
          <Switch name='markdownEditor' onChange={formik.handleChange} isChecked={formik.values.markdownEditor} />
        </FormControl>

        <FormControl id='cachedResponseRegex'>
          <FormLabel>Cached Response Regex</FormLabel>
          <Input
            type='text'
            name='cachedResponseRegex'
            onChange={formik.handleChange}
            value={formik.values.cachedResponseRegex}
          />
        </FormControl>

        <Button type='submit'>Submit</Button>
      </form>

      <Handle type='source' position={Position.Right} isConnectable={isConnectable} />
    </TextNodeStyle>
  );
}

const width = 240;

const TextNodeStyle = styled.div`
  min-height: 50px;
  width: ${width}px;
  border: 1px solid #555;
  border-radius: 5px;
  background: white;
  font-family: jetbrains-mono, "JetBrains Mono", monospace;
`;

const CardTitle = styled.div`
  display: block;
  height: 30px;
  width: ${width - 2}px;
  background: #eee;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #555555;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;

export default StepNode;
