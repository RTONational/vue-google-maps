export interface APILoadOptions {
  /**
   * Your Google Maps API key.
   *
   * API Key, or object with the URL parameters. For example
   * to use Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`.
   * You may pass the libraries and/or version (as `v`) parameter into
   * this parameter and skip the next two parameters
   */
  key: string;

  /**
   * Google Maps version.
   */
  version?: string;

  /**
   * The Google Maps libraries to load.
   *
   * @see https://developers.google.com/maps/documentation/javascript/libraries
   * @example "places,geocoder,geometry"
   */
  libraries: string;
}

/**
 * @param options   Load options.
 * @param loadCn    If set to `true`, the map will be loaded from google maps China. Defaults to `false`.
 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
 *
 * Example:
 * ```
 *      import { loadGmapApi } from 'vue-google-maps'
 *
 *      load(<YOUR-API-KEY>)
 *
 *      load({
 *              key: <YOUR-API-KEY>,
 *      })
 *
 *      load({
 *              client: <YOUR-CLIENT-ID>,
 *              channel: <YOUR CHANNEL>
 *      })
 * ```
 */
export default function loadGmapApi(
  options: APILoadOptions,
  loadCn?: boolean
): void;
