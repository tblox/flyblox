import {
    Local,
    apiUrl,
} from "./Repository"

class UploadImage {
    constructor(callback) {
        this.callback = callback
    }

    async uploadImage(payload) {
        const data = new FormData();
        data.append('image', payload.image)
        const reponse = await Local.post(`${apiUrl}/image/upload__image`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            }})
            .then((response) => {
                console.log(response, "response")
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message, data: response.data }
                } else if (response.status === 409){
                    return { status: "Failed", message: response.data.message }
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }
}

export default new UploadImage()