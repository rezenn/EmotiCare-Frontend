import '@testing-library/jest-dom'; // Extend Jest with custom matchers
import 'fast-text-encoding'; // Ensure TextEncoder/TextDecoder for Node.js
import { TextEncoder, TextDecoder } from 'util'; // Polyfill for TextEncoder/TextDecoder

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
