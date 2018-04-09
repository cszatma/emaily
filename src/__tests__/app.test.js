import request from 'supertest';

import app from '../app';

describe('Express app tests', () => {
    let agent;

    beforeEach(() => {
        agent = request.agent(app);
    });

    it('should respond to a get on /api/current_user', () => {
        return agent.get('/api/current_user').expect(200, {});
    });

    it('should redirect to /', () => {
        return agent.get('/api/logout').expect(302).expect('Location', '/');
    });
});
