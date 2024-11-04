import Paint from "./AbstractPaint";

abstract class AbstractPaintFactory {
  static createPaint() {
    return Paint.getInstance();
  }
}

export default AbstractPaintFactory;
