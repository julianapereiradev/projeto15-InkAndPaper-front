export const pages = {
    signIn: '/',
    signUp: '/cadastro',
    home: '/home',
    product: '/produto/',
    shoppingCart: '/carrinho',
    payment: '/pagamento',
    checkout: '/checkout',
    myorders: '/myorders'
}

const API_URL = import.meta.env.VITE_API_URL;

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
    getCheckout: API_URL +'/checkout',
    myOrders: API_URL + '/myorders'
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