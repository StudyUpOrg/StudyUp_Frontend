import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DownloadFileService {
    public downloadFile(blob: any, fileName: string): void {
        if (blob == null || fileName == null) {
            return;
        }
        const objectUrl = URL.createObjectURL(blob);
        const anchorElement: HTMLAnchorElement = document.createElement(
            'a'
        ) as HTMLAnchorElement;

        anchorElement.href = objectUrl;
        anchorElement.download = fileName;
        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        URL.revokeObjectURL(objectUrl);
    }
}
