import * as React from 'react';
import * as ReactDom from 'react-dom';
import "@babel/polyfill";
import App from "@app/containers/App";
import {HMRProvider} from "@shared/store/HotProvider";
import apiFactory from "@shared/client/http/api";
import getStore from "@app/store/store";
import {getStoreRef} from "@shared/store/createStore";

declare const module: NodeModule & { hot: any };


window.generatePDF = ( data ) => {
    const blob = new Blob( [ data ], {
        type: 'application/pdf'
    } );
    // if (pdfFileBlobURL !== null) {
    //     URL.revokeObjectURL(pdfFileBlobURL);
    // }
    const pdfFileBlobURL = URL.createObjectURL( blob );
    // for debugging purposes, open another window
    //window.open(pdfFileBlobURL, "_blank");
    // window.location.href = pdfFileBlobURL;
    const a = document.createElement( 'a' );
    a.href = pdfFileBlobURL;
    a.download = 'test.pdf';
    a.target = "_blank";
    a.click();
}

window.jsonOut = ( data ) => {
    console.log( JSON.stringify( data ) );
};


const api = apiFactory({baseURL: "/doc"});
const store = getStore({}, {api});
if (module.hot) {
    console.log('index hot app');
    module.hot.accept()
    module.hot.dispose(() => {
        console.log('re render the app now');
        const api = require('@shared/client/http/api').default({baseURL: "/doc"})
        const oldStore = getStoreRef()
        const store = require('@app/store/store').default({preloadState: {...oldStore.getState()}}, {api})
        // @ts-ignore
        window.updateStore && window.updateStore(store);
    })
}
ReactDom.render(
    <HMRProvider store={store}>
        <App/>
    </HMRProvider>
    , document.getElementById('root'))
