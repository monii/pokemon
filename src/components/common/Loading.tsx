import styled from "styled-components";
import { LOADIN_TEXT } from "../../constant/const";

const LoadingContainer = styled.div``;
const LoadingText = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
`;

function Loading() {
  return (
    <LoadingContainer>
      <LoadingText>{LOADIN_TEXT}</LoadingText>
    </LoadingContainer>
  );
}

export default Loading;
