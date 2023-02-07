import {
  DEFAULT_VANILLA_CODESANDBOX,
  previewTemplate,
} from "storybook-addon-preview";
import { randomInteger } from "../utils/random.utils";

export const codePreview = (
  strings: TemplateStringsArray,
  ...values: any[]
) => {
  return [
    {
      tab: "ReactJs",
      template: previewTemplate`${strings[0]}`,
      language: "tsx",
      copy: true,
      codesandbox: DEFAULT_VANILLA_CODESANDBOX(["@egjs/infinitegrid"]),
    },
  ];
};

export const randomLorem = (min: number, max: number) => {
  const lorem =
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat".split(
      ","
    );
  const length = randomInteger(min, max);

  const texts: string[] = [];
  for (let i = 0; i < length; i++) {
    texts.push(lorem[randomInteger(0, length - 1)]);
  }
  return texts.join(", ");
};
