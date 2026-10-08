import { TOOLBAR_TABS } from "@/components/constants/features/editor";
import GenzTabs, { type GenzTab } from "@/components/ui/core/Tabs/Index";

const tabs = [
  {
    value: TOOLBAR_TABS.HOME,
    content: <div>Home Content</div>,
  },
  {
    value: TOOLBAR_TABS.LAYOUT,
    content: <div>Layout Content</div>,
  },
] satisfies [GenzTab, ...GenzTab[]];

const EditorToolbar = () => {
  return (
    <div className="w-fit">
      <GenzTabs tabs={tabs} />;
    </div>
  );
};

export default EditorToolbar;
