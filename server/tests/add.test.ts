import { add } from '../src/addition';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(5, 5)).toBe(10);
    expect(add(0, 0)).toBe(0);
  });
});
