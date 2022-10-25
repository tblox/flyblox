export const mappVariablesToTemplate = (templateString, variables) => {
    let newTemplate = templateString;
    Object.keys(variables).map(property => {
        newTemplate = newTemplate.replaceAll(`{{${property}}}`, variables[property])
    })
    return newTemplate;
}