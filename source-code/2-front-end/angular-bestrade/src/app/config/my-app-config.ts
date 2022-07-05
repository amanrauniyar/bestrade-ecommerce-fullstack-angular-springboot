// Removed the interface keyworf and name to do default export of JSON structure
export default { 
    oidc: {
        // Client ID is public identifier of client app
        clientId: '0oa5o6ljj62X46ucM5d7',
        // Issuer of tokens with URL when authorizing with Okta Authorization Server.
        issuer: 'https://dev-34621509.okta.com/oauth2/default',
        // Redirect URI is the URL sent to user when user log in. 
        redirectUri: 'http://localhost:4200/login/callback',
        // Scope provide access to information about a user.
        scopes: ['openid', 'profile', 'email']
        /* openid: required for authentication requests
           profile: user's firstname, lastname, email, phone etc
           email: user's email address */ 
    }
}
