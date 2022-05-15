import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

interface AuthContextProps {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

interface GoogleAuthProps {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle() {
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    try {
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as GoogleAuthProps;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          "@gofinances:user",
          JSON.stringify(userLogged)
        );
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      const userLogged = {
        id: credential.user,
        name: credential.fullName?.givenName!,
        email: credential.email!,
        photo: undefined,
      };

      setUser(userLogged);
      await AsyncStorage.setItem(
        "@gofinances:user",
        JSON.stringify(userLogged)
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
