import type { ReactNode } from "react";
import { useEditorState, type Editor } from "@tiptap/react";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    IndentDecrease,
    IndentIncrease,
    Italic,
    List,
    ListOrdered,
    Printer,
    Redo,
    RemoveFormatting,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GenzSelect } from "@/components/ui/core/GenzSelect/Index";
import {
    FONT_FAMILIES_OPTIONS,
    FONT_SIZES_OPTIONS,
} from "@/components/constants/features/editor";

interface EditorToolbarHomeProps {
    editor: Editor;
}

interface RibbonGroupProps {
    label: string;
    children: ReactNode;
}

const RibbonGroup = ({ label, children }: RibbonGroupProps) => (
    <div className="flex shrink-0 flex-col items-center justify-between gap-1 px-2">
        <div className="flex min-h-8 items-center justify-center gap-0.5">
            {children}
        </div>
        <span className="text-[10px] leading-none text-slate-500">{label}</span>
    </div>
);

interface ToolbarButtonProps {
    label: string;
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

const ToolbarButton = ({
    label,
    children,
    active = false,
    disabled = false,
    onClick,
}: ToolbarButtonProps) => (
    <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-sm text-slate-700"
        aria-label={label}
        aria-pressed={active}
        title={label}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </Button>
);

const EditorToolbarHome = ({ editor }: EditorToolbarHomeProps) => {
    const toolbarState = useEditorState({
        editor,
        selector: ({ editor: currentEditor }) => ({
            headingLevel: currentEditor.isActive("heading")
                ? currentEditor.getAttributes("heading").level
                : null,
            bold: currentEditor.isActive("bold"),
            italic: currentEditor.isActive("italic"),
            underline: currentEditor.isActive("underline"),
            strike: currentEditor.isActive("strike"),
            bulletList: currentEditor.isActive("bulletList"),
            orderedList: currentEditor.isActive("orderedList"),
            alignLeft: currentEditor.isActive({ textAlign: "left" }),
            alignCenter: currentEditor.isActive({ textAlign: "center" }),
            alignRight: currentEditor.isActive({ textAlign: "right" }),
            alignJustify: currentEditor.isActive({ textAlign: "justify" }),
            canUndo: currentEditor.can().undo(),
            canRedo: currentEditor.can().redo(),
            canDecreaseIndent: currentEditor.can().liftListItem("listItem"),
            canIncreaseIndent: currentEditor.can().sinkListItem("listItem"),
            fontSize: currentEditor.getAttributes("textStyle").fontSize,
            fontFamily: currentEditor.getAttributes("textStyle").fontFamily,
        }),
    });
    const fontSize = toolbarState?.fontSize ?? "14px";
    const fontFamily = toolbarState?.fontFamily ?? "Arial, sans-serif";

    const applyFontSize = (value: string) => {
        editor.chain().focus().setFontSize(value).run();
    };

    const applyFontFamily = (value: string) => {
        editor.chain().focus().setFontFamily(value).run();
    };

    return (
        <div className="flex w-full items-stretch gap-1 overflow-x-auto px-2 py-1">
            <RibbonGroup label="History">
                <ToolbarButton
                    label="Undo"
                    disabled={!toolbarState?.canUndo}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Redo"
                    disabled={!toolbarState?.canRedo}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="h-4 w-4" />
                </ToolbarButton>
            </RibbonGroup>

            <Separator orientation="vertical" className="my-1 h-12" />

            <RibbonGroup label="Styles">
                <GenzSelect
                    size={120}
                    options={FONT_FAMILIES_OPTIONS}
                    value={fontFamily}
                    onValueChange={applyFontFamily}
                    placeholder="Font Family"
                />
                <GenzSelect
                    size={56}
                    options={FONT_SIZES_OPTIONS}
                    value={fontSize}
                    onValueChange={applyFontSize}
                    placeholder="Font Size"
                />
            </RibbonGroup>

            <Separator orientation="vertical" className="my-1 h-12" />

            <RibbonGroup label="Font">
                <ToolbarButton
                    label="Bold"
                    active={toolbarState?.bold}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    active={toolbarState?.italic}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Underline"
                    active={toolbarState?.underline}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Strikethrough"
                    active={toolbarState?.strike}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Clear formatting"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .unsetAllMarks()
                            .clearNodes()
                            .run()
                    }
                >
                    <RemoveFormatting className="h-4 w-4" />
                </ToolbarButton>
            </RibbonGroup>

            <Separator orientation="vertical" className="my-1 h-12" />

            <RibbonGroup label="Paragraph">
                <ToolbarButton
                    label="Bulleted list"
                    active={toolbarState?.bulletList}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Numbered list"
                    active={toolbarState?.orderedList}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Decrease indent"
                    disabled={!toolbarState?.canDecreaseIndent}
                    onClick={() =>
                        editor.chain().focus().liftListItem("listItem").run()
                    }
                >
                    <IndentDecrease className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Increase indent"
                    disabled={!toolbarState?.canIncreaseIndent}
                    onClick={() =>
                        editor.chain().focus().sinkListItem("listItem").run()
                    }
                >
                    <IndentIncrease className="h-4 w-4" />
                </ToolbarButton>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <ToolbarButton
                    label="Align left"
                    active={toolbarState?.alignLeft}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                >
                    <AlignLeft className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Align center"
                    active={toolbarState?.alignCenter}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                >
                    <AlignCenter className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Align right"
                    active={toolbarState?.alignRight}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                >
                    <AlignRight className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    label="Justify"
                    active={toolbarState?.alignJustify}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("justify").run()
                    }
                >
                    <AlignJustify className="h-4 w-4" />
                </ToolbarButton>
            </RibbonGroup>

            <Separator orientation="vertical" className="my-1 h-12" />

            <RibbonGroup label="Document">
                <ToolbarButton
                    label="Print / PDF"
                    onClick={() => window.print()}
                >
                    <Printer className="h-4 w-4" />
                </ToolbarButton>
            </RibbonGroup>
        </div>
    );
};

export default EditorToolbarHome;
