import '@babel/polyfill';
import { expect } from 'chai';
import {
    PastebinResults,
    PastebinHome,
} from '../../../pageObject_model/index.js';

// npx wdio run ./wdio.conf.js --spec PastebinResultPage.spec.js

describe('New page contains', function () {
    before(async function () {
        await PastebinResults.openPage(PastebinHome.urlPastebinHome);
        await PastebinResults.addNewPaste(PastebinHome.dataTextareaForTaskTwo);

        await PastebinResults.fillSelect(
            PastebinHome.syntaxSelectXpath,
            PastebinHome.syntaxListXpath,
            PastebinHome.itemXpath,
            'Bash'
        );

        await PastebinResults.fillSelect(
            PastebinHome.expirationSelectXpath,
            PastebinHome.expirationListXpath,
            PastebinHome.itemXpath,
            '10 Minutes'
        );

        await PastebinResults.addPasteName(
            'how to gain dominance among developers'
        );

        await PastebinResults.sendPaste();

        await PastebinResults.getTitleBrowsertab();

        await PastebinResults.getSavedText(
            PastebinResults,
            'savedSyntax',
            PastebinResults.savedSyntaxXpath
        );

        await PastebinResults.getSavedText(
            PastebinResults,
            'savedTextArea',
            PastebinResults.savedTextAreaXpath
        );

        await PastebinResults.transformText(
            PastebinResults,
            'savedTextArea',
            PastebinResults.savedTextArea
        );

        await PastebinResults.transformText(
            PastebinHome,
            'dataTextareaForTaskTwo',
            PastebinResults.dataTextareaForTaskTwo
        );
    });

    it('Data entered in the input "Paste title" save to tab', function () {
        expect(PastebinResults.titleBrowserTab).to.include(
            'how to gain dominance among developers'
        );
    });
    it('The syntax matches the selected ', function () {
        expect(PastebinResults.savedSyntax).to.be.equal('Bash');
    });
    it('Data entered in the input "Paste title" save to textarea field', function () {
        expect(PastebinResults.savedTextArea).to.deep.equal(
            PastebinHome.dataTextareaForTaskTwo
        );
    });
});