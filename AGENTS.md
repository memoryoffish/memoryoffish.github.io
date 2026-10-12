# Blog maintenance

- User explicitly chose the original **Hexo + Shoka 0.2.5** design. Do not switch frameworks/themes again or introduce the cream academic homepage styling. References may inform project content organization.
- Public-facing identity is 李业 / Ye Li. Remove the nickname 小丑鱼; keep memoryoffish only where it is the actual GitHub account or URL. The homepage starts with a personal introduction, followed by research projects and notes.
- Preserve the header, wave divider, article cards and sidebar. No music/player, fireworks, loading masks, autoplay media, decorative transitions, remote fonts or CDN dependencies.
- Preserve old article URLs and `/pdfs/mips.pdf`. Do not import private notes automatically. Public project entries include ATAS, ReCA and Game24 GRPO; distinguish preprints from accepted publications, and examples from measured results. The user confirmed ATAS equal-first authorship; its public project page also marks Ye Li with equal contribution.
- The published source branch is `main`; create a work branch for changes. The old generated site remains on `master`. Do not push or change GitHub Pages settings without user authorization.
- Run `npm run check` and verify desktop/mobile, sidebar, theme toggle, search and copy in a browser. Hexo exit 0 alone is insufficient; `tools/build.js` catches logged rendering errors.
- Packages are pinned by `package-lock.json`. Original Shoka is vendored under `themes/shoka`, with provenance in `UPSTREAM.md`. Preserve its MIT license and document local edits.
- Hexo loads all files under `scripts/` as JavaScript plugins. Place maintenance scripts/tests in `tools/`.
- Math uses `\(...\)`, `\[...\]`, `$$...$$`; `$s1` and other registers are not math. Render math and code highlighting at build time.
- Do not print credentials from the old generated `js/app.js` or copy its service keys/music playlists into this site.
