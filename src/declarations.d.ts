declare module 'three/examples/jsm/loaders/SVGLoader' {
  import { Loader } from 'three';
  import { ShapePath, Shape } from 'three';

  export class SVGLoader extends Loader {
    load(
      url: string,
      onLoad: (data: { paths: ShapePath[] }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;

    static createShapes(path: ShapePath): Shape[];
  }
}
