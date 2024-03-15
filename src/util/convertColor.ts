import { COLORS } from "../constant/const";

const convertColor = (typeName: string): string => {
  return COLORS[typeName];
};

export default convertColor;