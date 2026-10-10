import { TOOLBAR_TABS } from "@/components/constants/features/editor";
import GenzTabs from "@/components/ui/core/Tabs/Index";
import type { Editor } from "@tiptap/react";
import EditorToolbarHome from "./EditorToolbarHome";
import type { GenzTabProp } from "@/components/ui/core/Tabs/Tabs";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const tabs: GenzTabProp[] = [
    {
      value: TOOLBAR_TABS.HOME,
      content: <EditorToolbarHome editor={editor} />,
    },
    {
      value: TOOLBAR_TABS.LAYOUT,
      content: <div>Layout Content</div>,
    },
  ];

  return (
    <header className="border-b bg-white px-4 shadow-xs">
      <GenzTabs tabs={tabs} />
    </header>
  );
};

export default EditorToolbar;
