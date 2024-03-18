import styled from "styled-components";

interface ChipProps {
  type: string;
  backgroundcolor?: string;
  borderRadius?: number;
}
const ChipContainer = styled.div<{
  backgroundcolor?: string;
  borderradius?: number;
}>`
  padding: 4px 8px;
  display: inline-block;
  background-color: ${(props) =>
    props.backgroundcolor ?? props.theme.default.white};
  border-radius: ${(props) => `${props.borderradius}px` ?? "0px"};

  &:not(:last-child) {
    margin-right: 4px;
  }
`;
const Text = styled.span``;
function Chip({ type, backgroundcolor, borderRadius }: ChipProps) {
  return (
    <ChipContainer
      backgroundcolor={backgroundcolor}
      borderradius={borderRadius}
    >
      <Text>{type}</Text>
    </ChipContainer>
  );
}

export default Chip;
