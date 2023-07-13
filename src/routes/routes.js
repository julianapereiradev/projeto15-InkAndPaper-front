export const pages = {
    signIn: '/',
    signUp: '/cadastro',
    home: '/home',
    product: '/produto/',
    shoppingCart: '/carrinho',
    checkout: '/pagamento'
}

const API_URL = 'http://localhost:5000';

export const requisitions = {
    postSignUp: API_URL + '/sign-up',
    postSignIn: API_URL + '/sign-in'
}

export function headersAuth(token) {
    return {headers: {
        'Authorization': `Bearer ${token}`
    }}
}