export type SimplifiedJsonLdProps = {
  [key: string]: any;
};

export class SimplifiedJsonLdService {
  public static toJson(type: string, jsonld: SimplifiedJsonLdProps) {
    return {
      __html: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": type,
        ...jsonld
      }, null, 2)
    };
  }
}

