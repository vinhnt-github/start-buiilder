"use client";

import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { indentOnInput } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { lintKeymap } from "@codemirror/lint";
import { searchKeymap } from "@codemirror/search";
import { EditorState, Extension } from "@codemirror/state";
import {
  ViewUpdate,
  drawSelection,
  dropCursor,
  highlightSpecialChars,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { EditorView } from "codemirror";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { getEditorTheme } from "./themes";
import { useColorMode } from "@chakra-ui/react";

export type EditorRefType = HTMLDivElement & {
  appendImageUrl: (urlString: string) => void;
  focus: () => void;
};

export type EditorProps = { value: string; onChange: (val: string) => void };

export const defaultKeymaps = keymap.of([
  ...defaultKeymap,
  ...searchKeymap,
  ...historyKeymap,
  ...lintKeymap,
  // NOTE: This keymap refers to the `tab` key, NOT tabs vs spaces.
  // NOTE: `indentWithTab` should be loaded after Emmet to ensure Emmet completions can take precedence
  // NOTE: Warn users about ESC + Tab https://codemirror.net/examples/tab/
  indentWithTab,
]);

export const Editor = React.forwardRef<EditorRefType, EditorProps>(
  ({ value, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const { colorMode } = useColorMode();
    const [editorView, setEditorView] = useState<EditorView | null>(null);
    const extensionsRef = useMemo(
      () => [
        getEditorTheme(colorMode),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        indentOnInput(),
        defaultKeymaps,
        lineNumbers(),
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        EditorView.lineWrapping,
      ],
      [colorMode]
    );

    useImperativeHandle(ref, () => {
      return {
        ...editorRef?.current,
        appendImageUrl(val: string) {
          if (editorView) {
            const from = editorView.state.selection.main.head;
            editorView.dispatch({
              changes: {
                from,
                insert: val,
              },
              selection: { anchor: from + val.length },
            });
            editorView.focus();
          }
        },
      } as EditorRefType;
    });

    useEffect(() => {
      if (!editorRef.current || !extensionsRef) return;
      const editorState = EditorState.create({
        doc: value,
        extensions: [
          extensionsRef as Extension[],
          EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged) {
              onChange(v.state.doc.toString());
            }
          }),
        ],
      });

      const editorView = new EditorView({
        state: editorState,
        parent: editorRef.current as HTMLDivElement,
        lineWrapping: true,
      } as any);
      // NOTE: State is available as `editorView.state`
      setEditorView(editorView);

      // Destroy when unmounted.
      return () => editorView && editorView.destroy();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extensionsRef]);

    useEffect(() => {
      const validValue = value || value === "";
      if (!editorView || !validValue) return;
      const currentValue = editorView.state.doc.toString();
      if (value !== currentValue) {
        // https://codemirror.net/docs/migration/#making-changes
        // NOTE: "To completely reset a state—for example to load a new document—it is recommended to create a new state instead of a transaction. That will make sure no unwanted state (such as undo history events) sticks around."
        // editorView.setState(EditorState.create())
        editorView.dispatch({
          changes: { from: 0, to: editorView.state.doc.length, insert: value },
        });
      }
    }, [value, editorView]);

    return <div className="" ref={editorRef}></div>;
  }
);

Editor.displayName = "Editor";
