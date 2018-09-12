import { messageBox } from '../messageBox/index.js';
import pressAnyKey from './pressAnyKey.js';

export default async () => {
    messageBox.show(
        'welcome, <span class="grn">captain katamov!</span><br><br>' +
            'Your shift as chief network security officer is about to begin… all users are online and happy. ' +
            'in case of virus intrusion, <span class="grn">cut them off</span> from the network ' +
            "to make sure they don't get infected!<br><br>" +
            '<table><tr><td class="grn">arrow keys</td><td>…</td><td>change direction</td></tr>' +
            '<tr><td class="grn">space bar</td><td>…</td><td>drop bomb</td></tr>' +
            '<tr><td class="grn">return</td><td>…</td><td>teleport to server</td></tr>' +
            '</table><br>press any key to begin!'
    );
    await pressAnyKey();
    messageBox.clear();
};
