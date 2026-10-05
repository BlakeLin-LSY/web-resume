import profile from "../../content/resume-profile.json";
import cases from "../../content/project-case-studies.json";
import notes from "../../content/engineering-notes.json";
import assets from "../../content/resume-assets.json";
import { renderResume } from "../../scripts/lib/resume-markup.mjs";
import { resumeReadingScript } from "../../scripts/lib/resume-reading.mjs";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return <>
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: renderResume(profile, cases, assets, basePath, notes) }} />
    <script dangerouslySetInnerHTML={{ __html: resumeReadingScript(profile) }} />
  </>;
}
