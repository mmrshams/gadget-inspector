import axios, { AxiosInstance } from 'axios';
/**
 * @tutorial
 * Need more improvements:
 * 1. isolation and clean db per iteration
 * 2. feed database and tables
 * 3. mock data generation
 */

describe('AuthController (e2e)', () => {
  let axiosInstance: AxiosInstance;
  beforeEach(async () => {
    /**
     * @tutorial
     * WE can add Config to manage envs easier
     * and ability of running tests on ci pipeline
     */
    axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api/auth/',
      timeout: 5000,
      headers: { 'X-Custom-Header': 'gadget-test' },
    });
  });

  describe('AuthController (e2e) sign-up/', () => {
    it('When all required data sent -> should return 200', async () => {
      /**
       * @tutorial
       * we can use faker in this case
       */
      const bodyData = {
        name: 'omid',
        email: 'omid@test.com',
        password: '123123',
      };
      const result = await axiosInstance.post('sign-up/', bodyData);
      const { data } = result;
      expect(data).toHaveProperty('name', 'omid');
      expect(data).toHaveProperty('email', 'omid@test.com');
      expect(data).toHaveProperty('token');
      expect(result.status).toEqual(201);
    });

    it("When all required data didn't sent -> should return 400", async () => {
      const bodyData = {
        name: 'omid',
        password: '123123',
      };
      let error: Error;
      try {
        await axiosInstance.post('sign-up/', bodyData);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('AuthController (e2e) login/', () => {
    beforeAll(async () => {
      /**
       * @tutorial
       * we need to sign up before login for testing different cases
       */
      const bodyData = {
        name: 'omid',
        email: 'dear-omid@test.com',
        password: '123123',
      };
      await axiosInstance.post('sign-up/', bodyData);
    });

    it('When email or password is correct -> should return 200', async () => {
      const bodyData = {
        email: 'dear-omid@test.com',
        password: '123123',
      };
      const result = await axiosInstance.post('login/', bodyData);
      const { data } = result;
      expect(data).toHaveProperty('user');
      expect(data).toHaveProperty('token');
      expect(result.status).toEqual(201);
    });

    it('When email or password is incorrect -> should return 401', async () => {
      const bodyData = {
        email: 'dear-omid@test.com',
        password: 'wrong-password',
      };
      let error: Error;
      try {
        await axiosInstance.post('login/', bodyData);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it('When only send email -> should return 400', async () => {
      const bodyData = {
        email: 'dear-omid@test.com',
      };
      let error: Error;
      try {
        await axiosInstance.post('login/', bodyData);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(Error);
    });
  });
});
