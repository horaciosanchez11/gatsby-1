import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
    return S.list().title(`Slick's Slices`).items([
        S.listItem()
            .title('Home Page')
            .icon(() => <strong>H</strong>)
            .child(
                S.editor()
                    .schemaType('storeSettings')
                    // make new document id
                    .documentId('downtown')
            ),
            // add in the rest of our document items
            ...S.documentTypeListItems().filter(item => item.getId() !== 'storeSettings'),
    ]);
}