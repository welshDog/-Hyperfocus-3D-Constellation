import { Pact } from '@pact-foundation/pact';
import path from 'path';
import fetch from 'node-fetch';
import { TextDecoder, TextEncoder } from 'util';
import { validateGatewayResponse } from '../../schema-validator.js';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

describe('Gateway Contract', () => {
  const pact = new Pact({
    consumer: 'HyperfocusFrontend',
    provider: 'HyperfocusGateway',
    port: 9324,
    dir: path.resolve(process.cwd(), 'pact'),
    logLevel: 'warn',
  });

  beforeAll(() => pact.setup());
  afterAll(() => pact.finalize());

  test('GET /api/v1/repositories returns repository list', async () => {
    await pact.addInteraction({
      state: 'repositories exist',
      uponReceiving: 'a request for repositories',
      withRequest: {
        method: 'GET',
        path: '/api/v1/repositories'
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          items: [
            {
              name: 'Example',
              category: 'Creative',
              description: 'desc',
              language: 'JavaScript',
              stars: 1,
              updated: 'today',
              status: 'active',
              githubUrl: 'https://github.com/example',
            },
          ],
          page: 1,
          perPage: 50,
          total: 1,
        },
      },
    });

    const res = await fetch(`http://localhost:${pact.opts.port}/api/v1/repositories`);
    const json = await res.json();
    const payload = Array.isArray(json)
      ? { items: json, page: 1, perPage: json.length, total: json.length }
      : json;
    const validation = validateGatewayResponse(payload);
    expect(validation.ok).toBe(true);
    await pact.verify();
  });
});
