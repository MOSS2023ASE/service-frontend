import { VueConstructor } from 'vue';
import ElTiptap from '@/components/ElementTiptap.vue';

// TODO: tiptap extensions
declare class Doc {}
declare class Paragraph {}
declare class Text {}
declare class Heading {}
declare class Bold {}
declare class Underline {}
declare class Italic {}
declare class Strike {}
declare class Link {}
declare class Blockquote {}
declare class CodeBlock {}
declare class Code {}
declare class Image {}
declare class Iframe {}
declare class ListItem { }
declare class BulletList { }
declare class OrderedList { }
declare class TodoItem { }
declare class TodoList { }
declare class Table { }
declare class TableHeader { }
declare class TableCell { }
declare class TableRow {}
declare class HardBreak {}
declare class TrailingNode {}
declare class TextAlign {}
declare class Indent {}
declare class LineHeight {}
declare class HorizontalRule {}
declare class History {}
declare class TextColor {}
declare class TextHighlight {}
declare class FontType {}
declare class FontSize {}
declare class FormatClear {}
declare class Fullscreen {}
declare class Print {}
declare class Preview {}
declare class SelectAll {}
declare class CodeView {}

interface OptionsInterface {
  lang?: string;
  spellcheck?: boolean;
}

type ElementTiptap = ElTiptap;
type ElementTiptapPlugin = ElementTiptapPluginInterface;

interface ElementTiptapPluginInterface {
  installed: boolean;
  install(Vue: VueConstructor, options: OptionsInterface): void;
  spellcheck: boolean;
  lang: string;
}

interface MenuBtnComponentOptions {
  component: VueConstructor;
  componentProps?: { [key: string]: any };
  componentEvents?: { [key: string]: any };
}

type MenuBtnViewType =
  | MenuBtnComponentOptions
  | MenuBtnComponentOptions[];

interface MenuBtnView {
  // TODO: tiptap menuData
  menuBtnView(menuData: any): MenuBtnViewType;
}

declare module 'vue/types/vue' {
  interface Vue {
    $elementTiptapPlugin: ElementTiptapPluginInterface;
  }
}

export { Blockquote, Bold, BulletList, Code, CodeBlock, CodeView, Doc, ElementTiptap, ElementTiptapPlugin, ElementTiptapPluginInterface, FontSize, FontType, FormatClear, Fullscreen, HardBreak, Heading, History, HorizontalRule, Iframe, Image, Indent, Italic, LineHeight, Link, ListItem, MenuBtnComponentOptions, MenuBtnView, MenuBtnViewType, OptionsInterface, OrderedList, Paragraph, Preview, Print, SelectAll, Strike, Table, TableCell, TableHeader, TableRow, Text, TextAlign, TextColor, TextHighlight, TodoItem, TodoList, TrailingNode, Underline };
