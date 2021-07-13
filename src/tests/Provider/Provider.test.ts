import { QNames } from "../../Abstracts/Queue/queuesNames";
import { EmailProvider } from "../../modules/Provider/EmailProvider";
import { ProviderFactory } from "../../modules/Provider/ProviderFactory";
import { PushProvider } from "../../modules/Provider/PushProvider";
import { SMSProvider } from "../../modules/Provider/SMSProvider";

describe("Provider Factory, should return suitable service provider", () => {
  const factoryMock = jest.fn(ProviderFactory);
  it("should return null as raw queue has no service provider", () => {
    expect(factoryMock(QNames.RAW)).toBeNull();
  });
  it("should return SMS service provider", () => {
    expect(factoryMock(QNames.SMS)).toBeInstanceOf(SMSProvider);
  });
  it("should return Email service provider", () => {
    expect(factoryMock(QNames.EMAIL)).toBeInstanceOf(EmailProvider);
  });
  it("should return Push service provider", () => {
    expect(factoryMock(QNames.PUSH)).toBeInstanceOf(PushProvider);
  });
});

describe("service provider fields", () => {
  const factoryMock = jest.fn(ProviderFactory);
  it("provider should have send method and requestsLimitPerMinute", () => {
    expect(factoryMock(QNames.SMS)).toHaveProperty("requestsLimitPerMinute");
    expect(factoryMock(QNames.SMS)).toHaveProperty("send");
  });
})
