import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Container, ImageWrapper, Title } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton(props: Props) {
  const { title, svg: SvgImage, ...rest } = props;

  return (
    <Container {...rest}>
      <ImageWrapper>
        <SvgImage />
      </ImageWrapper>

      <Title>{title}</Title>
    </Container>
  );
}
