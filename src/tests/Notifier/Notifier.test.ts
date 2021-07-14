import IQueue from "../../Abstracts/Queue/IQueue";
import { Notifier } from "../../modules/Notifier/Notifier";

it("notifier - test watch method which consume data", () => {
  expect(true).toBe(true);
  const queueMock: IQueue = {
    consume: jest.fn((queueName) => {}),
    publish: jest.fn((queueName, msg) => {}),
  };
  const notifier = new Notifier(queueMock)
  notifier.watch()
  expect(queueMock.consume).toBeCalled()
});
