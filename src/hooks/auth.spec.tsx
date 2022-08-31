import { renderHook, act } from "@testing-library/react-hooks";
import * as AuthSession from "expo-auth-session";

import { AuthProvider, useAuth } from "./auth";

describe("Auth hook", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("should be able to sign in with Google account", async () => {
    jest.spyOn(AuthSession, "startAsync").mockResolvedValue({
      type: "success",
      params: {
        access_token: "google_token",
      },
    } as any);

    const fetchJson = jest.fn().mockResolvedValue({
      id: "id",
      given_name: "name",
      email: "email",
      picture: "picture",
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: fetchJson,
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });

  it("user should not be loaded when Google sign in is canceled", async () => {
    jest.spyOn(AuthSession, "startAsync").mockResolvedValue({
      type: "cancel",
    } as any);
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
