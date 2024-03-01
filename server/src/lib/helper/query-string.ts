export default class QueryString {
  static parse(object: any) {
    const keys = Object.keys(object);

    const keyValuePairs = keys.map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    });

    return keyValuePairs.join("&");
  }
}
