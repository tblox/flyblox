export const actionTypes = {
    GET_LANDING_PAGE: "GET_LANDING_PAGE",
    ADD_LANDING_PAGE: "ADD_LANDING_PAGE",
    EDIT_LANDING_PAGE: "EDIT_LANDING_PAGE",
    REMOVE_LANDING_PAGE: "REMOVE_LANDING_PAGE",
    GET_ALL_TEMPLATE: "GET_ALL_TEMPLATE",
    GET_ALL_TEMPLATE_SUCCESS: "GET_ALL_TEMPLATE_SUCCESS",
    GET_ALL_TEMPLATE_FAILED: "GET_ALL_TEMPLATE_FAILED",
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
    SET_CURRENT_SECTION: "SET_CURRENT_SECTION",
}

export function addLandingPage(payload) {
    return { type: actionTypes.ADD_LANDING_PAGE, payload }
}

export function setLandingPage(payload) {
    return { type: actionTypes.GET_LANDING_PAGE, payload }
}

export function editLandingPage(payload) {
    return { type: actionTypes.EDIT_LANDING_PAGE, payload }
}

export function removeLandingPage(payload) {
    return { type: actionTypes.REMOVE_LANDING_PAGE, payload }
}

export function getAllTemplate(payload) {
    return { type: actionTypes.GET_ALL_TEMPLATE, payload }
}

export function getAllTemplateSuccess(payload) {
    return { type: actionTypes.GET_ALL_TEMPLATE_SUCCESS, payload }
}

export function getAllTemplateFailed(payload) {
    return { type: actionTypes.GET_ALL_TEMPLATE_FAILED, payload }
}

export function setCurrentPage(payload) {
    return { type: actionTypes.SET_CURRENT_PAGE, payload }
}

export function setCurrentSection(payload) {
    return { type: actionTypes.SET_CURRENT_SECTION, payload }
}