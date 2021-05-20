module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^constants/(.*)": "<rootDir>/src/constants/$1",
    "^models/(.*)": "<rootDir>/src/models/$1",
    "^providers/(.*)": "<rootDir>/src/providers/$1",
    "^store/(.*)": "<rootDir>/src/store/$1",
    "^utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
