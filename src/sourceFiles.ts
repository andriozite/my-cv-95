// Import semua source files sebagai raw strings menggunakan Vite's ?raw feature
import mainTsx from './main.tsx?raw';
import appTsx from './App.tsx?raw';
import indexCss from './index.css?raw';
import dataTs from './data.ts?raw';
import iconsTsx from './icons.tsx?raw';
import bootTsx from './screens/Boot.tsx?raw';
import windowTsx from './win95/Window.tsx?raw';
import desktopTsx from './win95/Desktop.tsx?raw';
import resumeAppTsx from './apps/ResumeApp.tsx?raw';
import aboutAppTsx from './apps/AboutApp.tsx?raw';
import experienceAppTsx from './apps/ExperienceApp.tsx?raw';
import skillsAppTsx from './apps/SkillsApp.tsx?raw';
import terminalAppTsx from './apps/TerminalApp.tsx?raw';
import miscAppsTsx from './apps/MiscApps.tsx?raw';

import packageJson from '../package.json?raw';
import indexHtml from '../index.html?raw';
import viteConfigJs from '../vite.config.js?raw';
import tsconfigJson from '../tsconfig.json?raw';

export interface SourceFile {
  path: string;
  content: string;
}

export const SOURCE_FILES: SourceFile[] = [
  { path: 'index.html', content: indexHtml },
  { path: 'package.json', content: packageJson },
  { path: 'vite.config.js', content: viteConfigJs },
  { path: 'tsconfig.json', content: tsconfigJson },
  { path: 'src/main.tsx', content: mainTsx },
  { path: 'src/App.tsx', content: appTsx },
  { path: 'src/index.css', content: indexCss },
  { path: 'src/data.ts', content: dataTs },
  { path: 'src/icons.tsx', content: iconsTsx },
  { path: 'src/screens/Boot.tsx', content: bootTsx },
  { path: 'src/win95/Window.tsx', content: windowTsx },
  { path: 'src/win95/Desktop.tsx', content: desktopTsx },
  { path: 'src/apps/ResumeApp.tsx', content: resumeAppTsx },
  { path: 'src/apps/AboutApp.tsx', content: aboutAppTsx },
  { path: 'src/apps/ExperienceApp.tsx', content: experienceAppTsx },
  { path: 'src/apps/SkillsApp.tsx', content: skillsAppTsx },
  { path: 'src/apps/TerminalApp.tsx', content: terminalAppTsx },
  { path: 'src/apps/MiscApps.tsx', content: miscAppsTsx },
];
