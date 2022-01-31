import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheetManager } from 'styled-components';

const css = `
    * {
        box-sizing: border-box;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  
    body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f8f8f8;
    }
`;

function ReactIframe({ renderId, children, ...props }) {
    const contentRef = useRef(null);
    const doc = contentRef.current?.contentWindow?.document;
    const [iframeBody, setIframeBody] = useState(null);

    const insertionTarget = doc?.createElement('link');
    if (insertionTarget) {
        doc.head?.append(insertionTarget);
    }

    useLayoutEffect(() => {
        if (!doc && !iframeBody) {
            return;
        }

        const style = doc?.createElement('style');
        style.type = 'text/css';

        const root = doc?.createElement('link');
        root.rel = 'stylesheet';
        root.type = 'text/css';
        // root.href = process.env.PUBLIC_URL + '/css/root.css'; other css files
        doc.head.append(root);

        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        doc.head.append(style);

        window.iframeWindow = contentRef.current?.contentWindow;
    }, [iframeBody]);

    const handleLoad = (e) => {
        if (iframeBody) {
            return;
        }

        !e.defaultPrevented && setIframeBody(e.target.contentDocument.body);
    };

    return (
        <iframe
            srcDoc={`<!DOCTYPE html>`}
            title="Public"
            ref={contentRef}
            width="100%"
            height="100%"
            onLoad={handleLoad}
            style={{
                border: 'none',
            }}
            {...props}
        >
            {iframeBody &&
                createPortal(
                    <StyleSheetManager target={insertionTarget}>
                        <div id={renderId}>{children}</div>
                    </StyleSheetManager>,
                    iframeBody,
                )}
        </iframe>
    );
}

export default ReactIframe;
