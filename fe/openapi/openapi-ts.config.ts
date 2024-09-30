import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: './openapi-schema.json',
  output: {
    lint: 'eslint',
    format: 'prettier',
    path: '../src/api',
  },
  types: {
    dates: 'types+transform',
    enums: 'typescript',
  },
  schemas: {
    type: 'json',
  },
  services:{
    asClass: true
  },
});