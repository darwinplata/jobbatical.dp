import API from './Api';

export const AllSkills = async  => {
    return API.get(`skills`)
};

export const SaveSkill = async skill => {
    return API.post(`skills`,  skill)
};


export const DeleteSkill = async id => {
    return API.delete(`skills/${id}`)
};