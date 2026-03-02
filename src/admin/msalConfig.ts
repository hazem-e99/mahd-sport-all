// MOCKED MSAL CONFIG - Standalone Mode
export const msalInstance = {
  initialize: async () => { },
  handleRedirectPromise: async () => null,
  setActiveAccount: () => { },
  getActiveAccount: () => ({ username: 'mock-user' }),
  addEventCallback: () => { },
  clearCache: () => { },
  acquireTokenSilent: async () => ({ accessToken: 'mock-token' }),
  loginRedirect: async () => console.log('Mock login redirect triggered'),
  logoutRedirect: async () => console.log('Mock logout redirect triggered'),
};

export async function initializeMsal() {
  console.log('MSAL Initialized (Mock)');
}

export const clearAllMSALData = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export async function getAccessTokenFromMSAL(): Promise<string | null> {
  return 'mock-access-token';
}

export const handleLogin = async () => {
  console.log('Handle Login (Mock)');
};

export const handleLogout = async () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/';
};
