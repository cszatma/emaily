import { AgentOptions, SuperTest, Test } from 'supertest';

export function Agent(app?: any, options?: AgentOptions): SuperTest<Test>;

export default Agent;
