import axios from 'axios';

interface CountryLookupResponse {
    country?: string;
}

export const USER_COUNTRY_STORAGE_KEY = 'userCountry';
export const COUNTRY_FALLBACK_LABEL = 'your country';

export const getUserCountry = async (): Promise<string | null> => {
    const { data } = await axios.get('https://www.iplocate.io/api/lookup');
    const country = (data as CountryLookupResponse).country?.trim();
    return country || null;
};
