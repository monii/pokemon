import { useQuery } from "react-query";
import pokemonAPI from "../../api/pokemon";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import Chip from "../../components/common/Chip";
import { GetPokemonDTO } from "../../types/pokemon";
import Evolution from "./components/Evolution";
import usePokemonStore from "../../store/pokemon";
import { GetPokemonSpeciesDTO } from "../../types/pokemonSpecies";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { convertToNumber, findColorByType } from "../../util/utile";

const PokemonDetailContainer = styled.div<{ bordercolor: string }>`
  padding: 12px 20px;
  max-width: 720px;
  border-radius: 10px;
  box-shadow: 0 5px 15px 4px rgb(0 0 0/30%);
`;
const ContentSection = styled.section`
  display: flex;
  justify-content: center;

  @media (max-width: 390px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ImageSection = styled.section``;
const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;
const PokemonImage = styled.img`
  width: 80%;
`;
const InfoWrapper = styled.section``;
const NameText = styled.p`
  padding-bottom: 12px;
  font-size: 1.4rem;
  font-weight: bold;
`;
const TypeWrapper = styled.div`
  padding-bottom: 12px;
`;
const BackButtonWrapper = styled.section``;
const BackButton = styled.button``;

function PokemonDetail() {
  const navigate = useNavigate();
  const { id: pokemonId } = useParams();
  const { setEvolutionId } = usePokemonStore();
  const { data: pokemonDetailInfo } = useQuery<GetPokemonDTO>(
    ["getPokemonById", pokemonId],
    () => pokemonAPI.getPokemonById(convertToNumber(pokemonId)),
    {
      enabled: !!pokemonId,
    }
  );

  const { data: speciesInfo } = useQuery<GetPokemonSpeciesDTO>(
    ["getPokemonSpeciesById", pokemonId],
    () => pokemonAPI.getPokemonSpeciesById(convertToNumber(pokemonId)),
    {
      enabled: !!pokemonId,
      onSuccess: (speciesInfo) =>
        setEvolutionId(speciesInfo.evolution_chain.url),
    }
  );

  const clickBackButton = () => {
    navigate(-1);
  };

  return (
    <PokemonDetailContainer
      bordercolor={findColorByType(
        pokemonDetailInfo?.types[0].type.name || "default"
      )}
    >
      <BackButtonWrapper>
        <BackButton>
          <FaLongArrowAltLeft size="40" onClick={clickBackButton} />
        </BackButton>
      </BackButtonWrapper>
      <ContentSection>
        <ImageSection>
          <ImageWrapper>
            <PokemonImage
              loading="lazy"
              alt={pokemonDetailInfo?.name}
              src={pokemonDetailInfo?.sprites?.other.dream_world.front_default}
            />
          </ImageWrapper>
        </ImageSection>
        <InfoWrapper>
          <NameText>{pokemonDetailInfo?.name}</NameText>
          <TypeWrapper>
            {pokemonDetailInfo?.types.map((type) => (
              <Chip
                type={type.type.name}
                backgroundcolor={findColorByType(type.type.name)}
                borderRadius={5}
              />
            ))}
          </TypeWrapper>

          <Evolution />
        </InfoWrapper>
      </ContentSection>
    </PokemonDetailContainer>
  );
}

export default PokemonDetail;
