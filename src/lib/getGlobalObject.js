export default (mock) => {
  if (mock)
    return mock;

  if (typeof window === 'object')
  // running in browser
    return window;

  if (typeof global === 'object')
  // running in node
    return global;

  throw new Error('There is no window or global in env.');
}