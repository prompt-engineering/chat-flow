import styled from "@emotion/styled";
import React from "react";
import { Handle, Position } from "reactflow";
import { FormControl, FormLabel, Switch, Input, Button, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import useRfStore from "../store";
import { FlowStep } from "@/flows/types/flow-step";

type TextNodeProps = {
  isConnectable: boolean;
  id: string;
  data: { label: string; step?: FlowStep };
};

function StepNode(props: TextNodeProps) {
  const updateNode = useRfStore((state) => state.updateNodeStep);

  const { isConnectable } = props;
  const defaultValue: FlowStep = props.data.step
    ? props.data.step
    : {
        name: "",
        ask: "",
        response: "",
        hiddenExecute: false,
        markdownEditor: false,
        cachedResponseRegex: "",
        values: {},
        preActions: [],
        postActions: [],
      };

  const formik = useFormik({
    initialValues: defaultValue,
    onSubmit: (values) => {
      // we config to onChange to trigger this method
      updateNode(props.id, values);
    },
  });

  return (
    <TextNodeStyle>
      <Handle type='target' position={Position.Left} isConnectable={isConnectable} />
      <CardTitle>{formik.values.name.length > 0 ? formik.values.name : "Step"}</CardTitle>

      <StyledForm onChange={formik.handleSubmit}>
        <FormControl id='name'>
          <FormLabel>Step Name</FormLabel>
          <Input type='text' name='name' onChange={formik.handleChange} value={formik.values.name} />
        </FormControl>

        <FormControl id='ask'>
          <FormLabel>Ask</FormLabel>
          <Textarea name='ask' onChange={formik.handleChange} value={formik.values.ask} />
        </FormControl>

        <FormControl id='hiddenExecute' display='flex' alignItems='center'>
          <FormLabel flex='1'>Hidden Execute</FormLabel>
          <Switch name='hiddenExecute' onChange={formik.handleChange} isChecked={formik.values.hiddenExecute} />
        </FormControl>

        <FormControl id='markdownEditor' display='flex' alignItems='center'>
          <FormLabel flex='1'>Markdown Editor</FormLabel>
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
      </StyledForm>

      <Handle type='source' position={Position.Right} isConnectable={isConnectable} />
    </TextNodeStyle>
  );
}

const width = 320;

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
  height: 32px;
  line-height: 32px;
  width: ${width - 2}px;
  background: #eee;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #555555;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

const StyledForm = styled.form`
  padding: 10px;
`;

export default StepNode;
