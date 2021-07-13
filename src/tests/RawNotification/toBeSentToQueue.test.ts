import IQueue from "../../Abstracts/Queue/IQueue";
import { QNames } from "../../Abstracts/Queue/queuesNames"
import { rawEmail } from "../../data/setup-data-for-tests"

describe("raw notification is sent to its queue", ()=> {
    const queueMock: IQueue = {
      consume: jest.fn(queueName=>{}),
      publish: jest.fn((queueName,msg)=>{}),
    };
    it("should be sent successfully", async () => {
        await rawEmail.toBeSentToQueue(QNames.EMAIL, queueMock )
        expect(queueMock.publish).toBeCalled()
    })
})