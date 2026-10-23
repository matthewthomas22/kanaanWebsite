# Kanaan Website

Design assets and references for the Kanaan website. This initial snapshot contains
images and editable design documents; website application code has not been added yet.

## Contents

- Root PNG files: icons, decorative assets, teacher portraits, and website references.
- `Gambaran Website Kanaan.png` and screenshots: visual design references.
- `Foto Profil Kanaan Kids/`: profile images, background-removed variants, and an editable design document.
- `.af` files: original editable design documents. Both existing versions are preserved.

## Continue on a MacBook

Clone the repository:

```sh
git clone https://github.com/matthewthomas22/kanaanWebsite.git
cd kanaanWebsite
```

Images can be viewed directly. Use a compatible design application to edit `.af` files.
No dependency installation or development server is required for this asset snapshot.
When application code is added, document its runtime version, installation steps,
and development commands here, and commit its dependency manifest and lockfile.

Install any AI or editor tools separately on each computer. Their local installation
folders and settings are excluded from Git, including Windows executables.

## Work between computers

Before starting work on either computer:

```sh
git pull --ff-only
```

After finishing a set of changes:

```sh
git status
git add <files-you-changed>
git diff --cached --stat
git commit -m "Describe the change"
git push
```

Commit source files, required assets, shared configuration, and documentation.
Temporary design locks, operating system metadata, dependencies, generated output,
local tool installations, and secrets are ignored. Transfer any future environment
secrets separately and commit only placeholder examples such as `.env.example`.
