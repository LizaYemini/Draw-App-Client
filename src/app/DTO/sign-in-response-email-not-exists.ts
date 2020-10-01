import { SignInRequest } from './sign-in-request';
import { Response } from './server-response';

export class SignInResponseEmailNotExists extends Response {
    request: SignInRequest
}
