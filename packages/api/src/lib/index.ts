export function sleepms(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retries n times and waits for 750 ms on avg in between retries.
 *
 * If default value is suppplied, it returns it.
 *
 * Otherwise, fails with an error.
 */
export const withRetry =
  (fn: (...args: any[]) => any, n = 10, defaultValue: any = undefined) =>
  async (...x: any[]): Promise<any> => {
    for (let i: number = 0; i < n; i++) {
      try {
        const result = await fn(...x);
        return result;
      } catch (err) {
        // Optionally handle the error here
        await sleepms(
          Number.parseFloat((750.0 * (Math.random() + 0.5) * i).toString())
        );
      }
    }

    if (Boolean(defaultValue)) {
      return defaultValue;
    }

    throw new Error("Function failed after maximum retries");
  };

/**
 * In order to avoid 503 (and similar errors) as well as
 * race conditions when having multiple calls (such as when
 * benchmarking), this method makes a mean ms pause on avg
 * in between the subsequent calls.
 */
export const withRandomDelay =
  (fn: (...args: any[]) => any, mean = 500) =>
  async (...x: any[]): Promise<any> => {
    await sleepms(Number.parseFloat((mean * (Math.random() + 0.1)).toString()));

    const result = await fn(...x);
    return result;
  };

/**
 * Fails on purpose for n times.
 *
 * Used to test if retries work fine in integration
 * tests as discussed on our call
 */
export const withFailure = (fn: (...args: any[]) => any, n: number) => {
  /**
   * Abuse closure - could be done as OOP with frozen
   * attributes for readability for OOP was prefered
   *
   * But this is an equivalent implemetation
   */
  let i = 0;

  const fnn = async (...x: any[]): Promise<any> => {
    if (i < n) {
      i++;
      throw new Error("Intentional error");
    }

    const result = await fn(...x);
    return result;
  };

  return fnn;
};
