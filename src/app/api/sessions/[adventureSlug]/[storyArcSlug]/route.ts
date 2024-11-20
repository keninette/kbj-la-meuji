import { NextRequest } from 'next/server';
import path from 'path';
import * as fs from 'fs';
import { SessionMapper } from '@/model/sessions/session.mapper';

const sessionsDirPath: string = path.join(process.cwd(), '/src/lib/data/sessions');

/**
 * Get data from JSON
 * @param request
 * @constructor
 */
async function GET(request: NextRequest, { params }: { params: { adventureSlug: string; storyArcSlug: string } }) {
  const mapper = new SessionMapper();
  const targetPath = `${sessionsDirPath}/${params.adventureSlug}/${params.storyArcSlug}`;
  if (!fs.existsSync(targetPath)) {
    return Response.json([]);
  }
  const sessionFiles: string[] = fs.readdirSync(targetPath, {
    encoding: 'utf-8',
    recursive: true,
  });

  // todo do i need mapper ?
  const sessions = sessionFiles
    .map((sessionFile) => {
      if (fs.lstatSync(targetPath + '/' + sessionFile).isFile()) {
        const content = fs.readFileSync(`${targetPath}/${sessionFile}`, 'utf-8');
        return mapper.mapFromJson(content);
      }
    })
    .filter((session) => session !== undefined);

  return Response.json(sessions);
}

export { GET };
