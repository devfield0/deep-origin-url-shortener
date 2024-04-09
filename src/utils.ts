import { v4 as uuidv4 } from 'uuid';
import validUrl from 'valid-url';

export const generateSlug = (): string => {
  return uuidv4().substring(0, 6);
};

// Validate URL
export const isValidUrl = (url: string): boolean => {
  return validUrl.isUri(url) !== undefined ? true : false;
};
