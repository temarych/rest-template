import 'express-async-errors';

import express         from 'express';
import dotenv          from 'dotenv';
import cors            from 'cors';
import { handleError } from '@middleware/error.middleware';
import { authRoute }   from '@modules/auth/auth.route';
import { selfRoute }   from '@modules/self/self.route';

dotenv.config();

export const port = process.env.PORT ?? 3000;
export const app  = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/self', selfRoute);

app.use(handleError);

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
