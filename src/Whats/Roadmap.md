# Product Blueprint & Build Plan: Legal Word Processor

## 1. Technical Stack (Strict Performance Rules)

* **Desktop Shell:** Tauri v2 (Rust backend). Keeps RAM usage below 100MB and app installer size under 20MB.
* **Editor Core:** TipTap + ProseMirror (MIT open source). Gives full control over the document tree without cloud lock-ins.
* **UI Framework:** React + TypeScript + Vite.
* **UI Kit & Styling:** Tailwind CSS + shadcn/ui (Radix primitives). Build-time CSS only; zero runtime CSS-in-JS lag.
* **Offline Storage:** Dexie.js (IndexedDB wrapper) for auto-saving every keystroke locally, plus local disk access via Tauri FS plugin.
* **Fonts:** Bundled offline TTF files (`Mangal`, `Nirmala UI`, `Krutidev010`).

---

## 2. Execution Roadmap

```
Phase 1: Core Layout Engine & Stamp Geometry (Hard Technical Problems First)
   │
Phase 2: Form Engine, Variables & Template System (Core Workflow Fix)
   │
Phase 3: Local File Management & Client Directory (Offline Workspace)
   │
Phase 4: ID OCR & Legal AI Integration (Automation & Efficiency)
   │
Phase 5: Cloud Sync, Backup & Launch (Packaging & Release)

```

---

### Phase 1: Core Layout Engine & Stamp Geometry (P0)

*The priority here is validating that low-spec machines stay fast and printing has zero layout shift.*

* **Fixed Page Canvas:**
* Build exact containers for **A4** (210mm × 297mm) and **Indian Legal** (8.5" × 14").
* Enforce court filing margins: Default left gutter at 1.75" to 2.0" for file binding/thread tagging.


* **Automated Stamp Paper Offsets:**
* Implement a 1-click toggle for Non-Judicial Stamp Paper (₹50 / ₹100 / ₹500):
* Page 1 automatically leaves 3.5" to 4.5" blank margin at the top.
* Page 2 onwards automatically reverts back to the standard 1" top margin.


* Reserved corner box preset for court fee ticket stamps.


* **Print Fidelity:**
* Configure print CSS so that screen layout maps 1:1 to physical print. Zero lines wrapping onto accidental extra pages.


* **Hindi Font Engine:**
* Bundle `Krutidev010.ttf` and standard Unicode fonts locally via `@font-face`.
* Build a fast offline regex utility to convert pasted Kruti Dev text into standard Unicode Hindi (and back) without breaking document layout.


* **Hardware Benchmark Target:**
* Test on a 4GB RAM machine with 40+ pages. Typing latency must stay under 16ms, and scrolling must not drop frames.



---

### Phase 2: Form Engine, Dynamic Variables & Templates (P0)

*Eliminating manual search-and-replace and stopping copy-paste mistakes.*

* **Atomic Variable Nodes:**
* Create custom TipTap inline nodes for document placeholders: `{{Client_Name}}`, `{{Opposite_Party}}`, `{{Father_Name}}`, `{{Address}}`, `{{Court_Name}}`, `{{Case_No}}`.


* **Sidebar Form Generator:**
* When any template opens, the sidebar automatically extracts all placeholders into a clean form.
* Changing a value in the sidebar instantly updates all matching instances across the entire document.


* **Custom Clause Block:**
* Add a dedicated expandable block inside templates for "Additional Averments / Special Terms" so staff can insert custom client conditions without breaking the boilerplate text.


* **Starter Legal Template Pack:**
* Affidavits (Name correction, loss of documents, general affidavit).
* Deeds & Notices (Rent agreement, general sale agreement, legal demand notice).
* Court Pleadings (Cause title format, petition structure, standard verification clause).



---

### Phase 3: Local Workspace & Client Directory (P0)

*Setting up local file organization once the document schema is working.*

* **Auto-Save Engine:**
* Debounced 500ms auto-save to local IndexedDB via Dexie.js. Power failure or sudden restart should never lose work.


* **Client Record Profiles:**
* Save a client’s basic details once (Name, Father's Name, Age, Address, ID numbers).
* In the next visit, select the client and auto-fill any new affidavit or agreement in one click.


* **Fast Local Document Search:**
* Search saved drafts by Client Name, Phone Number, or Case Number with instant results.


* **Direct Export:**
* Clean local export to `.docx` and court-ready `.pdf` directly to disk using Tauri file dialogs.



---

### Phase 4: Local OCR & Contextual Legal AI (P1)

*Speeding up manual data entry and drafting.*

* **ID Document Scanner (Local OCR):**
* Allow dragging an Aadhaar or PAN photo directly into the form sidebar.
* Extract Name, Father's Name, DOB, and Address automatically using an offline OCR worker to eliminate typing typos.


* **Legal Averment Generator:**
* Quick transform tool: Turn rough client statements into formal court legalese (e.g., *"Tenant not paying since May"* → formal default averment).
* Inline `/clause` command bar for inserting standard legal clauses (arbitration, jurisdiction, severability).



---

### Phase 5: Backup, Cloud Add-ons & Launch (P2)

* **1-Click Backup:**
* Automated daily ZIP archive of all drafts and templates to a pen drive or user-specified folder.


* **Multi-PC Setup (Optional Cloud Sync):**
* Optional sync for shops/offices with multiple counters (e.g., front desk creates the draft, back desk reviews and prints).


* **Packaging:**
* Compile clean Windows installers (`.msi` / `.exe`) and Linux packages (`.deb`) via Tauri v2. Target installer footprint: < 20MB.