export class Helper {
    /**
     * Waits for the specified amount of milliseconds.
     * @param ms The number of milliseconds to wait.
     * @returns A promise that resolves after the specified time.
     */
    async wait(ms: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}