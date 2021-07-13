import { QNames } from "../../Abstracts/Queue/queuesNames"
import { queueMock, rawEmail } from "../../data/setup-data-for-tests"

describe("raw notification is sent to its queue", ()=> {
    it("should be sent successfully", async () => {
        await rawEmail.toBeSentToQueue(QNames.EMAIL, queueMock )
        expect(queueMock.publish).toBeCalled()
    })
})