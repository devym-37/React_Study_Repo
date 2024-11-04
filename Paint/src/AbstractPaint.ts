export default abstract class Paint {
  protected constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Canvas not found");
    }
  }

  abstract initialize(): void;
  abstract initializeMenu(): void;

  static getInstance() {}
}
