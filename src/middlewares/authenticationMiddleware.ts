import dotenv from 'dotenv';
dotenv.config();

export function authenticationMiddleware(token: string | undefined){
    if (!token) return false;
    const regexEspecialC = /[$@%&]/;
    const regexUppercase = /[A-Z]/;
    const regexNumber = /[0-9]/;
    const regexEspecialC_false = regexEspecialC.test(token ? token : '');
    const regexUppercase_false = regexUppercase.test(token ? token : '');
    const regexNumber_false = regexNumber.test(token ? token : '');
    const authentication_equal = token == process.env.TOKEN_AUTHENTICATION;

    return regexEspecialC_false && regexUppercase_false && regexNumber_false && authentication_equal;
}