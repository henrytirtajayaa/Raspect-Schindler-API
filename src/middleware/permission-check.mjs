import {newEnforcer, StringAdapter} from 'casbin';
import {existsSync} from "fs";
import {resolve} from "path";

const permissionCheckMiddleware = function(actionName) {
    return async (ctx, next) => {
        if (!ctx.state.user) {
            ctx.throw(401, 'Missing Authorization Info');
        } else if (ctx.state.user && !ctx.state.user.policy) {
            ctx.throw(403, 'Missing permission info');
        } else {
            const adapter = new StringAdapter(ctx.state.user.policy);
            const enforcer = await newEnforcer('config/auth-model.conf', adapter);
            const subject = ctx.state.user.id;
            const pattern = /\/[a-z]*\/api\/v1\/([a-z]+)\/([a-zA-Z0-9]+)\/(.*)/;
            const matchResult = ctx.request.path.match(pattern);
            let domain = `${matchResult[1]}-${matchResult[2]}`;
            console.log(JSON.stringify(ctx.state.user));
            if (ctx.state.user.powerUser) {
                domain = `${matchResult[1]}-*`;
            }
            const resources = matchResult[3];
            const action = ctx.request.method;
            const isAllowed = await enforcer.enforce(subject, domain, resources, action);
            console.log(ctx.state.user.policy);
            console.log(`${subject} ${domain} ${resources} ${action} ${isAllowed}`);
            if (!isAllowed) {
                ctx.throw(403, 'User not authorized to perform action');
            }
            return next();
        }
    };
}

export default permissionCheckMiddleware;