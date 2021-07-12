import { QNames } from "../../../Abstracts/Queue/queuesNames";

export const getSuitableProvider = (queueName: QNames) => {
    switch (queueName) {
        case QNames.SMS:
        case QNames.EMAIL:
        case QNames.PUSH:
        
    }
}