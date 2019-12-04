import * as React from 'react';
import * as ReactDom from 'react-dom';
import "@babel/polyfill";
import App from "@app/containers/App";
import apiFactory from "@shared/client/http/api";
import getStore from "@app/store/store";
import {Provider} from "react-redux";



// @ts-ignore
window.generatePDF = (data) => {
    const blob = new Blob([data], {
        type: 'application/pdf'
    });
    // if (pdfFileBlobURL !== null) {
    //     URL.revokeObjectURL(pdfFileBlobURL);
    // }
    const pdfFileBlobURL = URL.createObjectURL(blob);
    // for debugging purposes, open another window
    //window.open(pdfFileBlobURL, "_blank");
    // window.location.href = pdfFileBlobURL;
    const a = document.createElement('a');
    a.href = pdfFileBlobURL;
    a.download = 'test.pdf';
    a.target = "_blank";
    a.click();
}

// @ts-ignore
window.jsonOut = (data) => {
    console.log(JSON.stringify(data));
};


const api = apiFactory({baseURL: "/doc"});
const store = getStore({}, {api});
ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'))
