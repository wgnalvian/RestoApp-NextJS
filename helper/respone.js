
export const respone = (res,status,data = {}, msg = '') => {
    if(status === 200){
        return  res.status(status).json({data, success : msg})
    }

    return res.status(status).json({data,failed : msg})
}