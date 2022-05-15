import { Alert } from "react-native";

import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import {
  Container,
  Header,
  Footer,
  Title,
  SignInTitle,
  Logo,
  FooterButtonsWrapper,
} from "./styles";

import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { user, signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível entrar com a conta Google!");
    }
  }

  return (
    <Container>
      <Header>
        <Logo />

        <Title>
          Controle suas {"\n"}
          finanças de forma {"\n"}
          muito simples
        </Title>

        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterButtonsWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterButtonsWrapper>
      </Footer>
    </Container>
  );
}
