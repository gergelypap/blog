import { prettyDate } from "@utils/date";

it("formats date", () => {
  expect(prettyDate("2020-01-01")).toEqual("January 1, 2020");
  expect(prettyDate("2020-01-01", "hu")).toEqual("2020. január 1.");
});
