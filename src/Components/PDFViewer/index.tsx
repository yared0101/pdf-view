import { Document, Page, pdfjs } from "react-pdf";
import React, { useEffect, useState } from "react";
import "./index.css";
type PDFViewrProps = {
    PDF: string;
};
function PDFViewer({ PDF }: PDFViewrProps) {
    const [page, setPage] = useState(1);
    const [disableNext, setDisableNext] = useState(false);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const next = () => {
        setPage((pageNum) => pageNum + 1);
    };
    const prev = () => {
        setPage((pageNum) => pageNum - 1);
        if (disableNext) {
            setDisableNext(false);
        }
    };
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" && page > 1) {
                prev();
            } else if (e.key === "ArrowRight" && !disableNext) {
                next();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [page, disableNext]);
    return (
        <div className="pdf-page">
            <Document
                file={PDF}
                renderMode="canvas"
                /* @ts-ignore */
                onContextMenu={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => e.preventDefault()}
                className="pdf-container"
            >
                <Page
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    onClick={() => !disableNext && next()}
                    onLoadError={() => {
                        // alert("This is the last page"); Isn't necessary.
                        setPage((pageNum) => pageNum - 1);
                        setDisableNext(true);
                    }}
                />
            </Document>
            <div className="button-adjust">
                <div>Page: {page}</div>
                <button onClick={prev} disabled={page == 1}>
                    Prev
                </button>
                <button onClick={next} disabled={disableNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default PDFViewer;
