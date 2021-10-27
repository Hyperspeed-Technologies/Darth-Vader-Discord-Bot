import fs from 'fs';
import path from 'path';

export const getAllFiles = (dir: any, extension: any) => {
    // const dir = path.join(__dirname, '../commands')

    // console.log(dir)
    const files = fs.readdirSync(dir, {
        withFileTypes: true,
    });
    let tsFiles: any = [];

    for(const file of files) {
        if(file.isDirectory()) {
            tsFiles = [...tsFiles, ...getAllFiles(`${dir}/${file.name}`, extension)]
        }
        else if (file.name.endsWith(extension) && !file.name.startsWith('!')) {
            let fileName: any = file.name.replace(/\\/g, '/').split('/');
            fileName = fileName[fileName.length - 1];
            fileName = fileName.split('.')[0].toLowerCase();
            tsFiles.push([`${dir}/${file.name}`, fileName])
        }
    }
    return tsFiles
}