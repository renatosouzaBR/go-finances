import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  userStoragedLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): void;
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
  const [userStoragedLoading, setUserStoragedLoading] = useState(true);
  const userStoragedKey = "@gofinances:user";

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
        await AsyncStorage.setItem(userStoragedKey, JSON.stringify(userLogged));
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

      const name = credential.fullName?.givenName!;
      const userLogged = {
        id: credential.user,
        name,
        email: credential.email!,
        photo: `https://ui-avatars.com/api/?name=${name}&length=1`,
      };

      setUser(userLogged);
      await AsyncStorage.setItem(userStoragedKey, JSON.stringify(userLogged));
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function loadUserStoraged() {
    const userStoraged = await AsyncStorage.getItem(userStoragedKey);

    if (userStoraged) {
      const userLogged = JSON.parse(userStoraged) as User;
      setUser(userLogged);
    }

    setUserStoragedLoading(false);
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStoragedKey);
  }

  useEffect(() => {
    loadUserStoraged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStoragedLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
