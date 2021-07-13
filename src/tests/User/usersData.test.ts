import { IRepository } from "../../Abstracts/DataAccess/IRepository";
import { usersData } from "../../data/setup-data-for-tests";
import { User } from "../../modules/User/User";
const redisMock: IRepository = {
  set: jest.fn(async (key, value) => usersData.set(key, value)),
  get: jest.fn(async (key) => usersData.get(key)),
  disconnect: jest.fn(),
};
const getByIdMock = jest.fn(User.getById);

describe("get user's data", () => {
  it("get user's by id, user with id=1 is exist", async () => {
    const user = await getByIdMock("1", redisMock);
    expect(user).not.toBeNull();
  });
  it("get user's by id, NO user with id=100", async () => {
    const user = await getByIdMock("100", redisMock);
    expect(user).toBeNull();
  });
  it("get user's by id, user must have his fields", async () => {
    const user = await getByIdMock("1", redisMock);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("phoneNumber");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("token");
  });
});

describe("save user's data", () => {
  it("save user's data", async () => {
    expect(await User.saveUsersData(["1", "2"], redisMock)).toBe(true)
  });
});
