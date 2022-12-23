import { useState } from "react";
import "./App.css";
// import PDFViewer from "./Components/PDFViewer";
import PDF from "./document.pdf";
import PdfViewOnly from "@yaredt/react-pdf-view";
function App() {
    const handlePdfInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("File Inputted");
        const files = e.target.files;
        if (files?.length) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setPdfFile(e?.target?.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };
    const [pdfFile, setPdfFile] = useState("");
    return (
        <div className="App">
            Choose Pdf:{" "}
            <input
                onInput={handlePdfInput}
                type="file"
                accept=".pdf"
                className="file-input"
            />
            {/* <PDFViewer PDF={pdfFile || PDF} /> */}
            <PdfViewOnly PDF={pdfFile || PDF} />
        </div>
    );
}

export default App;
