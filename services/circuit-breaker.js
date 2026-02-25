const state = {
  gateway: {
    failures: 0,
    lastFailure: 0,
    openUntil: 0,
  },
};

export async function withCircuitBreaker(key, fn) {
  const breaker = state[key] || { failures: 0, lastFailure: 0, openUntil: 0 };
  const now = Date.now();
  if (breaker.openUntil && now < breaker.openUntil) {
    throw new Error('Circuit open');
  }
  try {
    const result = await fn();
    breaker.failures = 0;
    breaker.openUntil = 0;
    state[key] = breaker;
    return result;
  } catch (error) {
    breaker.failures += 1;
    breaker.lastFailure = now;
    if (breaker.failures >= 3) {
      breaker.openUntil = now + 30000;
    }
    state[key] = breaker;
    throw error;
  }
}
