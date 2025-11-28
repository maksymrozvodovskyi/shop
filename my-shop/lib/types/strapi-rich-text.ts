export type StrapiTextNodeType = {
  type: "text";
  text: string;
};

export type StrapiParagraphType = {
  type: "paragraph";
  children: StrapiTextNodeType[];
};

export type StrapiRichTextType = StrapiParagraphType[];
