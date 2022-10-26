import Repository, {
    Local,
    apiUrl,
    baseUrl,
    baseTemplateUrl,
} from "./Repository"

class LandingPageRepository {
    constructor(callback) {
        this.callback = callback
    }

    async getLandingPages() {
        const endPoint = `landingpages`
        const reponse = await Local.get(baseUrl + endPoint)
            .then((response) => {
                return response
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async getLandingPage(payload) {
        const endPoint = `landingpages/${payload}`
        const reponse = await Local.get(baseUrl + endPoint)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async getAllTemplate() {
        const endPoint = `get__template`
        const reponse = await Local.get(baseTemplateUrl + endPoint)
            .then((response) => {
                return response
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async getPageDetails(payload) {
        const endPoint = `/page/${payload.id}`
        const reponse = await Local.get( apiUrl + endPoint)
            .then((response) => {
                return response
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async savePage(payload) {
        console.log("save page", payload)
        const endPoint = `/section/save-changes/${payload.pid}`
        const reponse = await Local.post(apiUrl + endPoint, payload.data)
            .then((response) => {
                return response
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async addLandingPage(payload) {
        const reponse = await Local.post(`${apiUrl}/page/add-page`, payload)
            .then((response) => {
                console.log(response, "response")
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message, data: response.data }
                } else if (response.status === 409){
                    return { status: "Failed", message: response.data.message }
                }
            })
            .catch((error) => {
                console.log(error, "dcsacascfsa")
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }

    async getListLandingPage() {
        const reponse = await Local.get(`${apiUrl}/page/get-all-pages`)
            .then((response) => {
                console.log(response, "response")
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else if (response.status === 409){
                    return { status: "Failed", message: response.data.message }
                }
            })
            .catch((error) => {
                console.log(error, "dcsacascfsa")
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }

    async editLandingPage(payload) {
        const reponse = await Local.patch(`${baseUrl}landingpages/edit/${payload.id}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else {
                    return null
                }
            })
            .catch((error) => {
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }

    async removeLandingPage(payload) {

        const reponse = await Local.delete(`${baseUrl}landingpages/delete/${payload}`)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else {
                    return null
                }
            })
            .catch((error) => {
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }

}

export default new LandingPageRepository()