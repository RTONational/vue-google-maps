import Vue from "vue";

type Constructor = (...args: Array<unknown>) => unknown;

export interface MapElementOptions {
  /** Definitions of props */
  mappedProps: {
    [PROP: string]: {
      /** Value type */
      type: Object;

      /** Whether the prop has a corresponding PROP_changed event */
      twoWay: boolean;

      /**
       * If true, do not apply the default bindProps / bindEvents.
       * However it will still be added to the list of component props
       */
      noBind: boolean;
    };
  };

  /**
   * Regular Vue-style props.
   * Note: must be in the Object form because it will be
   * merged with the `mappedProps`
   */
  props: Record<string, unknown>;

  /** Google Maps API events that are not bound to a corresponding prop */
  events: Record<string, unknown>;

  /** e.g. `polyline` */
  name: string;

  /**
   * constructor, e.g.
   * `google.maps.Polyline`. However, since this is not
   * generally available during library load, this becomes
   * a function instead, e.g. () => google.maps.Polyline
   * which will be called only after the API has been loaded
   */
  ctr: Constructor;

  /**
   * If the constructor in `ctr` needs to be called with
   * arguments other than a single `options` object, e.g. for
   * GroundOverlay, we call `new GroundOverlay(url, bounds, options)`
   * then pass in a function that returns the argument list as an array
   *
   * Otherwise, the constructor will be called with an `options` object,
   * with property and values merged from:
   *
   * 1. the `options` property, if any
   * 2. a `map` property with the Google Maps
   * 3. all the properties passed to the component in `mappedProps`
   */
  ctrArgs: (MappedProps: unknown, OtherVueProps: unknown) => Array<unknown>;

  /** Hook to modify the options passed to the initializer */
  beforeCreate: (arg: Object) => unknown;

  /** Hook called when */
  afterCreate: (arg: Constructor, Object: unknown) => unknown;
}

export default function(options: MapElementOptions): Vue;
