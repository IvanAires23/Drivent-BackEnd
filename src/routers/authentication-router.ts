import { Router } from 'express';
import { authenticationController } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), authenticationController.singInPost);

export { authenticationRouter };
