export const mappVariablesToTemplate = (templateString, variables) => {
    if (!templateString || !variables) return ""
    let newTemplate = templateString;
    Object.keys(variables).map(property => {
        newTemplate = newTemplate.replaceAll(`{{${property}}}`, variables[property])
    })
    return newTemplate;
}