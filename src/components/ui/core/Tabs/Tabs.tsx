import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface GenzTabProp {
  value: string;
  content: ReactNode;
}

interface GenzTabsProps {
  tabs: readonly GenzTabProp[];
}

const GenzTabs = ({ tabs }: GenzTabsProps) => {
  console.log({ tabs });
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList variant="line" className="flex">
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
