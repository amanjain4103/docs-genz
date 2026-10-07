import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Undo,
  Redo,
  Printer,
} from "lucide-react";

export default function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
      <h3 style="text-align: center;">IN THE COURT OF THE DISTRICT JUDGE</h3>
      <p style="text-align: center;"><strong>SUIT NO. _______ OF 2026</strong></p>
      <br/>
      <p style="text-align: justify;"><strong>IN THE MATTER OF:</strong></p>
      <p style="text-align: justify;">Ramesh Chandra ... Plaintiff / Petitioner</p>
      <p style="text-align: center;"><strong>VERSUS</strong></p>
      <p style="text-align: justify;">State of Rajasthan & Ors. ... Defendants / Respondents</p>
      <br/>
      <h4 style="text-align: center;">AFFIDAVIT</h4>
      <p style="text-align: justify;">
        I, the above named deponent, do hereby solemnly affirm and declare on oath that the contents of paragraphs 1 to 5 of the accompanying petition are true and correct to the best of my personal knowledge and belief.
      </p>
    `,
  });

  if (!editor) return null;

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-100 font-sans antialiased">
      {/* Top Word Processor Ribbon Toolbar */}
      <header className="flex h-12 items-center gap-1.5 border-b bg-white px-4 shadow-xs">
        {/* Undo / Redo */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-700"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-700"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-5" />

        {/* Text Style Toggles */}
        <ToggleGroup type="multiple" className="gap-0.5">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            className="h-8 w-8 p-0"
            data-state={editor.isActive("bold") ? "on" : "off"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            className="h-8 w-8 p-0"
            data-state={editor.isActive("italic") ? "on" : "off"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            className="h-8 w-8 p-0"
            data-state={editor.isActive("underline") ? "on" : "off"}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="mx-1 h-5" />

        {/* Alignment Toggles */}
        <ToggleGroup type="single" className="gap-0.5">
          <ToggleGroupItem
            value="left"
            aria-label="Align left"
            className="h-8 w-8 p-0"
            data-state={editor.isActive({ textAlign: "left" }) ? "on" : "off"}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="center"
            aria-label="Align center"
            className="h-8 w-8 p-0"
            data-state={editor.isActive({ textAlign: "center" }) ? "on" : "off"}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="justify"
            aria-label="Align justify"
            className="h-8 w-8 p-0"
            data-state={editor.isActive({ textAlign: "justify" }) ? "on" : "off"}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="mx-1 h-5" />

        {/* Print / Save Action */}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
          onClick={() => window.print()}
        >
          <Printer className="h-3.5 w-3.5" />
          Print / PDF
        </Button>
      </header>

      {/* Workspace Canvas (A4 Sheet Container) */}
      <main className="flex-1 overflow-auto bg-slate-200/70 p-8">
        <div
          className="mx-auto min-h-[297mm] w-[210mm] rounded-xs bg-white p-[25mm] shadow-lg ring-1 ring-slate-900/5 transition-all print:m-0 print:w-full print:min-h-0 print:p-0 print:shadow-none print:ring-0"
          style={{
            paddingLeft: "35mm", // Left gutter clearance for court file binding tags
          }}
        >
          <EditorContent
            editor={editor}
            className="prose prose-slate max-w-none focus:outline-none [&_.tiptap]:min-h-[240mm] [&_.tiptap]:focus:outline-none"
          />
        </div>
      </main>
    </div>
  );
}