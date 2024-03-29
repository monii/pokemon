import styled from "styled-components";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

import Chip from "../../components/common/Chip";
import Evolution from "./components/Evolution";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";
import usePokemonStore from "../../store/pokemon";
import pokemonAPI from "../../api/pokemon";
import { GetPokemonDTO } from "../../types/pokemon";
import { GetPokemonSpeciesDTO } from "../../types/pokemonSpecies";
import {
  convertNameToKoean,
  convertToNumber,
  convertTypeToKoean,
  findColorByType,
} from "../../util/util";
import { BACK_BUTTON_TEXT } from "../../constant/const";

const PokemonDetailContainer = styled.div`
  position: relative;
`;
const PokemonDetailChildren = styled.div`
  padding: 20px;
  max-width: 720px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  border-radius: 10px;
  box-shadow: 0 5px 15px 4px rgb(0 0 0/30%);

  @media (max-width: 390px) {
    position: static;
    top: 0%;
    left: 0%;
    transform: translate(0%, 0%);
  }
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
  width: 250px;
  height: 250px;
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
const Text = styled.p`
  padding-bottom: 12px;
`;
const TypeWrapper = styled.div`
  padding-bottom: 12px;
`;
const BackButtonWrapper = styled.section``;
const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function PokemonDetail() {
  const navigate = useNavigate();
  const { id: pokemonId } = useParams();
  const { setEvolutionId } = usePokemonStore();

  const {
    data: pokemonDetailInfo,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery<GetPokemonDTO>(
    ["getPokemonById", pokemonId],
    () => pokemonAPI.getPokemonById(convertToNumber(pokemonId)),
    {
      enabled: !!pokemonId,
    }
  );

  const {
    data: pokemonSpeciesInfo,
    isLoading: isLoadingSpecies,
    error: speciesError,
  } = useQuery<GetPokemonSpeciesDTO>(
    ["getPokemonSpeciesById", pokemonId],
    () => pokemonAPI.getPokemonSpeciesById(convertToNumber(pokemonId)),
    {
      enabled: !!pokemonId,
      onSuccess: (pokemonSpeciesInfo) =>
        setEvolutionId(pokemonSpeciesInfo.evolution_chain.url),
    }
  );

  const clickBackButton = () => {
    navigate(-1);
  };

  if (isLoadingDetail || isLoadingSpecies) return <Loading />;
  if (detailError || speciesError) return <Error />;

  return (
    <PokemonDetailContainer>
      <PokemonDetailChildren>
        <BackButtonWrapper>
          <BackButton onClick={clickBackButton}>
            <FaLongArrowAltLeft size="40" />
            <p>{BACK_BUTTON_TEXT}</p>
          </BackButton>
        </BackButtonWrapper>
        <ContentSection>
          <ImageSection>
            <ImageWrapper>
              <PokemonImage
                loading="lazy"
                alt={pokemonDetailInfo?.name}
                src={
                  pokemonDetailInfo?.sprites?.other.dream_world.front_default
                }
              />
            </ImageWrapper>
          </ImageSection>
          <InfoWrapper>
            <NameText>{convertNameToKoean(pokemonSpeciesInfo?.names)}</NameText>
            <Text>{`키: ${pokemonDetailInfo?.height}m`}</Text>
            <Text>{`몸무게: ${pokemonDetailInfo?.weight}kg`}</Text>
            <TypeWrapper>
              {pokemonDetailInfo?.types.map((type) => (
                <Chip
                  key={type.type.name}
                  type={convertTypeToKoean(type.type.name)}
                  backgroundcolor={findColorByType(type.type.name)}
                  borderRadius={5}
                />
              ))}
            </TypeWrapper>
            <Evolution />
          </InfoWrapper>
        </ContentSection>
      </PokemonDetailChildren>
    </PokemonDetailContainer>
  );
}

export default PokemonDetail;
