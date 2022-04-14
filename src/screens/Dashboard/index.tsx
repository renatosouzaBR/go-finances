import {
  Container,
  Header,
  UserProfile,
  UserPhoto,
  UserGreetings,
  Greeting,
  UserName,
  ExitIcon,
  UserWrapper,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserProfile>
            <UserPhoto
              source={{
                uri: "https://avatars.githubusercontent.com/u/28769727?v=4",
              }}
            />

            <UserGreetings>
              <Greeting>Olá,</Greeting>
              <UserName>Renato</UserName>
            </UserGreetings>
          </UserProfile>

          <ExitIcon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}
