import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}

export interface GenzSelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    size?: number;
}

function GenzSelect({
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select an option...",
    disabled,
    size = 180,
}: GenzSelectProps) {
    return (
        <Select
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            disabled={disabled}
        >
            <SelectTrigger className="w-full" style={{ width: `${size}px` }}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
                position="popper"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default GenzSelect;
