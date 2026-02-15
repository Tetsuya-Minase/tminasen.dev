import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export type CompareScreenshotsInput = {
  productionPath: string;
  previewPath: string;
  diffPath: string;
  reportPath?: string;
  comparisonThreshold?: number;
  pixelmatchThreshold?: number;
};

export type CompareScreenshotsResult = {
  diffPixels: number;
  totalPixels: number;
  diffRatio: number;
  threshold: number;
};

function ensureDirectory(filePath: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export async function compareScreenshots(
  input: CompareScreenshotsInput,
): Promise<CompareScreenshotsResult> {
  const productionBuffer = fs.readFileSync(input.productionPath);
  const previewBuffer = fs.readFileSync(input.previewPath);
  const production = PNG.sync.read(productionBuffer);
  const preview = PNG.sync.read(previewBuffer);

  if (
    production.width !== preview.width ||
    production.height !== preview.height
  ) {
    throw new Error('Screenshot dimensions do not match');
  }

  const diff = new PNG({ width: production.width, height: production.height });
  const diffPixels = pixelmatch(
    production.data,
    preview.data,
    diff.data,
    production.width,
    production.height,
    {
      threshold: input.pixelmatchThreshold ?? 0.1,
    },
  );
  const totalPixels = production.width * production.height;
  const diffRatio = totalPixels === 0 ? 0 : diffPixels / totalPixels;
  const threshold = input.comparisonThreshold ?? 0.001;

  ensureDirectory(input.diffPath);
  fs.writeFileSync(input.diffPath, PNG.sync.write(diff));

  if (input.reportPath) {
    ensureDirectory(input.reportPath);
    fs.writeFileSync(
      input.reportPath,
      JSON.stringify(
        {
          diffPixels,
          totalPixels,
          diffRatio,
          threshold,
        },
        null,
        2,
      ),
    );
  }

  return {
    diffPixels,
    totalPixels,
    diffRatio,
    threshold,
  };
}
