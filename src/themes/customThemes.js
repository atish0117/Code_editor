import { EditorView } from '@codemirror/view';
// import { Extension } from "@codemirror/state";
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// ============================================
// 1. MONOKAI PRO
// ============================================
const monokaiProColors = {
  bg: '#2d2a2e',
  fg: '#fcfcfa',
  selection: '#5b595c',
  cursor: '#fcfcfa',
  comment: '#727072',
  red: '#ff6188',
  orange: '#fc9867',
  yellow: '#ffd866',
  green: '#a9dc76',
  cyan: '#78dce8',
  blue: '#ab9df2',
  purple: '#ff6188',
};

const monokaiProTheme = EditorView.theme({
  '&': {
    color: monokaiProColors.fg,
    backgroundColor: monokaiProColors.bg,
  },
  '.cm-content': {
    caretColor: monokaiProColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: monokaiProColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: monokaiProColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#3e3a3f',
  },
  '.cm-selectionMatch': {
    backgroundColor: '#5b595c',
  },
  '.cm-gutters': {
    backgroundColor: monokaiProColors.bg,
    color: '#727072',
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#3e3a3f',
  },
  '.cm-lineNumbers': {
    color: '#5b595c',
  },
}, { dark: true });

const monokaiProHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: monokaiProColors.red },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: monokaiProColors.cyan },
  { tag: [t.function(t.variableName), t.labelName], color: monokaiProColors.green },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: monokaiProColors.purple },
  { tag: [t.definition(t.name), t.separator], color: monokaiProColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: monokaiProColors.blue },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: monokaiProColors.cyan },
  { tag: [t.meta, t.comment], color: monokaiProColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: monokaiProColors.cyan, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: monokaiProColors.red },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: monokaiProColors.purple },
  { tag: [t.processingInstruction, t.string, t.inserted], color: monokaiProColors.yellow },
  { tag: t.invalid, color: monokaiProColors.red },
  { tag: t.tagName, color: monokaiProColors.red },
  { tag: t.attributeName, color: monokaiProColors.green },
]);

export const monokaiPro = [
  monokaiProTheme,
  syntaxHighlighting(monokaiProHighlightStyle),
];

// ============================================
// 2. NORD
// ============================================
const nordColors = {
  bg: '#2e3440',
  fg: '#d8dee9',
  selection: '#4c566a',
  cursor: '#d8dee9',
  comment: '#616e88',
  frost1: '#8fbcbb',
  frost2: '#88c0d0',
  frost3: '#81a1c1',
  frost4: '#5e81ac',
  red: '#bf616a',
  orange: '#d08770',
  yellow: '#ebcb8b',
  green: '#a3be8c',
  purple: '#b48ead',
};

const nordTheme = EditorView.theme({
  '&': {
    color: nordColors.fg,
    backgroundColor: nordColors.bg,
  },
  '.cm-content': {
    caretColor: nordColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: nordColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: nordColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#3b4252',
  },
  '.cm-selectionMatch': {
    backgroundColor: nordColors.selection,
  },
  '.cm-gutters': {
    backgroundColor: nordColors.bg,
    color: nordColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#3b4252',
  },
  '.cm-lineNumbers': {
    color: '#4c566a',
  },
}, { dark: true });

const nordHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: nordColors.frost4 },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: nordColors.fg },
  { tag: [t.function(t.variableName), t.labelName], color: nordColors.frost2 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: nordColors.frost1 },
  { tag: [t.definition(t.name), t.separator], color: nordColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: nordColors.purple },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: nordColors.frost3 },
  { tag: [t.meta, t.comment], color: nordColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: nordColors.frost2, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: nordColors.frost3 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: nordColors.purple },
  { tag: [t.processingInstruction, t.string, t.inserted], color: nordColors.green },
  { tag: t.invalid, color: nordColors.red },
  { tag: t.tagName, color: nordColors.frost4 },
  { tag: t.attributeName, color: nordColors.frost1 },
]);

export const nord = [
  nordTheme,
  syntaxHighlighting(nordHighlightStyle),
];

