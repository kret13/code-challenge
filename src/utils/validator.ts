import { LETTERS, VALID_CHARS } from "./constants";

export const isCharValid = (char: string): boolean => !!char?.match(VALID_CHARS);
export const isLetter = (char: string): boolean => !!char?.match(LETTERS);
