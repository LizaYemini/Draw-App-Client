import { SignInRequest } from './sign-in-request';
import { Response } from './server-response';

export class SignInResponseOk extends Response {
    request: SignInRequest
}
