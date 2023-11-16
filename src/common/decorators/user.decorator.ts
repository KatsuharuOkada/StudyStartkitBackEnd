import { createParamDecorator } from '@nestjs/common';
const AuthUser = createParamDecorator((data, req) => req.user);

const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);

export { AuthUser, GqlUser };
