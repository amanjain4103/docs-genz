import { useRef } from "react";
import type { Editor } from "@tiptap/react";

export function useEditorLocalState() {
  const editorTextSelectionRef = useRef<{ from: number; to: number } | null>(null);

  const captureSelection = (editor: Editor) => {
    const { from, to } = editor.state.selection;
    editorTextSelectionRef.current = { from, to };
  };

  const resetSelection = () => {
    editorTextSelectionRef.current = null;
  };

  return { captureSelection, resetSelection, editorTextSelectionRef };
}