import { rest } from "msw";
import { setupServer } from "msw/node";

//Reusable function to create MSW server
export const createServer = (handlersConfig = []) => {
  const handlers = handlersConfig.map((handlerConfig) => {
    const { method, url, response } = handlerConfig;
    return rest[method || "get"](url, (req, res, ctx) => {
      return res(ctx.json(response(req, res, ctx)));
    });
  });

  //Setup Mock server
  const server = setupServer(...handlers);

  /* Standard Actions for MSW */
  //Called once before all tests
  beforeAll(() => server.listen());
  //Called after each test executed
  afterEach(() => server.resetHandlers());
  //Called once after all tests executed
  afterAll(() => server.close());
};
