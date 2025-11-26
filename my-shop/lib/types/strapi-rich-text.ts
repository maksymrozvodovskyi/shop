export interface StrapiTextNode {
  type: "text";
  text: string;
}

export interface StrapiParagraph {
  type: "paragraph";
  children: StrapiTextNode[];
}

export type StrapiRichText = StrapiParagraph[];
