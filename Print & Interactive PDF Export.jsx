/* --------------------------------------
ICNC Export v1.0
by Aaron Troia (@atroia)
Modified Date: 2/5/22

Description: 
Custom Export for ICNC documents

- need to add a custom page range option from the panel
-------------------------------------- */

#targetengine "session"

var scriptName = "ICNC Export";
var g = {};
var d = app.activeDocument;

main();

function main() {
  if (app.documents.length == 0) {
    alert("No documents are open.");
  } else {
    createDialog();
    g.win.show();
  }
}

function createDialog() {
  // create panel
  g.win = new Window("palette", scriptName);
  g.win.pnlScope = g.win.add("panel");

  // CHECKBOXES
  // Drafts Export
  g.win.drafts = g.win.add("panel", undefined, "Drafts");
  g.win.drafts.alignChildren = "left";
  g.win.drafts.minimumSize = [235,20];

  //Draft 1
  g.win.drafts.chkDraft1 = g.win.drafts.add(
    "checkbox",
    undefined,
    "Round 1"
  );
  g.win.drafts.chkDraft1.value = false;
  
  //Draft 2
  g.win.drafts.chkDraft2 = g.win.drafts.add(
    "checkbox",
    undefined,
    "Round 2"
  );
  g.win.drafts.chkDraft2.value = false;
  
  //Draft 3
  g.win.drafts.chkDraft3 = g.win.drafts.add(
    "checkbox",
    undefined,
    "Round 3"
  );
  g.win.drafts.chkDraft3.value = false;

  //Draft 4
  g.win.drafts.chkDraft4 = g.win.drafts.add(
    "checkbox",
    undefined,
    "Round 4"
  );
  g.win.drafts.chkDraft4.value = false;

  // FINAL PDFs Export
 g.win.finals = g.win.add("panel", undefined, "Final PDFs");
  g.win.finals.alignChildren = "left";
  g.win.finals.minimumSize = [235,20];

  // Ingram body PDF
  g.win.finals.chkBody = g.win.finals.add(
    "checkbox",
    undefined,
    "Ingram (Body)"
  );

  // Interactive PDF
    g.win.finals.chkInteractive = g.win.finals.add(
    "checkbox", 
    undefined, 
    "Interactive PDF"
    );

  // Ingram cover PDF
  g.win.cover = g.win.add("panel", undefined, "Cover");
  g.win.cover.alignChildren = "left";
  g.win.cover.minimumSize = [235,20];
  g.win.cover.chkCover = g.win.cover.add(
    "checkbox",
    undefined,
    "Ingram (Cover)"
  );

  // IDML checkbox
  g.win.idml = g.win.add("panel", undefined, "IDML Export");
  g.win.idml.alignChildren = "left";
  g.win.idml.minimumSize = [235,20];
  g.win.idml.chkIDML = g.win.idml.add(
    "checkbox", 
    undefined, 
    "IDML File"
    );
    g.win.idml.chkIDML.value = true;


  for (var i = 0; i < g.win.drafts.length; i++) {
    g.win.drafts.children[i].value = true;
  }
    for (var i = 0; i < g.win.finals.length; i++) {
    g.win.finals.children[i].value = true;
  }
    for (var i = 0; i < g.win.idml.length; i++) {
    g.win.idml.children[i].value = true;
  }
    for (var i = 0; i < g.win.cover.length; i++) {
    g.win.cover.children[i].value = true;
  }

  // BUTTONS
  g.win.grButs = g.win.add("group");
  g.win.grButs.cancel = g.win.grButs.add("button", undefined, "Cancel");
  g.win.grButs.export = g.win.grButs.add("button", undefined, "Export");
  // export button
  g.win.grButs.export.onClick = function(){
      exportPDF();
    g.win.close();
  };
  // cancel button
  g.win.grButs.cancel.onClick = function() {
    g.win.close();
  };
}

