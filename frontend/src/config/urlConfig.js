const baseUrl = "http://localhost:7600";

export const api = `${baseUrl}/api`;


export const generatePublicUrl = (fileName) => {
    
    return `${baseUrl}${fileName}`;
};
