import { createParamDecorator } from '@nestjs/common';
const AuthUser = createParamDecorator((data, req) => req.user);

const currentUser = createParamDecorator((data, [root, args, ctx, info]) => {
  return ctx.req.user;
});

export { AuthUser, currentUser };
