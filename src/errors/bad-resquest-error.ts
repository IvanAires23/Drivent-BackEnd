import { ApplicationError } from '@/protocols';

export function badRequest(): ApplicationError {
    return {
        name: 'BAD_REQUEST',
        message: 'No result for this search!',
    };
}
