import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface GenzTab {
  value: string;
  content: ReactNode;
}

interface GenzTabsProps {
  tabs: readonly [GenzTab, ...GenzTab[]];
}

const GenzTabs = ({ tabs }: GenzTabsProps) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList className="flex w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.value}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default GenzTabs;
