const user = {
    state: {
        accessToken: localStorage.getItem('accessToken') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
    },

    actions: {
        
    },
    mutations: {
        SET_ACCESSTOKEN: (state, accessToken) => {
            state.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken)
        },
        SET_REFRESHTOKEN: (state, refreshToken) => {
            state.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken)
        },
    }

}
export default user