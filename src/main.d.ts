import type { VueConstructor } from "vue";

export interface PluginOptions {
  /**
   * Whether to install Vue components globally.
   *
   * If `false`, you will need to import and declare each component separately before you use it.
   *
   * @default true
   */
  installComponents?: boolean;

  /**
   * @default false
   */
  autobindAllEvents?: boolean;
}

export type { APILoadOptions } from "./manager/initializer";
export { default as loadGmapApi } from "./manager/initializer";
export { default as MapElementMixin } from "./mixins/map-element";
export { default as MapElementFactory } from "./factories/map-element";
export { default as MountableMixin } from "./mixins/mountable";

export const Cluster: typeof import("./components/cluster") | undefined;

export function install(Vue: VueConstructor, options?: PluginOptions): void;
