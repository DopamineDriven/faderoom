# [The Fade Room Inc.](https://www.thefaderoominc.com)


## Setting up this repo 

### (1) Create a root .npmrc file 
- before installing the dependencies from the root (cwd = this directory, where package.json is named @fade/root) ensure to add the following `.npmrc` file

```txt
# Required -- include these two settings no matter what
enable-pre-post-scripts=true
node-linker=hoisted

# Optional -- populate these values to publish packages to the npm registry
//registry.npmjs.org/:_authToken=
//registry.npmjs.org/:_password=
//registry.npmjs.org/:username=
```

---

### (2) Run install from the root

- if you have pnpm installed run the following command

```bash
pnpm install
```

- if you don't have pnpm installed then continue reading otherwise skip to the next section (section (2))

#### Install pnpm on Windows

- Run the following command

```bash
npm install -g pnpm
```

- alternatively, open powershell as an administrator and run the following command

```powershell
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

- However, the pnpm docs warn that Windows Defender might block their executable when installing via powershell. Therefore, using npm or corepack to install pnpm is advisable

- Finally, add the path for pnpm to the system environment on your device
  - press the windows key or click on the start button
  - search for "system environment" and select "Edit the system environment variables" -- this will open the "System Properties" window
  - select the "Advanced" tab and click on the "Environmental Variables..." button
  - Double-click "Path" in the "User variables for username"
  - check to see if you already have `%PNPM_HOME%` set
  - if `%PNPM_PATH%` is not present click on the "New" button
  - in the variable name field input `%PNPM_PATH%`; in the variable value field input `C:\Users\username\AppData\Local\pnpm` and be sure to replace `username` with the username for your device
  - Then, repeat these same steps to add the `%PNPM_PATH%` to the "System Variables" on your device

- You're now ready to install the pnpm workspace dependencies 

```bash
pnpm install
```

#### Install pnpm on Mac, Linux, or WSL

- if you use Mac or Linux (or WSL) run one of the following commands in your terminal to install pnpm

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

```bash
wget -qO- https://get.pnpm.io/install.sh | sh -
```

```bash
brew install pnpm
```

```bash
npm install -g pnpm
```

- You're now ready to install the pnpm workspace dependencies 

```bash
pnpm install
```

#### Troubleshooting pnpm installation

- see the [pnpm docs troubleshooting section for more info](https://pnpm.io/installation#troubleshooting)

---

### (3) Ensure pnpm is updated to its latest version
- There are two options for doing this

(1)

```bash
pnpm self-update
```

(2)

```bash
pnpm latest:pnpm
```

where option (2) executes the following command

```bash
corepack use pnpm@latest
```

---


### (4) Configuring secrets

#### Link to the existing project

- ensure that vercel is installed with pnpm globally by running

```bash
pnpm 
```

- next, cd into `apps/web` and run the following command


```bash
vercel login
```

- Once logged in with vercel (and with access to the Wcd vercel pro account) run

```bash
vercel link
```

- This will bring up a prompt that first asks

```bash
 Set up “~/wcd/faderoom-github/faderoom”? [Y/n] 
```

- type `Y` and hit enter; the next prompt should look something like

```bash
? Which scope should contain your project? 
● Wcd 
○ Andrew Ross' projects 
```

- use the up and down arrow keys to select the scope; for our purposes the correct scope is `Wcd`, select that option and hit enter to bring up the next prompt

```bash
? Link to existing project? [y/N]
```

- type `Y` and hit enter; the next prompt will ask for the name of the existing Wcd project

```bash
? What’s the name of your existing project? 
```

- type `thefaderoominc` and hit enter; your repo is now linked to the vercel project and a `.vercel` directory should be output in the root

- Summary

```bash
? Set up “~/wcd/faderoom-github/faderoom”? [Y/n] y
? Which scope should contain your project? Wcd
? Link to existing project? [y/N] y
? What’s the name of your existing project? thefaderoominc
✅  Linked to wcd/thefaderoominc (created .vercel)
```

#### Generate .env.local

- With the vercel project linked we can now generate the environmental variables

```bash
vercel env pull
```

- The following output should appear in your terminal

```bash
vercel env pull
> Downloading `development` Environment Variables for Project thefaderoominc
✅  Created .env.local file  [129ms]
```

- this generates a `.env.local` file

- create another file named `.env` and copy-paste the contents of `.env.local` into `.env` (both are .gitignored)

- _important_ - ensure that the `.env` and `.env.local` files are in the root of the `apps/web` directory


---

### (5) Run the configure command once in the `apps/web` directory

- Before spinning up the dev server locally, be sure to run the following command while your current woring directory is `apps/web`

```bash
pnpm configure
```

- This command generates a number of files via the `@d0paminedriven/booksy` cli-package


---


### (6) fire up the dev server of the `apps/web` project

- after running the configure command, cd out of the `apps/web` directory and return to the root

```bash
cd ../..
```

- run the following command to fire up the fade room web project

```bash
pnpm run:web
```

- this executes the following script

```bash
turbo run dev --continue --filter=@fade/web
```

- success ✔ navigate to `http://localhost:3007`


---


### (7) Tip

- see (`extensions.json`)[https://github.com/DopamineDriven/faderoom/blob/master/.vscode/extensions.json] in the root `.vscode` directory for extension recommendations to enhance your coding experience
