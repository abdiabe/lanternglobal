import fs from 'node:fs';
import ts from 'typescript';
import {execFileSync} from 'node:child_process';
const paths=[...new Set([...execFileSync('git',['diff','--name-only'],{encoding:'utf8'}).trim().split('\n'),...execFileSync('git',['ls-files','--others','--exclude-standard'],{encoding:'utf8'}).trim().split('\n')])];
const printer=ts.createPrinter({newLine:ts.NewLineKind.LineFeed});
for(const p of paths.filter(p=>/\.tsx?$/.test(p)&&fs.existsSync(p))){const sf=ts.createSourceFile(p,fs.readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true,p.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);fs.writeFileSync(p,printer.printFile(sf));}
console.log('Formatted changed TypeScript files with the TypeScript printer.');