// ============================================
// 3. TOKYO NIGHT
// ============================================
const tokyoNightColors = {
  bg: '#1a1b26',
  fg: '#c0caf5',
  selection: '#33467c',
  cursor: '#c0caf5',
  comment: '#565f89',
  red: '#f7768e',
  orange: '#ff9e64',
  yellow: '#e0af68',
  green: '#9ece6a',
  cyan: '#7dcfff',
  blue: '#7aa2f7',
  purple: '#bb9af7',
  magenta: '#bb9af7',
};

const tokyoNightTheme = EditorView.theme({
  '&': {
    color: tokyoNightColors.fg,
    backgroundColor: tokyoNightColors.bg,
  },
  '.cm-content': {
    caretColor: tokyoNightColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: tokyoNightColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: tokyoNightColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#24283b',
  },
  '.cm-selectionMatch': {
    backgroundColor: tokyoNightColors.selection,
  },
  '.cm-gutters': {
    backgroundColor: tokyoNightColors.bg,
    color: tokyoNightColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#24283b',
  },
  '.cm-lineNumbers': {
    color: '#3b4261',
  },
}, { dark: true });

const tokyoNightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: tokyoNightColors.purple },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: tokyoNightColors.fg },
  { tag: [t.function(t.variableName), t.labelName], color: tokyoNightColors.blue },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: tokyoNightColors.orange },
  { tag: [t.definition(t.name), t.separator], color: tokyoNightColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: tokyoNightColors.orange },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: tokyoNightColors.cyan },
  { tag: [t.meta, t.comment], color: tokyoNightColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: tokyoNightColors.cyan, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: tokyoNightColors.blue },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: tokyoNightColors.orange },
  { tag: [t.processingInstruction, t.string, t.inserted], color: tokyoNightColors.green },
  { tag: t.invalid, color: tokyoNightColors.red },
  { tag: t.tagName, color: tokyoNightColors.red },
  { tag: t.attributeName, color: tokyoNightColors.yellow },
]);

export const tokyoNight = [
  tokyoNightTheme,
  syntaxHighlighting(tokyoNightHighlightStyle),
];

// ============================================
// 4. DRACULA
// ============================================
const draculaColors = {
  bg: '#282a36',
  fg: '#f8f8f2',
  selection: '#44475a',
  cursor: '#f8f8f0',
  comment: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
};

const draculaTheme = EditorView.theme({
  '&': {
    color: draculaColors.fg,
    backgroundColor: draculaColors.bg,
  },
  '.cm-content': {
    caretColor: draculaColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: draculaColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: draculaColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#44475a50',
  },
  '.cm-selectionMatch': {
    backgroundColor: draculaColors.selection,
  },
  '.cm-gutters': {
    backgroundColor: draculaColors.bg,
    color: draculaColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#44475a50',
  },
  '.cm-lineNumbers': {
    color: draculaColors.selection,
  },
}, { dark: true });

const draculaHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: draculaColors.pink },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: draculaColors.fg },
  { tag: [t.function(t.variableName), t.labelName], color: draculaColors.green },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: draculaColors.purple },
  { tag: [t.definition(t.name), t.separator], color: draculaColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: draculaColors.cyan },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: draculaColors.pink },
  { tag: [t.meta, t.comment], color: draculaColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: draculaColors.cyan, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: draculaColors.purple },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: draculaColors.purple },
  { tag: [t.processingInstruction, t.string, t.inserted], color: draculaColors.yellow },
  { tag: t.invalid, color: draculaColors.red },
  { tag: t.tagName, color: draculaColors.pink },
  { tag: t.attributeName, color: draculaColors.green },
]);

export const dracula = [
  draculaTheme,
  syntaxHighlighting(draculaHighlightStyle),
];

// ============================================
// 5. SOLARIZED LIGHT
// ============================================
const solarizedLightColors = {
  bg: '#fdf6e3',
  fg: '#657b83',
  selection: '#eee8d5',
  cursor: '#657b83',
  comment: '#93a1a1',
  yellow: '#b58900',
  orange: '#cb4b16',
  red: '#dc322f',
  magenta: '#d33682',
  violet: '#6c71c4',
  blue: '#268bd2',
  cyan: '#2aa198',
  green: '#859900',
};

