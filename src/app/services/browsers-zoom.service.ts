import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class BrowsersZoom {
    constructor() {}

    browsersMethod(meta: Meta) {
        if (this.getMobileOperatingSystem() === 'iOS') {
            const viewportMeta = meta.getTag('name=viewport');
            if (viewportMeta) {
                viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
            }
        }
    }
    /**
     * Determine the mobile operating system.
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     *
     * @returns {String}
     */

    getMobileOperatingSystem() {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }

        if (/android/i.test(userAgent)) {
            return 'Android';
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            return 'iOS';
        }
        return 'unknown';
    }

}