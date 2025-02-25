module.exports = {
  testEnvironment: 'jsdom', // Use jsdom for React testing
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Global setup for tests
 transform: {
  "^.+\\.jsx?$": "babel-jest", 
  "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
},

  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock CSS imports
  },
  moduleFileExtensions: ["js", "jsx"], // File extensions to consider
  transformIgnorePatterns: [
    '/node_modules/(?!quill)/', // Transform 'quill' properly
  ],
};
