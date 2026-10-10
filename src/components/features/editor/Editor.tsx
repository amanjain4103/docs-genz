import EditorToolbar from "./EditorToolbar/EditorToolbar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, FontSize, FontFamily } from "@tiptap/extension-text-style";

const Editor = () => {
    // const { captureSelection, editorTextSelectionRef } = useEditorLocalState();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // By default StarterKit only enables levels [1, 2, 3, 4, 5, 6]
                // Ensure heading isn't set to false:
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            TextStyle,
            FontSize,
            FontFamily,
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
        // onBlur({ editor }) {
        //   if (editor) {
        //     console.log("blurrrrr", editor.state.selection);
        //     captureSelection(editor);
        //   }
        // },
    });

    if (!editor) return null;

    return (
        <div className="flex h-screen w-screen flex-col bg-slate-100 font-sans antialiased">
            {/* Top Word Processor Ribbon Toolbar */}
            <EditorToolbar editor={editor} />

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

    // return (
    //   <main className="w-full p-2">
    //     <EditorToolbar />
    //   </main>
    // );
};

export default Editor;
