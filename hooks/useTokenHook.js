
export const useTokenHook  = () => {

    if(typeof window !== 'undefined'){
        return localStorage.getItem('token')
    }

}

export const useTokenAdminHook = () => {
    if(typeof window !== 'undefined'){
        return localStorage.getItem('tokenAdmin')
    }
}