const solarizedLightTheme = EditorView.theme({
  '&': {
    color: solarizedLightColors.fg,
    backgroundColor: solarizedLightColors.bg,
  },
  '.cm-content': {
    caretColor: solarizedLightColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: solarizedLightColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: solarizedLightColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#eee8d5',
  },
  '.cm-selectionMatch': {
    backgroundColor: '#eee8d5',
  },
  '.cm-gutters': {
    backgroundColor: solarizedLightColors.bg,
    color: solarizedLightColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#eee8d5',
  },
  '.cm-lineNumbers': {
    color: '#93a1a1',
  },
}, { dark: false });

const solarizedLightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: solarizedLightColors.green },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: solarizedLightColors.blue },
  { tag: [t.function(t.variableName), t.labelName], color: solarizedLightColors.blue },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: solarizedLightColors.cyan },
  { tag: [t.definition(t.name), t.separator], color: solarizedLightColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: solarizedLightColors.yellow },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: solarizedLightColors.green },
  { tag: [t.meta, t.comment], color: solarizedLightColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: solarizedLightColors.cyan, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: solarizedLightColors.blue },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: solarizedLightColors.cyan },
  { tag: [t.processingInstruction, t.string, t.inserted], color: solarizedLightColors.cyan },
  { tag: t.invalid, color: solarizedLightColors.red },
  { tag: t.tagName, color: solarizedLightColors.green },
  { tag: t.attributeName, color: solarizedLightColors.blue },
]);

export const solarizedLight = [
  solarizedLightTheme,
  syntaxHighlighting(solarizedLightHighlightStyle),
];

// ============================================
// 6. GITHUB LIGHT (Enhanced)
// ============================================
const githubLightColors = {
  bg: '#ffffff',
  fg: '#24292f',
  selection: '#0969da20',
  cursor: '#24292f',
  comment: '#6e7781',
  blue: '#0969da',
  cyan: '#0598bc',
  green: '#1a7f37',
  orange: '#bc4c00',
  purple: '#8250df',
  red: '#cf222e',
  pink: '#bf3989',
};

const githubLightTheme = EditorView.theme({
  '&': {
    color: githubLightColors.fg,
    backgroundColor: githubLightColors.bg,
  },
  '.cm-content': {
    caretColor: githubLightColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: githubLightColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: githubLightColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#f6f8fa',
  },
  '.cm-selectionMatch': {
    backgroundColor: '#fff8c5',
  },
  '.cm-gutters': {
    backgroundColor: githubLightColors.bg,
    color: githubLightColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#f6f8fa',
  },
  '.cm-lineNumbers': {
    color: '#8c959f',
  },
}, { dark: false });

const githubLightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: githubLightColors.red },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: githubLightColors.fg },
  { tag: [t.function(t.variableName), t.labelName], color: githubLightColors.purple },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: githubLightColors.blue },
  { tag: [t.definition(t.name), t.separator], color: githubLightColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: githubLightColors.orange },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: githubLightColors.cyan },
  { tag: [t.meta, t.comment], color: githubLightColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: githubLightColors.blue, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: githubLightColors.blue },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: githubLightColors.blue },
  { tag: [t.processingInstruction, t.string, t.inserted], color: githubLightColors.cyan },
  { tag: t.invalid, color: githubLightColors.red },
  { tag: t.tagName, color: githubLightColors.green },
  { tag: t.attributeName, color: githubLightColors.blue },
]);

export const githubLight = [
  githubLightTheme,
  syntaxHighlighting(githubLightHighlightStyle),
];

// ============================================
// 7. MATERIAL OCEAN
// ============================================
const materialOceanColors = {
  bg: '#0f111a',
  fg: '#8f93a2',
  selection: '#1f2233',
  cursor: '#ffcc00',
  comment: '#464b5d',
  red: '#f07178',
  orange: '#f78c6c',
  yellow: '#ffcb6b',
  green: '#c3e88d',
  cyan: '#89ddff',
  blue: '#82aaff',
  purple: '#c792ea',
  pink: '#ff5370',
};

