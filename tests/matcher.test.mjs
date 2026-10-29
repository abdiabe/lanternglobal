import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('../src/content/matcher.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {businesses,roles,businessRoles,inquiryHref}=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
test('all business suggestions resolve to unique documented roles',()=>{
 assert.equal(new Set(roles.map(r=>r.slug)).size,12);
 assert.equal(new Set(businesses.map(b=>b.slug)).size,10);
 for(const b of businesses){const matches=businessRoles(b);assert.ok(matches.length>=2);for(const r of matches){assert.ok(r,`${b.slug} references a missing role`);assert.ok(r.boundary);assert.ok(r.tasks.length>=4);}}
});
test('prefilled inquiry links preserve industry and role names including ampersands',()=>{
 for(const b of businesses){const url=new URL(inquiryHref(b),'https://example.com');assert.equal(url.pathname,'/book-a-call');assert.equal(url.searchParams.get('industry'),b.name);assert.equal(url.searchParams.get('roles'),businessRoles(b).map(r=>r.name).join(', '));}
});
