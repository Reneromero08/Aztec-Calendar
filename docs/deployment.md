# ⚠️ ARCHIVED: Legacy Next.js Deployment Guide

This document is **no longer relevant** and is kept for historical reference only.

## Migration Notice

The project has been converted from a **Next.js application** to a **pure static site**. All deployment procedures in this file are obsolete.

### What Changed?

- ❌ **Removed:** Next.js framework
- ❌ **Removed:** Node.js requirement
- ❌ **Removed:** npm build process
- ❌ **Removed:** .next directory
- ❌ **Removed:** Server runtime requirement

- ✅ **Now:** Pure HTML/CSS/JavaScript
- ✅ **Now:** Ready to deploy immediately
- ✅ **Now:** Works on any static host
- ✅ **Now:** No build step required

## Current Deployment Instructions

**Please see [`../DEPLOYMENT.md`](../DEPLOYMENT.md)** for current, correct deployment procedures.

The new guide covers:
- FTP/SFTP deployment
- GitHub Pages
- Netlify
- Other static hosts
- Post-deployment validation checklist

## Historical Context (Reference Only)

The following information is preserved for historical reference and describes the **old Next.js-based architecture**:

- Old deployment targets: Vercel, AWS, Railway, self-hosted Node.js servers
- Old process: `npm install` → `npm run build` → `npm start`
- Old requirements: Node.js 18+, npm, Docker (optional)

**This architecture has been replaced.** Do not follow the procedures below.

### Previous Technology Stack (Archived)

The project previously used:
- Next.js 13+ (full-stack React framework)
- TypeScript
- npm for package management
- Build process generating `.next/` folder
- Server runtime for request handling
- Docker containerization (optional)

### Why the Migration?

Benefits of the static approach:
- **Simpler deployment** - Just copy files to any web server
- **Faster performance** - No server overhead
- **Lower cost** - Static hosts are cheaper or free
- **Better security** - No server code to attack
- **Offline capable** - Works with simple file serving
- **More portable** - Works in any environment

---

## Keeping This Document

This file is kept in the repository to:
1. Provide historical context for contributors
2. Show the evolution of the project
3. Help with documentation completeness
4. Preserve institutional knowledge

**For all practical purposes, use [`../DEPLOYMENT.md`](../DEPLOYMENT.md) for deployment.**

---

**Last Updated:** 2024  
**Status:** ARCHIVED - Historical Reference  
**Active Document:** `../DEPLOYMENT.md`
