import pino from 'pino';
import _ from 'lodash';
import config from 'config';
import fastRedact from 'fast-redact';
import pinoMultiStream from 'pino-multi-stream';

function generateRequestLogContext(ctx) {
  return {
    inbound_hostname: ctx.request.ip,
    user_agent: ctx.header['user-agent'],
    url_path: `${ctx.request.method} ${ctx.path}`,
    search: ctx.querystring,
    cdn_ip: ctx.header['x-forwarded-for'],
    request_id: ctx.state.id,
  };
}

const censor = (input) => {
  if (typeof input === 'string' && input.length > 3) {
    return `[masked]${input.substr(0, 2)}****`;
  }
  return '[masked]***';
};

const redact = fastRedact({
  paths: config.get('logging.redact'),
  censor,
});

const serializers = {
  flatten: (input) => {
    if (input && typeof input === 'object') {
      return redact(input);
    }
    return input;
  },
  object: input => input,
};

function generateSerializers(serializerConfig) {
  return _.mapValues(serializerConfig, value => serializers[value]);
}

function configureStream() {
  const streams = [
    { stream: process.stdout },
  ];
  return pinoMultiStream.multistream(streams);
}

const logger = pino({
  name: process.env.npm_package_name,
  redact: {
    paths: config.get('logging.redact'),
    censor,
  },
  serializers: generateSerializers(config.get('logging.serializers')),
}, configureStream());

const loggerMiddleware = async (ctx, next) => {
  const startTime = Date.now();
  const logContext = generateRequestLogContext(ctx);
  ctx.log = logger.child(logContext);
  try {
    await next();
  } finally {
    // if request body not 200, e.g. 404, log error
    const logContent = {
      log_type: 'INBOUND',
      duration: Date.now() - startTime,
      status_code: ctx.status,
      size: ctx.headers['content-length'],
    };

    logContent.duration = Date.now() - startTime;
    logContent.request_body = ctx.request.body;
    logContent.response_body = ctx.body;
    logContent.request_header = ctx.request.headers;
    logContent.response_header = ctx.response.headers;
    if (ctx.status >= 400) {
      ctx.log.warn(logContent, 'Controller Process Failed');
    } else {
      ctx.log.info(logContent, 'Controller Process Success');
    }
  }
};
loggerMiddleware.logger = logger;

export default () => loggerMiddleware;
