import { useFirebase } from "../../src/composables/useFirebase";
import { User } from "firebase/auth";
import { getDocs, updateDoc, increment } from "firebase/firestore";
import { mock } from "jest-mock-extended";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  updateDoc: jest.fn(),
  increment: jest.fn(),
}));

const mockUser = mock<User>({
  uid: "mockUserId",
});

describe("useFirebase", () => {
  const {
    getOriginalUrl,
    retrieveUserUrls,
    incrementClickCount,
    checkCustomNameAvailability,
  } = useFirebase();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("checkCustomNameAvailability is supposed to return true if custom name is available", async () => {
    const mockGetDocs = getDocs as jest.Mock;
    mockGetDocs.mockResolvedValue({ empty: true });

    const isAvailable = await checkCustomNameAvailability("customName");
    expect(isAvailable).toBe(true);
  });

//   test("getOriginalUrl is supposed to throw an error if short URL is not found", async () => {
//     const mockGetDocs = getDocs as jest.Mock;
//     mockGetDocs.mockResolvedValue({ empty: true });

//     await expect(getOriginalUrl("nonexistent")).rejects.toThrow(
//       "Short URL not found"
//     );
//   });

  test("retrieveUserUrls is supposed to return user URLs", async () => {
    const mockGetDocs = getDocs as jest.Mock;
    mockGetDocs.mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({ originalUrl: "https://github.com/Saheedatt" }),
        },
      ],
    });

    const urls = await retrieveUserUrls(mockUser);
    expect(urls).toEqual([
      { id: "1", originalUrl: "https://github.com/Saheedatt" },
    ]);
  });

  test("incrementClickCount is supposed to increment click count", async () => {
    const mockGetDocs = getDocs as jest.Mock;
    const mockUpdateDoc = updateDoc as jest.Mock;

    mockGetDocs.mockResolvedValue({
      empty: false,
      docs: [
        { id: "1", ref: "mockRef", data: () => ({ shortUrl: "shortCode" }) },
      ],
    });

    await incrementClickCount("shortCode");
    expect(mockUpdateDoc).toHaveBeenCalledWith("mockRef", {
      clickCount: increment(1),
    });
  });
});
