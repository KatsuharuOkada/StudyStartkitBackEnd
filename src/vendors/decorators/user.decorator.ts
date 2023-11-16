import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const AuthUser = createParamDecorator((data, req) => req.user);

const GqlUser = createParamDecorator((data, [root, args, ctx, info]) => {
  return ctx.req.user;
});

const CurrentLineUser = createParamDecorator((data, context) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

export { AuthUser, GqlUser, CurrentLineUser };
