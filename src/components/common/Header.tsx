import styled from "styled-components";

import headerImage from "../../assets/image/header-img.png";

const HeaderContaienr = styled.header`
  display: flex;
  justify-content: center;
`;
const ImageWrapper = styled.div`
  width: 15rem;
`;
const HeaderImage = styled.img`
  width: 100%;
`;

function Header() {
  return (
    <HeaderContaienr>
      <ImageWrapper>
        <HeaderImage alt="헤더로고" src={headerImage} />
      </ImageWrapper>
    </HeaderContaienr>
  );
}

export default Header;
