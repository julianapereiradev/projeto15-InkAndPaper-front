export const pages = {
    signIn: '/',
    signUp: '/cadastro',
    home: '/home',
    product: '/produto/',
    shoppingCart: '/carrinho',
    payment: '/pagamento',
    checkout: '/checkout',
}

const API_URL = 'http://localhost:5000';

export const requisitions = {
    postSignUp: API_URL + '/sign-up',
    postSignIn: API_URL + '/sign-in',
    postSignInGoogle: API_URL + '/sign-in/google',
    getProducts: API_URL + '/home',
    getProduct: API_URL + '/product/',
    postShoppingCart: API_URL + '/post-cart/',
    logout: API_URL + '/logout',
    getUserCart: API_URL + '/cart/items',
    removeItems: API_URL + '/cart/items',
    payment: API_URL + '/payment',
    clearCart: API_URL + '/clear/cart',
    getCheckout: API_URL +'/checkout'
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