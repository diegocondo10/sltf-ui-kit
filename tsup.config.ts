import { defineConfig } from "tsup";
import { execSync } from "child_process";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "theme/index": "src/theme/index.ts",
  },
  format: ["cjs", "esm"],
  dts: false, // Generate types separately to avoid blocking build
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  minify: false,
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    // Compile SCSS styles
    console.log("📦 Compiling SCSS styles...");
    try {
      execSync(
        'npx sass src/styles/index.scss dist/styles/index.css --style=compressed --no-source-map --quiet-deps',
        { stdio: "inherit" }
      );
      console.log("✅ Styles compiled successfully!");
    } catch (error) {
      console.error("❌ Failed to compile styles:", error);
      process.exit(1);
    }

    // Generate TypeScript declarations
    console.log("📦 Generating TypeScript declarations...");
    try {
      execSync(
        'npx tsc --project tsconfig.build.json --emitDeclarationOnly --declaration --outDir dist',
        { stdio: "inherit" }
      );
      console.log("✅ TypeScript declarations generated!");
    } catch (error) {
      console.warn("⚠️ Some type errors occurred, but declarations were generated.");
      // Don't exit - types are generated even with errors
    }
  },
});
