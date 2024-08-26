import { IterateLSD, LSD, PathKind } from '../src/lib/ericchase/Platform/Cxx/LSD.js';
import { Run } from '../src/lib/ericchase/Platform/Node/Process.js';
import { ProcessTemplateFile, RegisterIncludeSource } from '../src/lib/ericchase/Platform/Web/HTML/TemplateProcessor.js';

const links: string[] = [];
await IterateLSD(LSD({ path: './src', filter: '*.user.css' }), PathKind.File, ({ path }) => {
  links.push(`<a href="./src/${path}" target="_blank">${path}</a>`);
});

RegisterIncludeSource('links', links.join('\n'));
await ProcessTemplateFile('./index.template.html', './index.html');
await Run({ program: 'bun', args: ['run', 'format'] });
