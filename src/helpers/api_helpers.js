import axios from "axios"

// apply base url for axios
const API_URL = process.env.API_URL ?? '/api';

const axiosApi = axios.create({
    baseURL: API_URL,
    timeout: 10000,
})

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

axiosApi.interceptors.request.use(async (config) => {
    const customHeaders = {};
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
        customHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return {
        ...config,
        headers: {
            ...customHeaders,  // auto attach token
            ...config.headers, // but you can override for some requests
        }
    };
});

export default axiosApi;

export async function get(url, config = {}) {
    // eslint-disable-next-line no-return-await
    return await axiosApi.get(url, {...config}).then(response => response.data)
}

// export async function getBlob(url, config = {}) {
//     // eslint-disable-next-line no-return-await
//     return await axiosApi.get(url, {...config}).then(response => response)
// }

export async function post(
    url,
    data,
    config = {}
) {
    console.log("axios", data)
    return axiosApi.post(url, data, {...config}).then(response => response.data)
}

export async function postMultipart(
    url,
    data,
    config = {}
) {
    console.log("axios", data)
    return axiosApi.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...config
        },
    }).then(response => response.data)
}

export async function put(url, data, config = {}) {
    return axiosApi
        .put(url, {...data}, {...config})
        .then(response => response.data)
}

export async function del(url, config = {}) {
    // eslint-disable-next-line no-return-await
    return await axiosApi
        .delete(url, {...config})
        .then(response => response.data)
}

//-------------------------------------------------------------
