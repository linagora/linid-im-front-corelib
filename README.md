# linid-im-front-corelib

Core library for LinID Identity Manager frontend.

## Installation

This project uses **pnpm** as the package manager.

### Quick start

```sh
# Enable Corepack (included with Node.js 16.9+)
corepack enable

# Install dependencies (Corepack will use pnpm@10.20.0 automatically)
pnpm install
```

**Note:** The `packageManager` field in `package.json` ensures everyone uses the same pnpm version (10.20.0).

### Using pnpm (recommended)

```sh
# Install pnpm globally if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

### Using npm (legacy support)

```sh
npm install
```

## Development

### Build the library

```sh
# With pnpm (recommended)
pnpm build

# With npm
npm run build
```

### Run tests

```sh
# With pnpm (recommended)
pnpm test

# With npm
npm run test
```

### Development mode

```sh
# With pnpm (recommended)
pnpm dev

# With npm
npm run dev
```

## License

This project is licensed under the GNU Affero General Public License version 3 - see [LICENSE](LICENSE.md) for details.
