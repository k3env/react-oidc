import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from "oidc-client-ts";

export default class AuthService {
  userManager: UserManager;

  constructor() {
    const baseUrl = "https://smt.koven.tech";

    const settings: UserManagerSettings = {
      authority: "https://sso.koven.tech/2fd9e0ce-b8ef-fef7-ceb8-5a0824c2c1f9/",
      client_id: "6e4c84bc-f7ce-4163-b72c-ed5e28063fdf",
      redirect_uri: `${baseUrl}/openid/callback`,
      client_secret: "haerx-MzeCeERPpJBBAmfpm3O4jrIDE6l77Nii7yQSY",
      post_logout_redirect_uri: `${baseUrl}/`,
      response_type: "code",
      loadUserInfo: true,
      scope: "openid profile email", // offline_access roles picture",
      stateStore: new WebStorageStateStore({ store: window.localStorage }),
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public loginCallback(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
