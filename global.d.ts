import { JSDOM } from 'jsdom';

declare type CustomeJSDOM = JSDOM & Document;

declare global {
    function jsdom(value: string): CustomeJSDOM;
}
