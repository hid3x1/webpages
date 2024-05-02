import * as THREE from 'three';

interface WebGLOptions {
  antialias?: boolean;
  alpha?: boolean;
  backgroundColor?: number;
  cameraFov?: number;
  cameraAspect?: number;
  cameraNear?: number;
  cameraFar?: number;
  cameraPosition?: THREE.Vector3;
}

export class WebGL {
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  constructor(
    private container: HTMLCanvasElement,
    options: WebGLOptions = {},
  ) {
    const {
      antialias = true,
      alpha = true,
      backgroundColor = 0xf0f0f0,
      cameraFov = 75,
      cameraAspect = window.innerWidth / window.innerHeight,
      cameraNear = 0.1,
      cameraFar = 1000,
      cameraPosition = new THREE.Vector3(0, 0, 5),
    } = options;

    this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      canvas: container,
    });
    this.renderer.setSize(container.width, container.height);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(backgroundColor);

    this.camera = new THREE.PerspectiveCamera(
      cameraFov,
      cameraAspect,
      cameraNear,
      cameraFar,
    );
    this.camera.position.copy(cameraPosition);
  }

  public render() {
    const renderError = this.renderer.getContext().getError();
    if (renderError !== this.renderer.getContext().NO_ERROR) {
      console.error('WebGL rendering error:', renderError);
    }

    this.renderer.render(this.scene, this.camera);
  }

  public onResize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    this.renderer.dispose();
  }
}
