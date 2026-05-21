import fs from 'fs/promises';
import https from 'https';
import path from 'path';

const SCREENS_JSON_PATH = 'C:/Users/Numan Faisal/.gemini/antigravity-ide/brain/b3acab9e-16a0-42f7-aec6-aa2ebae357d8/.system_generated/steps/25/output.txt';

const getUrl = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
};

const sanitizeHtmlToJsx = (html) => {
    let jsx = html;
    
    // Remove HTML comments
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

    // Fix malformed div attributes in landing page
    jsx = jsx.replace(/<div a="" abstract=""[\s\S]*?className="([^"]+)"[\s\S]*?>/g, '<div className="$1">');

    // Convert class and for
    jsx = jsx.replace(/class="/g, 'className="');
    jsx = jsx.replace(/for="/g, 'htmlFor="');
    
    // Fix inline styles
    jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
        if (p1.includes("font-variation-settings: 'FILL' 1;")) {
            return `style={{ fontVariationSettings: "'FILL' 1" }}`;
        }
        if (p1.includes("font-variation-settings: 'FILL' 1")) {
            return `style={{ fontVariationSettings: "'FILL' 1" }}`;
        }
        // Very basic inline style conversion to prevent crashes
        const styleParts = p1.split(';').filter(Boolean);
        const styleObjStr = styleParts.map(part => {
            let [key, val] = part.split(':');
            if(!val) return '';
            key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            val = val.trim();
            return `${key}: '${val}'`;
        }).filter(Boolean).join(', ');
        return `style={{ ${styleObjStr} }}`;
    });

    // Handle self-closing tags
    jsx = jsx.replace(/<img(.*?[^\/])>/g, '<img$1 />');
    jsx = jsx.replace(/<input(.*?[^\/])>/g, '<input$1 />');
    jsx = jsx.replace(/<hr>/g, '<hr />');
    jsx = jsx.replace(/<br>/g, '<br />');

    // Remove empty <textarea></textarea> and handle self-closing (though HTML isn't self-closing for textarea)
    // Actually React wants textarea children to be defaultValue or value, but an empty one is fine.

    // Extract body content
    const bodyMatch = jsx.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
        jsx = bodyMatch[1];
    }
    
    return `<>\n${jsx}\n</>`;
};

const processScreens = async () => {
    try {
        console.log('Reading screens JSON...');
        const screensJsonData = await fs.readFile(SCREENS_JSON_PATH, 'utf8');
        const projectData = JSON.parse(screensJsonData);
        const screens = projectData.screens;

        console.log(`Found ${screens.length} screens.`);

        for (const screen of screens) {
            if (!screen.htmlCode || !screen.htmlCode.downloadUrl) continue;
            console.log(`Processing: ${screen.title}`);
            
            let url = screen.htmlCode.downloadUrl;
            let html = await getUrl(url);
            let jsx = sanitizeHtmlToJsx(html);
            
            let route = 'other';
            const title = screen.title.toLowerCase();
            
            if (title.includes('landing page')) route = '';
            else if (title.includes('sign up') || title.includes('login')) route = 'auth/signup';
            else if (title.includes('persona selection')) route = 'onboard';
            else if (title.includes('advocate dashboard')) route = 'dashboard/advocate';
            else if (title.includes('business dashboard')) route = 'dashboard/business';
            else if (title.includes('student dashboard')) route = 'dashboard/student';
            else if (title === 'student: legal chat') route = 'student/chat';
            else if (title === 'student: research vault') route = 'student/vault';
            else if (title === 'student: contract drafts') route = 'student/drafts';
            else if (title === 'student: premium access') route = 'student/premium';
            else if (title === 'student: compliance hub') route = 'student/compliance';
            else if (title === 'advocate: compliance check') route = 'advocate/compliance';
            else if (title === 'advocate: contract drafts') route = 'advocate/drafts';
            else if (title === 'advocate: legal research') route = 'advocate/research';
            else if (title === 'advocate: case analysis') route = 'advocate/case';
            else if (title === 'business: case analysis') route = 'business/case';
            else if (title === 'business: contract drafts') route = 'business/drafts';
            else if (title === 'business: legal research') route = 'business/research';
            else if (title === 'business: compliance hub') route = 'business/compliance';
            else if (title.includes('chat interface')) route = 'chat';
            else if (title.includes('document editor')) route = 'docs/editor';
            else if (title.includes('compliance report')) route = 'comply/report';
            else if (title.includes('settings page')) route = 'settings';
            else if (title.includes('pricing page')) route = 'pricing';
            else continue; // skip non-mapped

            let pageDir = path.join('d:/lexai-frontend/src/app', route);
            await fs.mkdir(pageDir, { recursive: true });
            
            let pageContent = `export default function Page() {
  return (
${jsx}
  );
}`;
            
            await fs.writeFile(path.join(pageDir, 'page.tsx'), pageContent, 'utf8');
            console.log(`Saved to src/app/${route}/page.tsx`);
        }
        console.log('All screens processed successfully!');
    } catch (e) {
        console.error('Error processing screens:', e);
    }
};

processScreens();
