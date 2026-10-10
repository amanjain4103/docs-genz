import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

interface GenzSelectWithSearchProps {
    placeholder?: string;
    items: string[];
    onItemSelect?: (item: string) => void;
}

function GenzSelectWithSearch({
    items,
    onItemSelect,
}: GenzSelectWithSearchProps) {
    return (
        <Combobox
            items={items}
            onInputValueChange={(value: string, _) => {
                onItemSelect?.(value);
            }}
        >
            <ComboboxInput placeholder="Select an item" />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export default GenzSelectWithSearch;
