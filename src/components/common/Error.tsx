import styled from "styled-components";
import { ERROR_TEXT } from "../../constant/const";

const ErrorContainer = styled.div``;
const ErrorText = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
`;
function Error() {
  return (
    <ErrorContainer>
      <ErrorText>{ERROR_TEXT}</ErrorText>
    </ErrorContainer>
  );
}

export default Error;
