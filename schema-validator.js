import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const repositorySchema = {
  type: 'object',
  required: ['name', 'category', 'description', 'language', 'stars', 'updated', 'status', 'githubUrl'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1 },
    category: {
      type: 'string',
      enum: ['Core Empire', 'Creative', 'Dev Tools', 'Social']
    },
    description: { type: 'string' },
    language: { type: 'string' },
    stars: { type: 'number', minimum: 0 },
    updated: { type: 'string' },
    status: { type: 'string', enum: ['active', 'development', 'maintenance', 'Active', 'Development', 'Maintenance'] },
    githubUrl: { type: 'string', format: 'uri' }
  }
};

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile({ type: 'array', items: repositorySchema });
const validateGateway = ajv.compile({
  type: 'object',
  required: ['items', 'page', 'perPage', 'total'],
  properties: {
    items: { type: 'array', items: repositorySchema },
    page: { type: 'integer' },
    perPage: { type: 'integer' },
    total: { type: 'integer' }
  }
});

export function validateRepositories(items) {
  const ok = validate(items);
  return { ok, errors: ok ? [] : validate.errors };
}

export function validateGatewayResponse(payload) {
  const ok = validateGateway(payload);
  return { ok, errors: ok ? [] : validateGateway.errors };
}
