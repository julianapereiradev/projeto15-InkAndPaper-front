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
    postSignIn: API_URL + '/sign-in',
    getProducts: API_URL + '/home',
    getProduct: API_URL + '/product/',
    updateShoppingCart: API_URL + '/update-shopping-cart'
}

export function headersAuth(token) {
    if (!token && localStorage.user) {
        const user = JSON.parse(localStorage.user);
        token = user.token;
    }

    return {headers: {
        'Authorization': `Bearer ${token}`
    }}
}