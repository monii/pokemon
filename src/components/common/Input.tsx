import styled from "styled-components";

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  box-sizing: border-box;
`;

function Input({ placeholder, value, onChange }: TextInputProps) {
  return (
    <TextInput placeholder={placeholder} value={value} onChange={onChange} />
  );
}

export default Input;
