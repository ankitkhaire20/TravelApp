import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
export const screenWidth = width;
export const screenHeight = height;


export const Color = {
    PRMARY_COLOR: '#24BAEC',
    PRIMARY: '#4A90E2', // A calming blue for primary elements like buttons
    SECONDARY: '#50E3C2', // A contrasting teal for secondary elements
    BACKGROUND: '#F5F7FA', // Light gray for background
    TEXT: '#333333', // Dark gray for main text
    SUBTEXT: '#7F8C8D', // Lighter gray for subtext or less emphasized text
    QUOTE_TEXT: '#2C3E50', // Darker shade for the quote itself
    AUTHOR_TEXT: '#8E44AD', // Purple tone for the author's name to give some variation
    BORDER: '#DADFE1', // Light gray for borders or dividers
    ERROR: '#E74C3C', // Red for error messages
    SUCCESS: '#2ECC71', // Green for success messages or notifications
    DISABLED: '#BDC3C7', // Gray for disabled elements
    BUTTON_TEXT: '#FFFFFF', // White for text on buttons
    OVERLAY: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black for overlays
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    LIN_1: '#1c1c1e',
    LIN_2: '#252529',
    LIN_3: '#2d2d34',
};

export const Font = {

    LATO_BOLD: 'Lato-Bold',
    LATO_REGULAR: 'Lato-Regular',
    POPPINS_BOLD: 'Poppins-Bold',
    POPPINS_REGULAR: 'Poppins-Regular',
    SPACEMONO_REGULAR: 'SpceMono-Regular',

    SIZE_10: 10,
    SIZE_12: 12,
    SIZE_13: 13,
    SIZE_14: 14,
    SIZE_15: 15,
    SIZE_16: 16,
    SIZE_18: 18,
    SIZE_20: 20,
    SIZE_22: 22,
    SIZE_24: 24,
    SIZE_26: 26,
    SIZE_28: 28,
    SIZE_30: 30,
    SIZE_32: 32,
    SIZE_36: 36
};





export const REGEX = {
    EMAIL:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    SPECIAL_CHARECTERS: /^[\w&.\-]+$/,
    UPPER_CASE: /[A-Z]|[A-Z]/, // eslint-disable-next-line
    LOWER_CASE: /[a-z]|[a-z]/,
    NAME_NUMBER: /^[A-Za-z0-9]{1}[ A-Za-z0-9,.-]{0,}$/,
    NAME: /^[A-Z a-z,.-]+$/i,
    MIN_NUMBERS: "(^[0][1-9]+)|([1-9]d*)",
    NUMBER: /^[0-9]+$/,
    OTP_NUMBER: /[^0-9]/g,
    SPECIAL_ACCENTED: /^[ a-zA-Z-\u00C0-\u024F\u1E00-\u1EFF-.']+$/i,
    SPECIAL_ACCENTED_NAME:
        /^[ a-zA-Z.’\-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F-\u024F\u1E00-\u1EFF]+$/, //with accent apostrophe
    // SPECIAL_ACCENTED_NAME: /^[ a-zA-Z\u00C0-\u024F\u1E00-\u1EFF']+$/i,
    // SPECIAL_ACCENTED_NAME: /^[ a-zA-Z.'\-\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F-\u024F\u1E00-\u1EFF]+$/,
};