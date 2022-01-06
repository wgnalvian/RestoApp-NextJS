
export const useFetchHook = async(url, data, method) => {
    let res = await fetch(url,{
        body : JSON.stringify(data),
        method,
      
    })

    res = await res.json()

    return res
}

