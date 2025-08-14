import axios from 'axios';

export const getUserCountry = async () => {
    const { data } = await axios.get('https://www.iplocate.io/api/lookup');
    return data.country;
};
