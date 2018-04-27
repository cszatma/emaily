import Agent from 'jest-supertest-cookie-fix';
import passport from 'passport';
import {
    mockUser,
    MockStrategy,
    setupSerializeAndDeserialize,
} from 'passport-mock-strategy';

import app from '../app';

const user = { ...mockUser, credits: 5 };

setupSerializeAndDeserialize(passport);
passport.use(new MockStrategy({ user }));

app.get('/auth/mock', passport.authenticate('mock'), (req, res) => {
    res.send({ status: 'ok' });
});

describe('Express app tests', () => {
    let agent;

    beforeEach(() => {
        agent = Agent(app);
    });

    it('should respond to a get on /api/current_user', () => {
        return agent.get('/api/current_user').expect(200, {});
    });

    it('should redirect to /', () => {
        return agent
            .get('/api/logout')
            .expect(302)
            .expect('Location', '/');
    });

    it('should authenticate the user', () => {
        return agent.get('/auth/mock').expect(200);
    });

    it('should return the an empty object since a user is not logged in', () => {
        return agent.get('/api/current_user').expect(200, {});
    });

    describe('Test authenticated routes', () => {
        beforeEach(() => {
            return agent.get('/auth/mock');
        });

        it('should return the current user', () => {
            return agent.get('/api/current_user').expect(200, mockUser);
        });

        it('should log out the user', () => {
            return agent
                .get('/api/logout')
                .then(() => agent.get('/api/current_user').expect(200, {}));
        });
    });
});
