import { renderHook, act } from "@testing-library/react-hooks";

import { AuthProvider, useAuth } from "./auth";

jest.mock("expo-auth-session", () => ({
  startAsync: () => ({
    type: "success",
    params: {
      access_token: "google_token",
    },
  }),
}));

describe("Auth hook", () => {
  it("should be able to sign in with Google account", async () => {
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
});
