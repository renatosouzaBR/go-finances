import { SvgProps } from "react-native-svg";

import { Container, ImageWrapper, Title } from "./styles";

interface Props {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton(props: Props) {
  const { title, svg: SvgImage } = props;

  return (
    <Container>
      <ImageWrapper>
        <SvgImage />
      </ImageWrapper>

      <Title>{title}</Title>
    </Container>
  );
}
