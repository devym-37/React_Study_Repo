class Paint {
  private static instance: Paint;

  private constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Canvas not found");
    }
  }

  initialize() {}

  static getInstance() {
    // 단일책임원칙을 위배하고 있다고 할 수도 있다
    // 하지만, 싱글톤 패턴을 사용하는 이유는
    // 하나의 인스턴스만을 사용하기 위함이다.
    // 즉, 하나의 인스턴스만을 사용하기 위해서는
    // getInstance 메서드를 통해 인스턴스를 생성해야 한다.
    if (!this.instance) {
      this.instance = new Paint(document.querySelector("#canvas"));
    }

    return this.instance;
  }
}

export default Paint;
