import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// set up axe core render base on https://github.com/dequelabs/axe-core/blob/develop/doc/examples/jest_react/test-helpers.js
// default rules on run here https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
let wrapper: HTMLElement;
declare var jsdom: any;

export function mountToDoc(reactElm: JSX.Element) {
    if (!document) {
        // Set up a basic DOM
        global.document = jsdom('<!doctype html><html><body></body></html>');
    }
    if (!wrapper) {
        wrapper = document.createElement('main');
        document.body.appendChild(wrapper);
    }

    const container = mount(reactElm);
    wrapper.innerHTML = '';
    wrapper.appendChild(container.getDOMNode());
    return container;
}