const materialOceanTheme = EditorView.theme({
  '&': {
    color: materialOceanColors.fg,
    backgroundColor: materialOceanColors.bg,
  },
  '.cm-content': {
    caretColor: materialOceanColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: materialOceanColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: materialOceanColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#1f2233',
  },
  '.cm-selectionMatch': {
    backgroundColor: materialOceanColors.selection,
  },
  '.cm-gutters': {
    backgroundColor: materialOceanColors.bg,
    color: materialOceanColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#1f2233',
  },
  '.cm-lineNumbers': {
    color: '#3b3f51',
  },
}, { dark: true });

const materialOceanHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: materialOceanColors.purple },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: materialOceanColors.fg },
  { tag: [t.function(t.variableName), t.labelName], color: materialOceanColors.blue },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: materialOceanColors.orange },
  { tag: [t.definition(t.name), t.separator], color: materialOceanColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: materialOceanColors.orange },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: materialOceanColors.cyan },
  { tag: [t.meta, t.comment], color: materialOceanColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: materialOceanColors.cyan, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: materialOceanColors.blue },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: materialOceanColors.orange },
  { tag: [t.processingInstruction, t.string, t.inserted], color: materialOceanColors.green },
  { tag: t.invalid, color: materialOceanColors.red },
  { tag: t.tagName, color: materialOceanColors.red },
  { tag: t.attributeName, color: materialOceanColors.yellow },
]);

export const materialOcean = [
  materialOceanTheme,
  syntaxHighlighting(materialOceanHighlightStyle),
];

// ============================================
// 8. AYU MIRAGE
// ============================================
const ayuMirageColors = {
  bg: '#1f2430',
  fg: '#cbccc6',
  selection: '#33415e',
  cursor: '#ffcc66',
  comment: '#5c6773',
  orange: '#ffaa33',
  yellow: '#ffd580',
  green: '#bae67e',
  cyan: '#95e6cb',
  blue: '#5ccfe6',
  purple: '#d4bfff',
  red: '#f28779',
};

const ayuMirageTheme = EditorView.theme({
  '&': {
    color: ayuMirageColors.fg,
    backgroundColor: ayuMirageColors.bg,
  },
  '.cm-content': {
    caretColor: ayuMirageColors.cursor,
  },
  '.cm-cursor, .cm-dropCursor': {
    borderLeftColor: ayuMirageColors.cursor,
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: ayuMirageColors.selection,
  },
  '.cm-activeLine': {
    backgroundColor: '#242936',
  },
  '.cm-selectionMatch': {
    backgroundColor: ayuMirageColors.selection,
  },
  '.cm-gutters': {
    backgroundColor: ayuMirageColors.bg,
    color: ayuMirageColors.comment,
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#242936',
  },
  '.cm-lineNumbers': {
    color: '#3e4b59',
  },
}, { dark: true });

const ayuMirageHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: ayuMirageColors.orange },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: ayuMirageColors.fg },
  { tag: [t.function(t.variableName), t.labelName], color: ayuMirageColors.yellow },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: ayuMirageColors.purple },
  { tag: [t.definition(t.name), t.separator], color: ayuMirageColors.fg },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: ayuMirageColors.orange },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: ayuMirageColors.orange },
  { tag: [t.meta, t.comment], color: ayuMirageColors.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: ayuMirageColors.blue, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: ayuMirageColors.blue },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: ayuMirageColors.purple },
  { tag: [t.processingInstruction, t.string, t.inserted], color: ayuMirageColors.green },
  { tag: t.invalid, color: ayuMirageColors.red },
  { tag: t.tagName, color: ayuMirageColors.orange },
  { tag: t.attributeName, color: ayuMirageColors.purple },
]);

export const ayuMirage = [
  ayuMirageTheme,
  syntaxHighlighting(ayuMirageHighlightStyle),
];