// this is the PDF export function
function exportPDF() {
  // These are the PDF Export settings names from InDesign
  var bleed_preset         = app.pdfExportPresets.itemByName("Prepress (with Bleed)");
  var nobleed_preset       = app.pdfExportPresets.itemByName("Prepress (no Bleed)");
  var icnc_draft           = app.pdfExportPresets.itemByName("ICNC Drafts");
  var ingram_spark         = app.pdfExportPresets.itemByName("Ingram Spark");
  var ingram_cover         = app.pdfExportPresets.itemByName("Ingram Spark (Cover)");
 
 try {
  if (!(bleed_preset.isValid && nobleed_preset.isValid && ingram_spark.isValid && ingram_cover.isValid)) {
    alert(
      "One of the presets does not exist. Please check spelling carefully."
    );
    exit();
  }

  if (d.saved){ 
    thePath = String(d.fullName).replace(/\..+$/, "") + ".pdf"; 
    thePath = String(new File(thePath)); 
  } else { 
    thePath = String((new File)); 
  } 

  thePath = thePath.replace(/\.pdf$/, "");
  thePath2 = thePath.replace(/(\d+b|\.pdf$)/, "");
  // Here you can set the suffix at the end of the file name
  draft1 = thePath + "_Draft1.pdf";
  draft2 = thePath + "_Draft2.pdf"; 
  draft3 = thePath + "_Draft3.pdf"; 
  draft4 = thePath + "_Draft4.pdf"; 
  idml = thePath + ".idml"; 
  final_print = thePath +"_Print_FINAL.pdf"; 
  final_cover = thePath +".pdf";


  // Draft 1
  if(g.win.drafts.chkDraft1.value == true){
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
    app.activeDocument.layers.item("Bookline").visible = true; // turn on Bookline for spreads export
    d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(draft1), false, icnc_draft);
  };

  // Draft 2
  if(g.win.drafts.chkDraft2.value == true){
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
    app.activeDocument.layers.item("Bookline").visible = true; // turn on Bookline for spreads export
    d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(draft2), false, icnc_draft);
  };

  // Draft 3
  if(g.win.drafts.chkDraft3.value == true){
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
    app.activeDocument.layers.item("Bookline").visible = true; // turn on Bookline for spreads export
    d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(draft3), false, icnc_draft);
  };

  // Draft 4
  if(g.win.drafts.chkDraft4.value == true){
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
    app.activeDocument.layers.item("Bookline").visible = true; // turn off Bookine layer (if it is visible) for single page export
    d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(draft4), false, icnc_draft);
  };

  // Ingram Body PDF
  var lastPage = d.pages[d.pages.length-3].name;
  if(g.win.finals.chkBody.value == true){
    app.pdfExportPreferences.pageRange = String("i-iv, 1-" + lastPage);
    app.activeDocument.layers.item("Bookline").visible = false; // turn off Bookine layer (if it is visible) for single page export
    d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(final_print), false, ingram_spark);
  };

  // Ingram Cover PDF
  if(g.win.cover.chkCover.value == true){
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
    d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(final_cover), false, ingram_cover);
  };

  // IDML
  if(g.win.idml.chkIDML.value == true){
    app.pdfExportPreferences.pageRange = PageRange.ALL_PAGES;
    d.asynchronousExportFile(ExportFormat.INDESIGN_MARKUP, new File(idml)); // IDML EXPORT
  };

    // JPG
  if(g.win.finals.chkInteractive.value == true){
    exportInteractive();
  }
 } catch(e){
  alert(e.line);
 }
}

// EXPORT Interactive PDF
function exportInteractive() {
  app.interactivePDFExportPreferences.properties = {
    pageRange: PageRange.ALL_PAGES,
    exportReaderSpreads: false,
    pdfMagnification: PdfMagnificationOptions.DEFAULT_VALUE,
    pdfPageLayout: PageLayoutOptions.DEFAULT_VALUE,
    openInFullScreen: false,
    viewPDF: false,
    pageTransitionOverride: PageTransitionOverrideOptions.FROM_DOCUMENT,
    interactivePDFInteractiveElementsOption: InteractivePDFInteractiveElementsOptions.INCLUDE_ALL_MEDIA,
    generateThumbnails: true, // Embed page thmbnails
    includeStructure: false, // create tagged PDF
    pdfJPEGQuality: PDFJPEGQualityOptions.MAXIMUM,
    pdfRasterCompression: PDFRasterCompressionOptions.JPEG_COMPRESSION,
    rasterResolution: 300,
    pdfDisplayTitle: PdfDisplayTitleOptions.DISPLAY_FILE_NAME,
    defaultDocumentLanguage: "English: USA",
  }

  if (d.saved) {
    thePath = String(d.fullName).replace(/\..+$/, "") + ".jpg";
    thePath = String(new File(thePath));
  } else {
    thePath = String(new File());
  } 

  thePath = thePath.replace(/\.pdf$/, ""); 
  final_interactive = thePath +"_Interactive_FINAL.pdf";  

  try {
    if (app.activeDocument.layers.item("Bookline").isValid == true){
      app.activeDocument.layers.item("Bookline").visible = false; // turn off Bookine layer (if it is visible) for single page export
      d.exportFile(ExportFormat.INTERACTIVE_PDF, new File(final_interactive), false);
    } else { // if no layer named "Bookline" exisits
      d.exportFile(ExportFormat.INTERACTIVE_PDF, new File(final_interactive), false);
    }
  } catch (errExport) {
    alert(errExport.line);
  }
}