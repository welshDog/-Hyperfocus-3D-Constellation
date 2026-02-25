import Ajv from 'ajv';

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
const validate = ajv.compile({ type: 'array', items: repositorySchema });

export function validateRepositories(items) {
  const ok = validate(items);
  return { ok, errors: ok ? [] : validate.errors };
}
